import React, { useState } from 'react';

const WorkoutForm = ({ formData, handleInputChange, onSubmit, isEditing }) => {
  const [customWorkout, setCustomWorkout] = useState(false); // state to track if user wants to enter a custom workout

  const handleWorkoutTypeChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setCustomWorkout(true);
      // clear the workout_type if they pick custom
      handleInputChange({ target: { name: 'workout_type', value: '' } });
    } else {
      setCustomWorkout(false);
      handleInputChange(e);
    }
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <input
        type="number"
        name="user_id"
        value={formData.user_id}
        onChange={handleInputChange}
        placeholder="User ID"
        required
      />
      <input
        type="text"
        name="user_name"
        value={formData.user_name}
        onChange={handleInputChange}
        placeholder="Your Name"
        required
      />
      {/* Dropdown for workout type */}
      <select
        name="workout_type"
        value={customWorkout ? 'custom' : formData.workout_type}
        onChange={handleWorkoutTypeChange}
        required
      >
        <option value="">Select Type</option>
        <option value="push">Push</option>
        <option value="pull">Pull</option>
        <option value="legs">Legs</option>
        <option value="cardio">Cardio</option>
        <option value="core">Core</option>
        <option value="full-body">Full-body</option>
        <option value="flexibility-mobility">Flexibility/Mobility</option>
        <option value="strength">Strength</option>
        <option value="plyometrics">Plyometrics</option>
        <option value="endurance">Endurance</option>
        <option value="circuit">Circuit</option>
        <option value="crossfit">Crossfit</option>
        <option value="custom">Other (type your own)</option> {/* New option */}
      </select>

      {/* Only show this if customWorkout is true */}
      {customWorkout && (
        <input
          type="text"
          name="workout_type"
          value={formData.workout_type}
          onChange={handleInputChange}
          placeholder="Enter custom workout type"
          required
        />
      )}

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleInputChange}
        placeholder="Notes (optional)"
      />
      <button type="submit">{isEditing ? 'Update Workout' : 'Add Workout'}</button>
    </form>
  );
};

const styles = {
  form: {
    marginBottom: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
};

export default WorkoutForm;
