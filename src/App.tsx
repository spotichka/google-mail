import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router/routes.tsx";
import { useAppSelector } from "./hooks/redux.ts";
import Loader from "./componetns/loader/Loader.tsx";
const router = createBrowserRouter(routes);
function App() {
  const { isLoading } = useAppSelector((state) => state.userReducer);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="antd-globals">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
