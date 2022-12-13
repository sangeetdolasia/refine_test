import { AuthProvider } from "@pankod/refine-core";

import axios, { AxiosInstance } from "axios";

export const authProvider = (axiosInstance: AxiosInstance): any => {
  return {
    login: async ({ user }: { user: any }) => {
      try {
        const { data } = await axios.post(`login`, {
          user,
        });
        localStorage.setItem("token", data?.data?.access_token);
      } catch (error) {
        return Promise.reject(error);
      }
      return Promise.resolve("/");
    },
  };
};
