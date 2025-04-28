import React from 'react';

const ExerciseTable = ({ exercises, onEdit, onDelete }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Workout Name</th>
          <th>Sets</th>
          <th>Reps</th>
          <th>Weights</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <tr key={exercise.id}>
              <td>{exercise.id}</td>
              <td>{exercise.workout_name}</td>
              <td>{exercise.sets}</td>
              <td>{Array.isArray(exercise.reps_per_set) ? exercise.reps_per_set.join(', ') : 'No reps available'}</td>
              <td>{Array.isArray(exercise.weight_per_set) ? exercise.weight_per_set.join(', ') : 'No weights available'}</td>
              <td>
                <button onClick={() => onEdit(exercise)} style={styles.button}>
                  Edit
                </button>
                <button onClick={() => onDelete(exercise.id)} style={styles.button}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No exercises found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
  },
};

export default ExerciseTable;
