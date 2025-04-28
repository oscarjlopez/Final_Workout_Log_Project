import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ExerciseForm from '../components/ExerciseForm';
import ExerciseTable from '../components/ExerciseTable';
import MotivationalQuote from '../components/MotivationalQuote';
import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';

const EXERCISE_API_URL = 'http://localhost:5001/exercises';

const Exercises = () => {
  const { workoutId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [editingExercise, setEditingExercise] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExercises();
  }, [workoutId]);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(`${EXERCISE_API_URL}/workout/${workoutId}`);
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const addExercise = async (exerciseForm) => {
    try {
      const response = await axios.post(EXERCISE_API_URL, exerciseForm);
      const { motivationalQuote } = response.data;
      setMotivationalQuote(motivationalQuote);
      fetchExercises();
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  const updateExercise = async (exerciseForm) => {
    try {
      await axios.put(`${EXERCISE_API_URL}/${editingExercise.id}`, exerciseForm);
      setEditingExercise(null);
      fetchExercises();
    } catch (error) {
      console.error('Error updating exercise:', error);
    }
  };

  const deleteExercise = async (id) => {
    try {
      await axios.delete(`${EXERCISE_API_URL}/${id}`);
      fetchExercises();
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h1>Exercises for Workout {workoutId}</h1>
        
        <MotivationalQuote quote={motivationalQuote} />

        <ExerciseForm
          workoutId={workoutId}
          onSubmit={editingExercise ? updateExercise : addExercise}
          initialData={editingExercise}
        />

        <ErrorBoundary>
        <ExerciseTable
          exercises={exercises}
          onEdit={setEditingExercise}
          onDelete={deleteExercise}
        />
        </ErrorBoundary>
       

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <button onClick={() => navigate('/workouts')} style={styles.backButton}>
            ⬅ Back to Workouts
          </button>
        </div>
      </div>
      <Footer />

    </>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default Exercises;
