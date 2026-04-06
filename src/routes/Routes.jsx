import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import ClubDetails from '../pages/ClubDetails/ClubDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import { createBrowserRouter } from 'react-router'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import EventDetails from '../pages/EventDetails/EventDetails'
import EventPaymentSuccess from '../pages/Payment/EventPaymentSuccess'
import AdminClubs from '../pages/Dashboard/Admin/AdminClubs'
import Payments from '../pages/Dashboard/Admin/Payments'
import AdminStatistics from '../components/Dashboard/Statistics/AdminStatistics'
import Membership from '../pages/Dashboard/Manager/Membership'
import ManageEvents from '../pages/Dashboard/Manager/ManageEvents'
import Registrations from '../pages/Dashboard/Manager/Registrations'
import MyClubsEvent from '../pages/Dashboard/Member/MyClubsEvent'
import PaymentHistory from '../pages/Dashboard/Member/PaymentHistory'
import ManagerClubs from '../pages/Dashboard/Manager/ManagerClubs'
import MyClubs from '../pages/Dashboard/Member/MyClubs'
import ManageClub from '../pages/Dashboard/Manager/ManageClub'
import ManagerStatistics from '../components/Dashboard/Statistics/ManagerStatistics'
import MemberStatistics from '../components/Dashboard/Statistics/MemberStatistics'
import Events from '../components/Home/Events'
import Clubs from '../components/Home/Clubs'
import AdminRoutes from './AdminRoutes'
import ManagerRoutes from './ManagerRoutes'
import RequestManagement from '../pages/Dashboard/Admin/RequestManagement'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/events/:id',
        element: <PrivateRoute>
          <EventDetails />
        </PrivateRoute>,
      },
      {
        path: '/clubs/:id',
        element: (
          <PrivateRoute>
            <ClubDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />
      },
      {
        path: '/event-payment-success',
        element: <EventPaymentSuccess />
      },
      {
        path: '/events',
        element: <Events />
      },
      {
        path: '/clubs',
        element: <Clubs />
      },

    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      // admin routes

      {
        path: 'admin-Statistics',
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AdminStatistics />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'Manage-Users',
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <ManageUsers />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'clubs',
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AdminClubs />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'payments',
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <Payments />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'user-request',
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <RequestManagement />
            </AdminRoutes>
          </PrivateRoute>
        )

      },

      // manager routes 
      {
        path: 'manager-statistics',
        element: (
          <PrivateRoute>
            <ManagerRoutes>
              <ManagerStatistics />
            </ManagerRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-clubs',
        element: (
          <PrivateRoute>
            <ManagerRoutes>
              <ManagerClubs />
            </ManagerRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-club',
        element: (
          <PrivateRoute>
            <ManagerRoutes>
              <ManageClub />
            </ManagerRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'member',
        element: (
          <PrivateRoute>
            <ManagerRoutes>
              <Membership />
            </ManagerRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'events',
        element: (
          <PrivateRoute>
            <ManagerRoutes>
              <ManageEvents />
            </ManagerRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: 'registrations',
        element: <PrivateRoute>
          <ManagerRoutes>
            <Registrations />
          </ManagerRoutes>
        </PrivateRoute>,
      },


      // member routes 

      {
        path: 'member-statistics',
        element: (
          <PrivateRoute>
            <MemberStatistics />
          </PrivateRoute>
        ),
      },

      {
        path: 'my-joined-clubs',
        element: (
          <PrivateRoute>
            <MyClubs />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-events',
        element: (
          <PrivateRoute>
            <MyClubsEvent />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-history',
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },

      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

    ],
  },
])
