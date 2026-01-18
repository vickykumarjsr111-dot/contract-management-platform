import { Routes, Route } from 'react-router-dom';
import BlueprintBuilder from './pages/BlueprintBuilder';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<BlueprintBuilder />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
