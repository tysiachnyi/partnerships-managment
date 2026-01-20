import { createBrowserRouter } from "react-router";
import App from "./App";
import Layout from "@/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
]);

export default router;
