import React, { useEffect, useState, useCallback } from "react";
import PostCard from "./PostCard";

function PopularPost() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Optimized fetch function
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch posts and categories in parallel but handle failures individually
      const [postsRes, categoriesRes] = await Promise.allSettled([
        fetch("http://127.0.0.1:8000/api/posts/"),
        fetch("http://127.0.0.1:8000/api/categories/"),
      ]);

      let postsData = [];
      let categoryMap = new Map();

      // ✅ Posts Fetch Handling
      if (postsRes.status === "fulfilled" && postsRes.value.ok) {
        postsData = await postsRes.value.json();
      } else {
        console.error("Posts fetch failed:", postsRes.reason);
      }

      // ✅ Categories Fetch Handling
      if (categoriesRes.status === "fulfilled" && categoriesRes.value.ok) {
        const categoriesData = await categoriesRes.value.json();
        categoryMap = new Map(categoriesData.map((cat) => [cat.id, cat.name]));
      } else {
        console.error("Categories fetch failed:", categoriesRes.reason);
      }

      // ✅ Enhance posts with category names & Limit to 6
      const enhancedPosts = postsData.slice(0, 6).map((post) => ({
        ...post,
        categoryName: categoryMap.get(post.category) || "Unknown",
      }));

      setPosts(enhancedPosts);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load data. Please try again.");
      setPosts([]); // Reset posts on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Loading state UI
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // ✅ Error state UI
  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchData} // ✅ Retry without full page reload
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // ✅ Render posts
  return (
    <div className="flex flex-col w-full gap-10 px-4 py-8 md:py-10 md:px-30 bg-gray-50">
      <div>
        <h1 className="text-2xl font-bold text-center md:text-3xl">
          Popular Posts
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:justify-center md:gap-8">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-gray-500">No popular posts available.</p>
        )}
      </div>
    </div>
  );
}

export default PopularPost;
