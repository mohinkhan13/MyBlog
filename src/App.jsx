import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";
import Dashboard from "./Pages/admin/Dashboard";
import Post from "./Pages/admin/Post";
import Users from "./Pages/admin/Users";
import AddPost from "./Pages/admin/AddPost";
import Category from "./Pages/admin/Category";
import Index from "./Pages/user/Index";
import UserPosts from "./Pages/user/UserPosts";
import SinglePost from "./Pages/user/SinglePost";
import Contact from "./Pages/user/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/dataSlice";
import { useEffect, useContext } from "react";
import Loader from "./components/Loader";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthContext } from "./context/AuthContext";

function App() {
  const dispatch = useDispatch();
  const { loading, error, isDataFetched } = useSelector((state) => state.data);
  const { user, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isDataFetched || user) {
      dispatch(fetchData({ isAdmin: user?.is_superuser }));
    }
  }, [dispatch, isDataFetched, user]);

  if (loading || authLoading) {
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
        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requireAdmin>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="post" element={<Post />} />
          <Route path="users" element={<Users />} />
          <Route path="addpost" element={<AddPost />} />
          <Route path="editpost/:id" element={<AddPost />} />
          <Route path="category" element={<Category />} />
        </Route>

        {/* Protected User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<Index />} />
          <Route path="allpost" element={<UserPosts />} />
          <Route path=":slug" element={<SinglePost />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
