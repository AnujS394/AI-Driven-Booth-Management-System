import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import BoothManagement from "./pages/BoothManagement";
import VoterIntelligence from "./pages/VoterIntelligence";
import WorkerManagement from "./pages/WorkerManagement";
import DevelopmentTracker from "./pages/DevelopmentTracker";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import MessagingEngine from "./pages/MessagingEngine";
import WorkerMobileApp from "./pages/WorkerMobileApp";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import MapView from "./pages/MapView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "booth-management", Component: BoothManagement },
      { path: "voter-intelligence", Component: VoterIntelligence },
      { path: "worker-management", Component: WorkerManagement },
      { path: "development-tracker", Component: DevelopmentTracker },
      { path: "sentiment-analysis", Component: SentimentAnalysis },
      { path: "messaging", Component: MessagingEngine },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
      { path: "account", Component: Account },
      { path: "map-view", Component: MapView },
    ],
  },
  {
    path: "/worker-app",
    Component: WorkerMobileApp,
  },
]);