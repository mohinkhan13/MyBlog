import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

function PopularPost() {
  const { posts, loading, error } = useSelector((state) => state.data);

  const popularPosts = useMemo(() => posts.slice(0, 6), [posts]);

  if (loading) {
    return (
      <div className="flex flex-col w-full gap-10 px-4 py-8 md:py-10 md:px-30 bg-gray-50">
        <h1 className="text-2xl font-bold text-center md:text-3xl">
          Popular Posts
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {Array(6)
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className="w-64 bg-gray-200 rounded-lg h-80 animate-pulse"
              />
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full gap-10 px-4 py-8 md:py-10 md:px-30 bg-gray-50">
        <h1 className="text-2xl font-bold text-center md:text-3xl">
          Popular Posts
        </h1>
        <div className="py-8 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-10 px-4 py-8 md:py-10 md:px-30 bg-gray-50">
      <div>
        <h1 className="text-2xl font-bold text-center md:text-3xl">
          Popular Posts
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:justify-center md:gap-8">
        {popularPosts.length > 0 ? (
          popularPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-gray-500">No popular posts available.</p>
        )}
      </div>
    </div>
  );
}

export default PopularPost;
