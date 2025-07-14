import React from "react";
import Sidebar from "../Pages/DashboardPages/Sidebar";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import usePageTitle from "../hooks/usePageTitle";
import ScrollToTop from "../Pages/Shared/ScrollToTop";

const DashboardLayout = () => {
  usePageTitle("Dashboard");

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <nav>
        <Navbar></Navbar>
      </nav>
      <div className="min-h-screen flex flex-col max-w-screen-xl mx-auto">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <Outlet></Outlet>
          </main>
        </div>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default DashboardLayout;
