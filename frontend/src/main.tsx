import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import appRouter from "./App.tsx";
import SocketContextProvider from "./context/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <SocketContextProvider>
    <Toaster position="top-center" />
    <RouterProvider router={appRouter} />
  </SocketContextProvider>
  // </React.StrictMode>
);
