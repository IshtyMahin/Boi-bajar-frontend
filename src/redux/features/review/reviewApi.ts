/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export interface Review {
  _id: string;
  bookId: string;
  userId: string;
  rating: number;
  review: string;
}

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByBook: builder.query<any, string>({
      query: (bookId) => `/books/reviews/${bookId}`,
    }),

    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/books/reviews",
        method: "POST",
        body: reviewData,
      }),
    }),
  }),
});

export const { useGetReviewsByBookQuery, useCreateReviewMutation } = reviewApi;

export default reviewApi;
