import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import "./index.css";
import List from "./pages/posts/list";
import { Layout } from "./components/Layout";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[{ name: "posts", list: List }]}
      Layout={Layout}
    />
  );
};

export default App;
