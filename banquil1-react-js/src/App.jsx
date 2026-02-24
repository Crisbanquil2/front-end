import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProgramList from './components/ProgramList';
import ProgramDetails from './components/ProgramDetails';
import SubjectList from './components/SubjectList';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/programs" element={<ProgramList />} />
            <Route path="/programs/:id" element={<ProgramDetails />} />
            <Route path="/subjects" element={<SubjectList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
