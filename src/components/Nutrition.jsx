import { useState, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';

const Nutrition = () => {
  const { nutrition, addNutrition, dailyGoals } = useContext(HealthContext);
  const [formData, setFormData] = useState({
    food: '',
    calories: '',
    carbs: '',
    protein: '',
    fat: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.calories <= 0 || !formData.food) {
      setError('Please enter valid food and calories');
      return;
    }
    addNutrition({
      ...formData,
      calories: parseInt(formData.calories),
      carbs: parseInt(formData.carbs) || 0,
      protein: parseInt(formData.protein) || 0,
      fat: parseInt(formData.fat) || 0
    });
    setFormData({
      food: '',
      calories: '',
      carbs: '',
      protein: '',
      fat: ''
    });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const totalCalories = nutrition.reduce((sum, entry) => sum + entry.calories, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nutrition Tracker</h1>
      <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-xl font-semibold">Today's Total: {totalCalories} calories</h3>
        <p>Goal: {dailyGoals.calories} calories</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Food Item:</label>
            <input
              type="text"
              name="food"
              value={formData.food}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="e.g. Chicken Salad"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Calories:</label>
            <input
              type="number"
              name="calories"
              min="1"
              value={formData.calories}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Carbs (g):</label>
            <input
              type="number"
              name="carbs"
              min="0"
              value={formData.carbs}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Protein (g):</label>
            <input
              type="number"
              name="protein"
              min="0"
              value={formData.protein}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Fat (g):</label>
            <input
              type="number"
              name="fat"
              min="0"
              value={formData.fat}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button 
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          Add Food
        </button>
      </form>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Today's Nutrition</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Macros (g)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {nutrition.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.date).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.food}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.calories}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <span className="text-blue-600">C:{item.carbs || 0}</span>
                      <span className="text-green-600">P:{item.protein || 0}</span>
                      <span className="text-red-600">F:{item.fat || 0}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;