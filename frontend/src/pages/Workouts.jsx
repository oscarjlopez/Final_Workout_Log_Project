import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';

const API_URL = 'http://localhost:5001/workouts';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({
    user_id: '',
    user_name: '',
    workout_type: '',
    notes: '',
  });
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [userIdFilter, setUserIdFilter] = useState(''); // user_id filter state
  const navigate = useNavigate();
  const { signOut } = useAuthContext();

  useEffect(() => {
    fetchWorkouts();
  }, [userIdFilter]); // Refetch workouts whenever userIdFilter changes

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: { user_id: userIdFilter }, // Pass user_id as query param to filter
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addWorkout = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: parseInt(formData.user_id),
      user_name: formData.user_name,
      workout_type: formData.workout_type,
      notes: formData.notes,
      completed: false,
      last_updated: new Date().toISOString(),
    };
    try {
      await axios.post(API_URL, payload);
      fetchWorkouts(); // Refresh the workouts
      setFormData({
        user_id: '',
        user_name: '',
        workout_type: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  const updateWorkout = async (e) => {
    e.preventDefault();
    const payload = { ...editingWorkout, ...formData, last_updated: new Date().toISOString() };
    try {
      await axios.put(`${API_URL}/${editingWorkout.id}`, payload);
      setEditingWorkout(null);
      fetchWorkouts();
      setFormData({
        user_id: '',
        user_name: '',
        workout_type: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  const onEdit = (workout) => {
    setEditingWorkout(workout);
    setFormData({
      user_id: workout.user_id,
      user_name: workout.user_name,
      workout_type: workout.workout_type,
      notes: workout.notes,
    });
  };

  const onToggleComplete = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/${id}`, { completed: !completed });
      fetchWorkouts(); // Refresh the workouts after updating
    } catch (error) {
      console.error('Error toggling workout completion:', error);
    }
  };

  const onViewExercises = (workoutId) => {
    navigate(`/exercises/${workoutId}`);
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        {/* Filter Section */}
        <div style={styles.filterContainer}>
          <label htmlFor="userIdFilter">Filter by User ID: </label>
          <input
            type="number"
            id="userIdFilter"
            value={userIdFilter}
            onChange={(e) => setUserIdFilter(e.target.value)} // Update filter state
            style={styles.input}
            placeholder="Enter User ID"
          />
        </div>

        <WorkoutForm
          formData={formData}
          handleInputChange={handleInputChange}
          onSubmit={editingWorkout ? updateWorkout : addWorkout}
          isEditing={!!editingWorkout}
        />
        <WorkoutList
          workouts={workouts}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
          onViewExercises={onViewExercises}
          userIdFilter={userIdFilter} // Pass the filter to WorkoutList
        />
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  filterContainer: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    border: '2px solid #ccc',
    borderRadius: '4px',
  },
};

export default Workouts;
