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

function App() {
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
          {/* <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<SinglePost />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
