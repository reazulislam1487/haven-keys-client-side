import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Shared/Login";
import PrivateRoute from "../Contexts/PrivateRoute";
import Register from "../Pages/Shared/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFound from "../Pages/Shared/NotFound";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import BlogSection from "../Pages/BlogSection/BlogSection";
import AddProperty from "../Pages/DashboardPages/AddProperties";
import MyProperties from "../Pages/DashboardPages/MyProperties";
import UpdateProperty from "../Pages/DashboardPages/UpdateProperty ";
import WishList from "../Pages/DashboardPages/User/WishList";
import ManageProperties from "../Pages/DashboardPages/Admin/ManageProperties";
import ManageUsers from "../Pages/DashboardPages/Admin/ManageUsers";
import AllProperties from "../Pages/AllProperties/AllProperies";
import PropertyDetails from "../Pages/AllProperties/PropertyDetails";
import MakeOffer from "../Pages/DashboardPages/User/MakeOffer";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/properties",
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "/property-details/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/blog",
        Component: BlogSection,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout> </DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <h1>hello</h1> },

      {
        path: "/dashboard/add-properties",
        element: <AddProperty></AddProperty>,
      },
      {
        path: "/dashboard/wishlist",
        element: <WishList></WishList>,
      },
      {
        path: "/dashboard/make-offer/:id",
        element: <MakeOffer></MakeOffer>,
      },
      {
        path: "/dashboard/my-properties",
        element: <MyProperties></MyProperties>,
      },
      {
        path: "/dashboard/update-property/:id",
        element: <UpdateProperty />,
      },
      {
        path: "/dashboard/manage-property",
        element: <ManageProperties></ManageProperties>,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
