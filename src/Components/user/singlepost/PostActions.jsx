import React from "react";
import { motion } from "framer-motion"; // For animations
import axios from "axios";

function PostActions({ postStats, isLiked, setIsLiked, setPostStats }) {
  // Animation variants
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const handleLikeToggle = async () => {
    if (!postStats) return;

    const newLikes = isLiked ? postStats.likes - 1 : postStats.likes + 1;
    const previousLikedState = isLiked;

    // Optimistic update
    setIsLiked(!isLiked);
    setPostStats({ ...postStats, likes: newLikes });

    try {
      const res = await axios.patch(
        `http://127.0.0.1:8000/api/post-stats/${postStats.id}/`,
        { likes: newLikes }
      );
      setPostStats(res.data);
    } catch (err) {
      console.error("Error updating likes:", err);
      // Rollback on error
      setIsLiked(previousLikedState);
      setPostStats(postStats);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this post!",
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      // Fallback: Copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto border-t border-gray-200 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
        {/* Like Button */}
        <motion.button
          onClick={handleLikeToggle}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full shadow-md font-semibold text-sm sm:text-base transition-colors duration-300 ${
            isLiked
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={!postStats}
        >
          <i
            className={`text-lg sm:text-xl ${
              isLiked ? "ri-heart-fill" : "ri-heart-line text-red-500"
            }`}
          />
          <span>
            {isLiked ? "Liked" : "Like"} ({postStats?.likes || 0})
          </span>
        </motion.button>

        {/* Share Button */}
        <motion.button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-full shadow-md font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <i className="text-lg text-blue-500 ri-share-line sm:text-xl" />
          <span>Share</span>
        </motion.button>
      </div>
    </div>
  );
}

export default PostActions;
