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
import MyReviews from "../Pages/DashboardPages/User/MyReviews";
import ManageReviews from "../Pages/DashboardPages/Admin/ManageReviews";
import BoughtProperties from "../Pages/DashboardPages/User/BoughtProperties ";
import RequestedOffers from "../Pages/DashboardPages/RequestedOffers";
import Payment from "../Pages/DashboardPages/User/Payment";
import SoldProperties from "../Pages/DashboardPages/SoldProperties";
import AdminRoute from "../Contexts/AdminRoute";
import Forbidden from "../Pages/Shared/Foridden";
import AgentRoute from "../Contexts/AgentRoute";
import Profile from "../Pages/DashboardPages/Profile/Profile";
import AdminAdvertiseProperty from "../Pages/DashboardPages/Admin/AdminAdvertiseProperty";

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
      {
        path: "/forbidden",
        Component: Forbidden,
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
      { index: true, element: <Profile></Profile> },
      {
        path: "/dashboard/wishlist",
        element: <WishList></WishList>,
      },

      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/make-offer/:id",
        element: <MakeOffer></MakeOffer>,
      },
      {
        path: "/dashboard/property-bought",
        element: <BoughtProperties></BoughtProperties>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/my-reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "/dashboard/add-properties",
        element: (
          <AgentRoute>
            <AddProperty></AddProperty>
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/my-requests",
        element: (
          <AgentRoute>
            <RequestedOffers></RequestedOffers>
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/agent-paid-properties/:email",
        element: (
          <AgentRoute>
            <SoldProperties></SoldProperties>
          </AgentRoute>
        ),
      },

      {
        path: "/dashboard/my-properties",
        element: (
          <AgentRoute>
            <MyProperties></MyProperties>
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/update-property/:id",
        element: (
          <AgentRoute>
            <UpdateProperty />
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/manage-property",
        element: (
          <AdminRoute>
            <ManageProperties></ManageProperties>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-reviews",
        element: <ManageReviews></ManageReviews>,
      },
      {
        path: "/dashboard/advertise",
        element: <AdminAdvertiseProperty></AdminAdvertiseProperty>,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
