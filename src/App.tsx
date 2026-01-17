import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AnonymousRoute,
  AuthChangeRedirector,
  AuthContextProvider,
} from "openbase-react-shared";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Blasts from "./pages/Blasts";
import Contact from "./pages/Contact";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Reminders from "./pages/Reminders";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/account/login"
        element={
          <AnonymousRoute>
            <Login />
          </AnonymousRoute>
        }
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/contacts" element={<Contacts />} />
      <Route path="/dashboard/reminders" element={<Reminders />} />
      <Route path="/dashboard/blasts" element={<Blasts />} />
      <Route path="/dashboard/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthContextProvider>
          <AuthChangeRedirector>
            <AppRoutes />
          </AuthChangeRedirector>
        </AuthContextProvider>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
