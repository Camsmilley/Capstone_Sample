import Dashboard from "./Dashboard/DashboardPage/Dashboard";
import "./index.css";

import Login from "./frontend/LoginPage/Login";
import Signup from "./frontend/SignupPage/Signup";
import HomePage from "./frontend/HomePage/HomePage";
import DetailsPage from "./frontend/DetailsPage/Details";
import AboutPage from "./frontend/AboutPage/About";
import Bookings from "./Dashboard/DashboardPage/Bookings";

// Import React router dom
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SideMenu from "./Dashboard/SideMenu/SideMenu";
import ToursPage from "./Dashboard/DashboardPage/ToursPage";
// import Subscribers from "./Dashboard/DashboardPage/Subscribers";
import Guides from "./Dashboard/DashboardPage/Guides";
import AddSafari from "./Dashboard/DashboardPage/AddSafari";
import AddGuide from "./Dashboard/DashboardPage/AddGuide";
import SafariDetails from "./Dashboard/DashboardPage/safariDetails";
import EditSafari from "./Dashboard/DashboardPage/editSafari";
import BookingDetails from "./Dashboard/DashboardPage/bookingDetails";
import EditGuide from "./Dashboard/DashboardPage/EditGuide";
import Settings from "./Dashboard/DashboardPage/Settings";
import StaffLogin from "./frontend/LoginPage/StaffLogin";

const DashboardLayout = () => {
  return (
    <div className="OutletCSS flex">
      <SideMenu />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([

  {
    path: "/",
    element: (
      <div>
        <HomePage />
      </div>
    ),
  },
  {
    path: "/about",
    element: (
      <div>
        <AboutPage />
      </div>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <div>
        <DetailsPage />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/staffLogin",
    element: (
      <div>
        <StaffLogin />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <Signup />
      </div>
    ),
  },

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/bookings",
        element: <Bookings />
      },
      {
        path: "/toursPage",
        element: <ToursPage />
      },
      // {
      //   path: "/subscribers",
      //   element: <Subscribers />
      // },
      {
        path: "/guides",
        element: <Guides />
      },
      {
        path: "/addSafari",
        element: <AddSafari />
      },
      {
        path: "/addGuide",
        element: <AddGuide />
      },
      {
        path: "/safariDetails/:id",
        element: <SafariDetails />
      },
      {
        path: "/editSafari/:id",
        element: <EditSafari />
      },
      {
        path: "/bookingDetails/:id",
        element: <BookingDetails />
      },
      {
        path: "/editGuide/:id",
        element: <EditGuide />
      },
      {
        path: "/settings",
        element: <Settings />
      }
    ],
  },
  
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
