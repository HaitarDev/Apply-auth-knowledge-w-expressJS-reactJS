import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page.tsx";
import LoginPage from "./pages/login-page.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import { AuthProvider } from "./context/contextProvider.tsx";
import ProtectedRoute from "./protected/protectedRoute.tsx";
import UserPage from "./pages/user-page.tsx";
import ProtectedAuthRoutes from "./protected/protectedAuthRoutes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // here our routes we want when visited them to stay displayed the <App />
      // {
      //   path: "/login",
      //   element: <LoginPage />,
      // },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/user",
        element: <UserPage />,
      },
    ],
  },
  {
    element: <ProtectedAuthRoutes />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <App /> */}
    </AuthProvider>
  </React.StrictMode>
);
