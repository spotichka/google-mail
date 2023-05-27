import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router/routes.tsx";
import { useAppSelector } from "./hooks/redux.ts";
const router = createBrowserRouter(routes);
function App() {
  const { isLoading } = useAppSelector((state) => state.userReducer);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
