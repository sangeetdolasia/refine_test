import { CrudFilters, CrudOperators, DataProvider } from "@pankod/refine-core";
import restDataProvider from "@pankod/refine-simple-rest";
import { stringify } from "query-string";
import axios, { AxiosInstance } from "axios";

//TEMP URL
//const API_URL = "https://refine-real-world.herokuapp.com/api";

export const dataProvider = (axiosIn: any): DataProvider => {
  return {
    ...restDataProvider("http://localhost:3000/"),
    getList: async ({ resource, pagination, filters, metaData, sort }) => {
      const current = pagination?.current || 1;
      const pageSize = pagination?.pageSize || 10;

      const { data } = await axios.get(resource, {
        params: { offset: current - 1, limit: pageSize, filters, sort },
      });
      console.log(data?.result?.data, "data?.result?.data");

      return {
        data: data?.result?.data,
        total: data?.result?.total,
      };
    },
    getOne: async ({ resource, id, metaData }) => {
      const { data } = await axios.get(`${resource}/${id}`);
      return {
        data: data?.results,
      };
    },
    update: async ({ resource, id, variables, metaData }) => {
      const { data } = await axios.patch(`${resource}/${id}`, variables);

      // const { data } = metaData?.URLSuffix
      //   ? await axios.post(url)
      //   : await axios.put(url, variables);
      return {
        data,
      };
    },

    // deleteOne: async ({ resource, id, variables, metaData }) => {
    //   const url = metaData?.URLSuffix
    //     ? `${API_URL}/${resource}/${id}/${metaData.URLSuffix}`
    //     : `${API_URL}/${resource}/${id}`;

    //   const { data } = await axios.delete(url, {
    //     data: variables,
    //   });

    //   return {
    //     data,
    //   };
    // },
  };
};
