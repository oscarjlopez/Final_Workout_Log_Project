import React, { useState, useEffect } from 'react';

const ExerciseForm = ({ workoutId, onSubmit, initialData }) => {
  const [exerciseForm, setExerciseForm] = useState({
    workout_name: '',
    sets: '',
    reps_per_set: [],
    weight_per_set: []
  });

  useEffect(() => {
    if (initialData) {
      setExerciseForm({
        workout_name: initialData.workout_name,
        sets: initialData.sets.toString(),
        reps_per_set: initialData.reps_per_set.map(String),
        weight_per_set: initialData.weight_per_set.map(String)
      });
    }
  }, [initialData]);

  const handleExerciseInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'sets') {
      const newSets = parseInt(value) || 0;
      const repsArray = Array(newSets).fill('');
      const weightsArray = Array(newSets).fill('');
      setExerciseForm({ ...exerciseForm, sets: newSets, reps_per_set: repsArray, weight_per_set: weightsArray });
    } else {
      setExerciseForm({ ...exerciseForm, [name]: value });
    }
  };

  const handleRepsChange = (index, value) => {
    const updatedReps = [...exerciseForm.reps_per_set];
    updatedReps[index] = value;
    setExerciseForm({ ...exerciseForm, reps_per_set: updatedReps });
  };

  const handleWeightChange = (index, value) => {
    const updatedWeights = [...exerciseForm.weight_per_set];
    updatedWeights[index] = value;
    setExerciseForm({ ...exerciseForm, weight_per_set: updatedWeights });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { workout_name, sets, reps_per_set, weight_per_set } = exerciseForm;

    const payload = {
      workout_id: workoutId,
      workout_name,
      sets: parseInt(sets),
      reps_per_set: reps_per_set.map(Number),
      weight_per_set: weight_per_set.map(Number)
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        name="workout_name"
        value={exerciseForm.workout_name}
        onChange={handleExerciseInputChange}
        placeholder="Exercise Name"
        required
      />
      <input
        type="number"
        name="sets"
        value={exerciseForm.sets}
        onChange={handleExerciseInputChange}
        placeholder="Sets"
        required
        min="1"
      />
      {exerciseForm.reps_per_set.map((rep, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="number"
            value={rep}
            onChange={(e) => handleRepsChange(index, e.target.value)}
            placeholder={`Reps for Set ${index + 1}`}
            required
            style={{ width: '120px', marginBottom: '5px' }}
          />
          <input
            type="number"
            value={exerciseForm.weight_per_set[index] || ''}
            onChange={(e) => handleWeightChange(index, e.target.value)}
            placeholder={`Weight for Set ${index + 1}`}
            required
            style={{ width: '120px' }}
          />
        </div>
      ))}
      <button type="submit">
        {initialData ? 'Update Exercise' : 'Add Exercise'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

export default ExerciseForm;
