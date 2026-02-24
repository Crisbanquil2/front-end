import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProgramList from './components/ProgramList';
import ProgramDetails from './components/ProgramDetails';
import SubjectList from './components/SubjectList';
import LoginPage from './components/loginpage';
import './App.css';

function DashboardLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/programs" element={<ProgramList />} />
          <Route path="/programs/:id" element={<ProgramDetails />} />
          <Route path="/subjects" element={<SubjectList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
