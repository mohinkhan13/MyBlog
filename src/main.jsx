import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import AuthProvider from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
