import { useState, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';

const GoalForm = () => {
  const { dailyGoals, updateGoals } = useContext(HealthContext);
  const [formData, setFormData] = useState(dailyGoals);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGoals(formData);
    alert('Daily goals updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Update Daily Goals</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Water (glasses):</label>
            <input
              type="number"
              name="water"
              min="1"
              value={formData.water}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Exercise (minutes):</label>
            <input
              type="number"
              name="exercise"
              min="1"
              value={formData.exercise}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Calories (kcal):</label>
            <input
              type="number"
              name="calories"
              min="1"
              value={formData.calories}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Goals
        </button>
      </form>
    </div>
  );
};

export default GoalForm;