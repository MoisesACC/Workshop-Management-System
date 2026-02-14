import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import NewOrder from './pages/NewOrder';
import Clients from './pages/Clients';
import Services from './pages/Services';
import PublicServices from './pages/PublicServices';
import PublicGallery from './pages/PublicGallery';
import Finances from './pages/Finances';
import Settings from './pages/Settings';
import UsersPage from './pages/Users';
import AdminLayout from './components/AdminLayout';
import { useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Permissive check for dashboard access
  if (!role || role === 'USER') {
    return children;
  }

  // Case-insensitive check for Admin/other special roles
  if (user.role?.toUpperCase() !== role.toUpperCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Public Route (with Layout)
const PublicLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<PublicServices />} />
          <Route path="/galeria" element={<PublicGallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          } />
        </Route>

        {/* Admin Section without main Navbar */}
        <Route path="/admin" element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/new" element={<NewOrder />} />
          <Route path="clients" element={<Clients />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="services" element={<Services />} />
          <Route path="finances" element={<Finances />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
