// src/components/WorkoutList.jsx
import React from 'react';

const WorkoutList = ({ workouts, onEdit, onToggleComplete, onViewExercises, userIdFilter }) => {
  const filteredWorkouts = workouts.filter((workout) =>
    userIdFilter === '' ? true : String(workout.user_id) === userIdFilter
  );

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>User ID</th>
          <th style={styles.th}>User Name</th>
          <th style={styles.th}>Workout Type</th>
          <th style={styles.th}>Notes</th>
          <th style={styles.th}>Completed</th>
          <th style={styles.th}>Last Updated</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <tr key={workout.id} style={workout.completed ? styles.completedRow : {}}>
              <td style={styles.td}>{workout.user_id}</td>
              <td style={styles.td}>{workout.user_name}</td>
              <td style={styles.td}>{workout.workout_type}</td>
              <td style={styles.td}>{workout.notes || 'N/A'}</td>
              <td style={styles.td}>
                <input
                  type="checkbox"
                  checked={workout.completed}
                  onChange={() => onToggleComplete(workout.id, workout.completed)}
                  title="Mark Complete"
                />
              </td>
              <td style={styles.td}>{new Date(workout.last_updated).toLocaleString()}</td>
              <td style={styles.td}>
                <button onClick={() => onViewExercises(workout.id)} style={styles.viewButton}>View Exercises</button>
                <button onClick={() => onEdit(workout)} style={styles.button}>Edit</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" style={styles.td}>No workouts found</td>
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
  th: {
    border: '1px solid #ddd',
    padding: '10px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px',
  },
  viewButton: {
    padding: '5px 10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px',
  },
  completedRow: {
    backgroundColor: '#d4edda',
    textDecoration: 'line-through',
  },
};

export default WorkoutList;
