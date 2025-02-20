import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/posts/");
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    
    fetchPosts();
  }, [post]); // ✅ Depend on `post` to auto refresh on delete
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories/");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, [categories]); 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPost((prevPosts) => prevPosts.filter((p) => p.id !== id)); // ✅ Auto Update UI
      } else {
        alert("Error deleting post.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <Link to="/addpost" className="px-4 py-2 font-bold text-white bg-blue-700 rounded hover:bg-blue-700">
        Add Post
      </Link>

      <table className="min-w-full mt-5 border border-gray-300 shadow-lg">
        <thead className="text-white bg-blue-500">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-center bg-white">
          {post.map((post, index) => (
            <tr key={post.id || index}>
              <td className="px-4 py-2">{post.id}</td>
              <td className="px-4 py-2">{post.title}</td>
              <td className="px-4 py-2">
                {categories.find((category) => category.id === post.category)?.name || "Unknown"}
              </td>
              <td className="px-4 py-2">{post.status}</td>
              <td className="px-4 py-2">{new Date(post.created_at).toLocaleDateString()}</td>
              <td className="flex items-center justify-center gap-2 px-4 py-2">
                <Link to={`/editpost/${post.id}`} className="px-4 py-2 font-bold text-white bg-teal-500 rounded hover:bg-blue-700">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 font-bold text-white bg-red-700 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
