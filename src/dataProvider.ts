import { CrudFilters, CrudOperators, DataProvider } from "@pankod/refine-core";
import restDataProvider from "@pankod/refine-simple-rest";
import { stringify } from "query-string";
import axioss, { AxiosInstance } from "axios";

//TEMP URL
//const API_URL = "https://refine-real-world.herokuapp.com/api";

export const dataProvider = (axios: any): DataProvider => {
  return {
    ...restDataProvider("http://localhost:3000/", axios),
    getList: async ({ resource, pagination, filters, metaData }) => {

      const { data } = await axioss.get(resource);

      return {
        data: data?.result,
        total: data?.result?.length,
      };
    },
    // getOne: async ({ resource, id, metaData }) => {
    //   const url = metaData?.getComments
    //     ? `${API_URL}/${resource}/${id}/comments`
    //     : `${API_URL}/${resource}/${id}`;

    //   const { data } = await axios.get(url);

    //   return {
    //     data: data[metaData?.resource || resource],
    //   };
    // },
    // update: async ({ resource, id, variables, metaData }) => {
    //   const url = metaData?.URLSuffix
    //     ? `${API_URL}/${resource}/${id}/${metaData.URLSuffix}`
    //     : `${API_URL}/${resource}/${id}`;

    //   const { data } = metaData?.URLSuffix
    //     ? await axios.post(url)
    //     : await axios.put(url, variables);

    //   return {
    //     data,
    //   };
    // },

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
