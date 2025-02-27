import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/books/order",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Orders"], 
    }),
    getOrders: builder.query({
      query: () => "/books/order/user-order",
      providesTags: ["Orders"], // Attach a tag for auto-refresh
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/books/order/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/books/order/${orderId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/books/order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
