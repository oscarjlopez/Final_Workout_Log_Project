// src/components/WorkoutForm.jsx
import React from 'react';

const WorkoutForm = ({ formData, handleInputChange, onSubmit, isEditing }) => {
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
      <select
        name="workout_type"
        value={formData.workout_type}
        onChange={handleInputChange}
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
      </select>
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
