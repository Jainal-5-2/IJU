import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import SchoolRegister from './pages/SchoolRegister';
import StudentLogin from './pages/Login';
import SchoolLogin from './pages/SchoolLogin';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PlatformAdminDashboard from './pages/PlatformAdminDashboard';
import SchoolDashboard from './pages/SchoolDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TutorSearch from './pages/TutorSearch';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/school/register" element={<SchoolRegister />} />
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/school/login" element={<SchoolLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<PlatformAdminDashboard />} />
          <Route path="/school/dashboard" element={<SchoolDashboard />} />
          <Route path="/tutor/dashboard" element={<Dashboard />} />
          <Route path="/tutee/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<TutorSearch />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;