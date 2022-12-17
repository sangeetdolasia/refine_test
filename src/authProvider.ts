import { AuthProvider } from "@pankod/refine-core";

import axios, { AxiosInstance } from "axios";

export const authProvider = (axiosInstance: AxiosInstance): any => {
  return {
    login: async ({ email, password }: { email: string; password: string }) => {
      try {
        const { data } = await axios.post(`login`, {
          email,
          password,
        });
        localStorage.setItem("token", data?.data?.access_token);
      } catch (error) {
        console.log(error, "error");

        return Promise.reject(error);
      }
      return Promise.resolve("/");
    },
    logout: (props: any) => {
      localStorage.removeItem("token");
      return Promise.resolve(props?.redirectPath);
    },
  };
};
