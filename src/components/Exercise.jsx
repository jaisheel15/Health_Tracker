import { useState, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';

const Exercise = () => {
  const { exercises, addExercise, dailyGoals } = useContext(HealthContext);
  const [formData, setFormData] = useState({
    type: 'Running',
    duration: 30,
    intensity: 'Moderate'
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.duration <= 0) {
      setError('Duration must be positive');
      return;
    }
    addExercise(formData);
    setFormData({
      type: 'Running',
      duration: 30,
      intensity: 'Moderate'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) || 0 : value
    }));
  };

  const totalExercise = exercises.reduce((sum, entry) => sum + entry.duration, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Exercise Tracker</h1>
      <div className="mb-8 p-4 bg-green-50 rounded-lg">
        <h3 className="text-xl font-semibold">Today's Total: {totalExercise} minutes</h3>
        <p>Goal: {dailyGoals.exercise} minutes</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Exercise Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Running">Running</option>
              <option value="Walking">Walking</option>
              <option value="Cycling">Cycling</option>
              <option value="Swimming">Swimming</option>
              <option value="Weight Training">Weight Training</option>
              <option value="Yoga">Yoga</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Duration (mins):</label>
            <input
              type="number"
              name="duration"
              min="1"
              max="240"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Intensity:</label>
            <select
              name="intensity"
              value={formData.intensity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Light">Light</option>
              <option value="Moderate">Moderate</option>
              <option value="Vigorous">Vigorous</option>
            </select>
          </div>
        </div>
        
       
        <button 
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Exercise
        </button>
      </form>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Today's Exercises</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intensity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exercises.map((exercise) => (
                <tr key={exercise.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(exercise.date).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exercise.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exercise.duration} mins
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      exercise.intensity === 'Light' ? 'bg-blue-100 text-blue-800' :
                      exercise.intensity === 'Moderate' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {exercise.intensity}
                    </span>
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

export default Exercise;