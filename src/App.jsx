import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HealthProvider } from './context/HealthContext';
import Dashboard from './components/Dashboard';
import Exercise from './components/Exercise';
import GoalForm from './components/GoalForm';
import Nutrition from './components/Nutrition';
import Navbar from './components/Navbar';

function App() {
  return (
    <HealthProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-100">
          <Navbar />
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/exercise" element={<Exercise />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/goals" element={<GoalForm/>} />
          
            </Routes>
          </div>
        </div>
      </Router>
    </HealthProvider>
  );
}

export default App;