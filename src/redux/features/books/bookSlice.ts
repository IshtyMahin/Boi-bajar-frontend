import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TBook = {
  id: string;
  name: string;
  authors: string[];
  price: number;
  category: string;
  image: string;
  quantity: number;
};

type TBookState = {
  books: TBook[];
  selectedBook: TBook | null;
};

const initialState: TBookState = {
  books: [],
  selectedBook: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<TBook[]>) => {
      state.books = action.payload;
    },
    setSelectedBook: (state, action: PayloadAction<TBook>) => {
      state.selectedBook = action.payload;
    },
    addBook: (state, action: PayloadAction<TBook>) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<TBook>) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});

export const { setBooks, setSelectedBook, addBook, updateBook, deleteBook } =
  bookSlice.actions;

export default bookSlice.reducer;
