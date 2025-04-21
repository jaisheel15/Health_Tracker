import { useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import ProgressChart from './ProgressChart';

const Dashboard = () => {
  const {  exercises, nutrition, dailyGoals } = useContext(HealthContext);

 
  const totalExercise = exercises.reduce((sum, entry) => sum + entry.duration, 0);

  const totalCalories = nutrition.reduce((sum, entry) => sum + entry.calories, 0);

  return (
    <div className="max-w-6xl mx-auto">
      
      <h1 className="text-3xl font-bold mb-8 text-center ">Health Dashboard</h1>       
      
    
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Exercise</h3>
          <p className="mb-4">{totalExercise} / {dailyGoals.exercise} minutes</p>
          <ProgressChart current={totalExercise} goal={dailyGoals.exercise} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Nutrition</h3>
          <p className="mb-4">{totalCalories} / {dailyGoals.calories} calories</p>
          <ProgressChart current={totalCalories} goal={dailyGoals.calories} />
        </div>
    </div>
  );
};

export default Dashboard;