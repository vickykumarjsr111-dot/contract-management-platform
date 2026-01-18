import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlueprintBuilder from './pages/BlueprintBuilder';
import Dashboard from './pages/Dashboard';
import ContractPage from './pages/ContractPage';

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<BlueprintBuilder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contracts/:id" element={<ContractPage />} />
      </Routes>
    </>
  );
}
