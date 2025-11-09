import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AvailableFoods from "../pages/Foods/AvailableFoods";
import ErrorPage from "../pages/ErrorPage";
import FoodDetails from "../pages/Foods/FoodDetails";
import AddFood from "../pages/Foods/AddFood";
import PrivateRoute from "./PrivateRoute";
import ManageMyFoods from "../pages/Foods/ManageMyFoods";
import UpdateFood from "../pages/Foods/UpdateFood";
import MyFoodRequests from "../pages/Foods/MyFoodRequests";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/available-foods", element: <AvailableFoods /> },
      {
        path: "/foods/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-food/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-food-requests",
        element: (
          <PrivateRoute>
            <MyFoodRequests />
          </PrivateRoute>
        ),
      },
      { 
        path: "/login", 
        element: <Login /> 
      },
      { 
        path: "/register", 
        element: <Register /> 
      },
    ],
  },
]);

export default router;
