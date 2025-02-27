/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCategory } from "./categorySlice";
import { baseApi } from "../../api/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<any, void>({
      query: () => "/book/category/",
    }),
    addCategory: builder.mutation<TCategory, Partial<TCategory>>({
      query: (body) => ({
        url: "/book/category/create-category",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoryApi;
