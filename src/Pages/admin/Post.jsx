import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/posts/"),
          fetch("http://127.0.0.1:8000/api/categories/"),
        ]);

        if (!postsRes.ok) throw new Error("Failed to fetch posts");
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

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
        console.error("Fetch Error:", error);
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

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Something went wrong while deleting the post!");
    }
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading posts...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <Link
        to="/admin/addpost" // Fixed to absolute path
        className="inline-block px-4 py-2 mb-6 font-bold text-white transition-colors bg-blue-700 rounded hover:bg-blue-800"
      >
        Add Post
      </Link>

      <table className="min-w-full border border-gray-300 shadow-lg">
        <thead className="text-white bg-blue-500">
          <tr>
            <th className="px-4 py-2">ID</th>
            {/* Uncomment if you want to show images */}
            {/* <th className="px-4 py-2">Image</th> */}
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-center">{post.id}</td>
              {/* Uncomment if you want to show images */}
              {/* <td className="px-4 py-2">
                {post.image ? (
                  <img
                    className="object-cover rounded h-14 w-14"
                    src={post.image}
                    alt={post.title}
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                ) : (
                  "No Image"
                )}
              </td> */}
              <td className="px-4 py-2">{post.title}</td>
              <td className="px-4 py-2">
                {categories[post.category] || "Unknown"}
              </td>
              <td className="px-4 py-2 capitalize">{post.status}</td>
              <td className="px-4 py-2">
                {new Date(post.created_at).toLocaleDateString()}
              </td>
              <td className="flex items-center justify-center gap-2 px-4 py-2">
                <Link
                  to={`/admin/editpost/${post.id}`} // Fixed to absolute path
                  className="px-4 py-2 font-bold text-white transition-colors bg-teal-500 rounded hover:bg-teal-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 font-bold text-white transition-colors bg-red-700 rounded hover:bg-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
