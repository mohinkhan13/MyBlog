import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";
import Dashboard from "./Pages/admin/Dashboard";
import "./App.css";
import Post from "./Pages/admin/Post";
import Users from "./Pages/admin/Users";
import AddPost from "./Pages/admin/AddPost";
import Category from "./Pages/admin/Category";
import Index from "./Pages/user/Index";
import UserPosts from "./Pages/user/UserPosts";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/dataSlice";
import { useEffect } from "react";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const { loading, error, isDataFetched } = useSelector((state) => state.data);

  useEffect(() => {
    if (!isDataFetched) {
      dispatch(fetchData());
    }
  }, [dispatch, isDataFetched]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <button
            onClick={() => dispatch(fetchData())}
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="post" element={<Post />} />
          <Route path="users" element={<Users />} />
          <Route path="addpost" element={<AddPost />} />
          <Route path="editpost/:id" element={<AddPost />} />
          <Route path="category" element={<Category />} />
        </Route>

        <Route path="/" element={<UserLayout />}>
          <Route index element={<Index />} />
          <Route path="allpost" element={<UserPosts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
