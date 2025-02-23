import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Use `import.meta.env` for Vite compatibility
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { rejectWithValue }) => {
    const maxRetries = 2;
    let retries = 0;

    while (retries <= maxRetries) {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/posts/`),
          fetch(`${API_BASE_URL}/api/categories/`),
        ]);

        if (!postsRes.ok) throw new Error("Failed to fetch posts");
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

        const postsData = await postsRes.json();
        const categoriesData = await categoriesRes.json();
        console.log(postsData);
        console.log(categoriesData);

        // ✅ Map category names to posts
        const categoryMap = new Map(
          categoriesData.map((cat) => [cat.id, cat.name])
        );

        const enhancedPosts = postsData.map((post) => ({
          ...post,
          categoryName: categoryMap.get(post.category) || "Uncategorized",
        }));

        return { posts: enhancedPosts, categories: categoriesData };
      } catch (error) {
        retries++;
        if (retries > maxRetries) {
          return rejectWithValue(error.message);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * retries));
      }
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    posts: [],
    categories: [],
    loading: false,
    error: null,
    isDataFetched: false,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.categories = action.payload.categories;
        state.isDataFetched = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetError } = dataSlice.actions;
export default dataSlice.reducer;
