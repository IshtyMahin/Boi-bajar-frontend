import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Review {
  _id: string;
  bookId: string;
  userId: string;
  rating: number;
  review: string;
  createdAt?: string;
  updatedAt?: string;
}

type TReviewState = {
  reviews: Review[];
  selectedReview: Review | null;
};

const initialState: TReviewState = {
  reviews: [],
  selectedReview: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    // Set all reviews
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },

    // Add a new review
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },

   

    // Delete a review
    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload
      );
    },

  },
});

export const {
  setReviews,
  addReview,
  deleteReview
} = reviewSlice.actions;

export default reviewSlice.reducer;
