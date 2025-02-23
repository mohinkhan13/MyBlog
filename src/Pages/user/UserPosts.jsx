import React, { useEffect, useState } from "react";
import PostCard from "../../Components/user/PostCard";
import PropTypes from "prop-types"; // Optional: for type checking

function UserPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch posts and categories in parallel
        const [postsRes, categoriesRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/posts/"),
          fetch("http://127.0.0.1:8000/api/categories/"),
        ]);

        // Check responses
        if (!postsRes.ok) throw new Error("Failed to fetch posts");
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

        const postsData = await postsRes.json();
        const categoriesData = await categoriesRes.json();

        // Create a category map for efficient lookup
        const categoryMap = new Map(
          categoriesData.map((cat) => [cat.id, cat.name])
        );

        // Enhance posts with category names
        const enhancedPosts = postsData.map((post) => ({
          ...post,
          categoryName: categoryMap.get(post.category) || "Unknown", // Assuming 'category' is the field name
        }));

        setAllPosts(enhancedPosts);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching data");
        console.error("Fetch Error:", err);
        setAllPosts([]); // Reset posts on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render states
  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-20 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 my-20 md:justify-center md:gap-10">
      {allPosts.length > 0 ? (
        allPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
}

export default UserPosts;
