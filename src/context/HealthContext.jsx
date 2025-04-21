import { createContext, useState, useEffect } from 'react';

export const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [waterIntake, setWaterIntake] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [dailyGoals, setDailyGoals] = useState({
    water: 8, // 8 glasses
    exercise: 30, // 30 minutes
    calories: 2000, // 2000 calories
  });

  const exerciseUrl = 'https://680519e4ca467c15be68400d.mockapi.io/healht-data/exercises';
  const nutritionUrl = 'https://680519e4ca467c15be68400d.mockapi.io/healht-data/nutrition';

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data || []);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchData(exerciseUrl, setExercises);
    fetchData(nutritionUrl, setNutrition);

  }, []);

  const addData = async (url, newData) => {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
    } catch (error) {
      console.error(`Error adding data to ${url}:`, error);
    }
  };

  const addWaterIntake = (amount) => {
    const newWaterIntake = [
      ...waterIntake,
      {
        id: Date.now(),
        amount,
        date: new Date().toISOString(),
      },
    ];
    setWaterIntake(newWaterIntake);
  };

  const addExercise = (exercise) => {
    const newExercises = [
      ...exercises,
      {
        id: Date.now(),
        ...exercise,
        date: new Date().toISOString(),
      },
    ];
    setExercises(newExercises);
    addData(exerciseUrl, newExercises[newExercises.length - 1]);
  };

  const addNutrition = (item) => {
    const newNutrition = [
      ...nutrition,
      {
        id: Date.now(),
        ...item,
        date: new Date().toISOString(),
      },
    ];
    setNutrition(newNutrition);
    addData(nutritionUrl, newNutrition[newNutrition.length - 1]);
  };

  const updateGoals = (newGoals) => {
    setDailyGoals(newGoals);
  };

  return (
    <HealthContext.Provider
      value={{
        waterIntake,
        exercises,
        nutrition,
        dailyGoals,
        addWaterIntake,
        addExercise,
        addNutrition,
        updateGoals,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};
