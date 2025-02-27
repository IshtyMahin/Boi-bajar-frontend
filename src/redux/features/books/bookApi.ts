import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ search, page = 1, limit = 4, ...filters }) => {
        const params = new URLSearchParams();
       
        if (search) {
          params.append("search", search);
        }

        params.append("page", page);
        params.append("limit", limit);

        if (filters.price) {
          if (filters.price.gte) params.append("price[gte]", filters.price.gte);
          if (filters.price.lte) params.append("price[lte]", filters.price.lte);
        }

        if (filters.author) {
          params.append("author", filters.author);
        }

        if (filters.categoryId) {
          params.append("categoryId", filters.categoryId);
        }

        if (filters.quantity) {
          params.append("quantity[gt]", filters.quantity.gt);
        }

        return `/books?${params.toString()}`;
      },
      providesTags: ["Books"],
    }),

    getBookById: builder.query({
      query: (bookId) => `/books/${bookId}`,
      providesTags: ["Books"],
    }),

    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/books/create-book",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    updateBook: builder.mutation({
      query: (updatedBook) => ({
        url: `/books/${updatedBook.id}`,
        method: "PATCH",
        body: updatedBook,
      }),
      invalidatesTags: ["Books"],
    }),

    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;

export default bookApi;
