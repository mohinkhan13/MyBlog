import React, { useEffect, useRef, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import PostHeader from "../../Components/user/singlepost/PostHeader";
import PostContent from "../../Components/user/singlepost/PostContent";
import PostActions from "../../Components/user/singlepost/PostActions";
import CommentSection from "../../Components/user/singlepost/CommentSection";

function SinglePost() {
  const { slug } = useParams();
  const { posts, loading, error } = useSelector((state) => state.data);
  const errorRef = useRef(null);
  const [postStats, setPostStats] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) errorRef.current?.focus();
  }, [error]);

  const post = useMemo(() => posts.find((p) => p.slug === slug), [posts, slug]);

  // Fetch Post Stats
  useEffect(() => {
    if (post) {
      axios
        .get(`http://127.0.0.1:8000/api/post-stats/?post=${post.id}`)
        .then((res) => {
          const correctStats = res.data.find(
            (stat) => stat.post.id === post.id
          );
          if (correctStats) {
            setPostStats(correctStats);
            updateViews(correctStats.id, correctStats.views);
          }
        })
        .catch((err) => console.error("Error fetching post stats:", err));
    }
  }, [post]);

  // Fetch Comments and Replies
  useEffect(() => {
    if (!post) return;

    const fetchCommentsAndReplies = async () => {
      try {
        // Fetch comments
        const commentRes = await axios.get(
          `http://127.0.0.1:8000/api/comments/?post=${post.id}`
        );
        const filteredComments = commentRes.data.filter(
          (comment) => comment.post === post.id
        );

        // Fetch replies for each comment
        const commentsWithReplies = await Promise.all(
          filteredComments.map(async (comment) => {
            const replyRes = await axios.get(
              `http://127.0.0.1:8000/api/replies/?comment=${comment.id}`
            );
            console.log(`Replies for comment ${comment.id}:`, replyRes.data); // Debug
            return { ...comment, replies: replyRes.data || [] };
          })
        );

        console.log("Fetched comments with replies:", commentsWithReplies); // Debug
        setComments(commentsWithReplies);
      } catch (err) {
        console.error("Error fetching comments and replies:", err);
      }
    };

    fetchCommentsAndReplies();
  }, [post]);

  const updateViews = (postStatsId, currentViews) => {
    axios
      .patch(`http://127.0.0.1:8000/api/post-stats/${postStatsId}/`, {
        views: currentViews + 1,
      })
      .then((res) => setPostStats(res.data))
      .catch((err) => console.error("Error updating views:", err));
  };

  if (loading) {
    return (
      <div className="flex justify-center my-20">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-20 text-center" ref={errorRef} tabIndex={-1}>
        <p className="text-red-600">{error || "Something went wrong!"}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="my-20 text-center">
        <p className="text-red-600">Post not found</p>
      </div>
    );
  }

  return (
    <div>
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostActions
        postStats={postStats}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        setPostStats={setPostStats}
      />
      <CommentSection
        post={post}
        comments={comments}
        setComments={setComments}
        newComment={newComment}
        setNewComment={setNewComment}
        replyContent={replyContent}
        setReplyContent={setReplyContent}
      />
    </div>
  );
}

export default SinglePost;
