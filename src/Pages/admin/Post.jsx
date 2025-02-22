import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/posts/"),
          fetch("http://127.0.0.1:8000/api/categories/"),
        ]);

        if (!postsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const postsData = await postsRes.json();
        const categoriesData = await categoriesRes.json();

        const categoryMap = {};
        categoriesData.forEach((cat) => {
          categoryMap[cat.id] = cat.name;
        });

        setPosts(postsData);
        setCategories(categoryMap);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id));
      } else {
        alert("Error deleting post.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Something went wrong!");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading posts...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <>
      <Link to="/addpost" className="px-4 py-2 font-bold text-white bg-blue-700 rounded hover:bg-blue-700">
        Add Post
      </Link>

      <table className="min-w-full mt-5 border border-gray-300 shadow-lg">
        <thead className="text-white bg-blue-500">
          <tr>
            <th className="px-4 py-2">ID</th>
            {/* <th className="px-4 py-2">Image</th> */}
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-4 py-2">{post.id}</td>
              {/* <td className="px-4 py-2">
                <img className="object-cover h-14 w-14" src={post.image} alt="" />
              </td> */}
              <td className="px-4 py-2">{post.title}</td>
              <td className="px-4 py-2">{categories[post.category] || "Unknown"}</td>
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
