import { Navigate, type RouteObject } from "react-router-dom";
import App from "../App";
import { ChatWorkspacePage } from "../pages/ChatWorkspacePage";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/chat-workspace" replace />,
      },
      {
        path: "chat-workspace",
        element: <ChatWorkspacePage />,
      },
      {
        path: "*",
        element: <Navigate to="/chat-workspace" replace />,
      },
    ],
  },
];
