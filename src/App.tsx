import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import "./index.css";
import LoginPage from "./pages/LoginPage/Loadable";
import { Layout } from "./components/Layout";
import axios, { AxiosRequestConfig } from "axios";
import { authProvider } from "./authProvider";
import MockAPI from "./helpers/mock-api";
import { dataProvider } from "./dataProvider";
import { PostList, PostEdit, PostCreate } from "./pages";
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (request.headers) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return request;
});

MockAPI();

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            element: <LoginPage />,
            path: "/login",
          },
        ],
      }}
      dataProvider={dataProvider(axiosInstance)}
      authProvider={authProvider(axiosInstance)}
      resources={[
        { name: "lists", list: PostList, edit: PostEdit, create: PostCreate },
      ]}
      Layout={Layout}
    />
  );
};

export default App;
