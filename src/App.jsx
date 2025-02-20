import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Pages/Dashboard";
import "./App.css";
import Post from "./Pages/Post";
import Users from "./Pages/Users";
import AddPost from "./Pages/AddPost";
import Category from "./Pages/Category";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route  index element={<Dashboard />} />
          <Route path="/post" element={<Post />} />
          <Route path="/users" element={<Users />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/editpost/:id" element={<AddPost />} /> 
          <Route path="/category" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
