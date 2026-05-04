import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Public Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";

// Management Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import AllInvoices from "./pages/Invoices/AllInvoices";
import CreateInvoice from "./pages/Invoices/CreateInvoice";
import InvoiceDetail from "./pages/Invoices/InvoiceDetail";
import ClientsPage from "./pages/Clients/ClientsPage.jsx";

import AIInsights from "./pages/AI/AIInsights.jsx";
import SettingsPage from "./pages/Settings/SettingsPage.jsx";

// Resource & Tool Pages
import ReportsPage from "./pages/Reports/ReportsPage.jsx";
import TemplatesPage from "./pages/Templates/TemplatesPage.jsx";
import AIGenerator from "./pages/AI/AIGenerator.jsx";
import ProfilePage from "./pages/Profile/ProfilePage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes Container */}
          <Route path="/" element={<ProtectedRoute />}>
            {/* Management Group */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="invoices" element={<AllInvoices />} />
            <Route path="invoices/new" element={<CreateInvoice />} />
            <Route path="invoices/:id" element={<InvoiceDetail />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="ai-insights" element={<AIInsights />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />

            {/* Resources Group */}
            <Route path="reports" element={<ReportsPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="ai-generator" element={<AIGenerator />} />
          </Route>

          {/* Catch all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster
        position="top-center"
        toastOptions={{
          className: "rounded-2xl border border-slate-100 shadow-xl shadow-blue-900/5",
          style: { fontSize: "12px", padding: '16px 24px', color: '#1e293b', fontWeight: '700' },
        }}
      />
    </AuthProvider>
  );
};

export default App;