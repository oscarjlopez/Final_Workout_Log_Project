require('dotenv').config();  // Load environment variables

const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const jwt_decode = require('jwt-decode');  // Add jwt-decode for decoding tokens
const { getMotivationalQuote } = require('./motivationalQuoteAI');
const { sendWorkoutEmail } = require('./sendgridclient');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Sequelize Setup
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.SUPABASE_PASSWORD,
  database: process.env.DB_NAME,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Workout Model
// Workout Model
const Workout = sequelize.define("Workout", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  workout_type: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  last_updated: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: "workouts",
  timestamps: false
});

app.post("/sendgrid-events", async (req, res) => {
  console.log("Received a request at /sendgrid-events");
  console.log("Request body:", req.body);

  const events = req.body;

  if (!Array.isArray(events)){
    console.log("Invalid request format: not an array.");
    return res.status(400).json({error: 'Invalid request format'});

  }

  events.forEach((event) => {
    console.log(`Sendgrid webhook triggered: ${event.event}`);
    if (event.event === 'Delivered') {
      console.log(`${event.email} - Delivered`);
    } else if (event.event === 'Open') {
      console.log(`${event.email} - Opened`);
    }

  });

  res.status(200).send('Event received');
});

// Exercise Model
const Exercise = sequelize.define("Exercise", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  workout_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  workout_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reps_per_set: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  },
  weight_per_set: {
    type: DataTypes.ARRAY(DataTypes.FLOAT),
    allowNull: false
  }
}, {
  tableName: "exercises",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Routes

// POST: Register a new user
app.post('/api/registerUser', async (req, res) => {
  const { email, sub, created_at } = req.body;

  try {
    // Assuming 'users' table exists in your PostgreSQL database for user registration
    const [user, created] = await sequelize.models.User.findOrCreate({
      where: { sub },
      defaults: { email, sub, created_at }
    });

    if (created) {
      res.status(201).json({ message: "User successfully registered", user });
    } else {
      res.status(200).json({ message: "User already registered", user });
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// GET: All workouts
app.get("/workouts", async (req, res) => {
  try {
    const workouts = await Workout.findAll();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// POST: New workout
app.post("/workouts", async (req, res) => {
  try {
    const { user_id, user_name, workout_type, notes } = req.body;

    // Validate required fields
    if (!user_id || !user_name || !workout_type) {
      return res.status(400).json({ error: "user_id, user_name, and workout_type are required" });
    }

    // Create new workout
    const newWorkout = await Workout.create({ user_id, user_name, workout_type, notes });
    await sendWorkoutEmail(newWorkout);
    

    // Respond with the created workout
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error("Error adding workout:", error);
    res.status(500).json({ error: error.message });
  }
});


// GET: Exercises for a workout
app.get("/exercises/workout/:workoutId", async (req, res) => {
  const workoutId = req.params.workoutId;
  try {
    const exercises = await Exercise.findAll({ where: { workout_id: workoutId } });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: New exercise
app.post('/exercises', async (req, res) => {
  try {
    const { workout_id, workout_name, sets, reps_per_set, weight_per_set } = req.body;

    if (!workout_id || !workout_name || !sets || !reps_per_set || !weight_per_set) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!Array.isArray(reps_per_set) || !Array.isArray(weight_per_set)) {
      return res.status(400).json({ error: "reps_per_set and weight_per_set must be arrays" });
    }

    const repsArray = reps_per_set.map(r => parseInt(r));
    const weightsArray = weight_per_set.map(w => parseFloat(w));

    const invalidReps = repsArray.some(r => typeof r !== 'number' || isNaN(r));
    const invalidWeights = weightsArray.some(w => typeof w !== 'number' || isNaN(w));

    if (invalidReps || invalidWeights) {
      return res.status(400).json({ error: "Invalid values in reps_per_set or weight_per_set" });
    }

    const newExercise = await Exercise.create({
      workout_id,
      workout_name,
      sets: parseInt(sets), // 👈 IMPORTANT
      reps_per_set: repsArray,
      weight_per_set: weightsArray
    
    
    });

    const motivationalQuote = await getMotivationalQuote(workout_name);
    res.status(201).json({ newExercise, motivationalQuote });

  } catch (error) {
    console.error('Error adding exercise:', error);  // FULL error object
    console.error('Received request body:', req.body); 
    res.status(500).send('Internal Server Error');
  }
  
  
});

// PUT: Update exercise
app.put("/exercises/:id", async (req, res) => {
  const exerciseId = req.params.id;
  const { workout_id, workout_name, sets, reps_per_set, weight_per_set } = req.body;

  if (!workout_id || !workout_name || !sets || !reps_per_set || !weight_per_set) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!Array.isArray(reps_per_set) || !Array.isArray(weight_per_set)) {
    return res.status(400).json({ error: "reps_per_set and weight_per_set must be arrays" });
  }

  const invalidReps = reps_per_set.some(r => typeof r !== 'number' || isNaN(r));
  const invalidWeights = weight_per_set.some(w => typeof w !== 'number' || isNaN(w));

  if (invalidReps || invalidWeights) {
    return res.status(400).json({ error: "Invalid values in reps_per_set or weight_per_set" });
  }

  try {
    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise) return res.status(404).json({ error: "Exercise not found" });

    exercise.workout_id = workout_id;
    exercise.workout_name = workout_name;
    exercise.sets = sets;
    exercise.reps_per_set = reps_per_set;
    exercise.weight_per_set = weight_per_set;

    await exercise.save();
    res.json(exercise);
  } catch (error) {
    console.error("Error updating exercise:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Workout
app.delete("/workouts/:id", async (req, res) => {
  try {
    const deleted = await Workout.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: "Workout deleted successfully" });
    else res.status(404).json({ error: "Workout not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Exercise
app.delete("/exercises/:id", async (req, res) => {
  try {
    const deleted = await Exercise.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: "Exercise deleted successfully" });
    else res.status(404).json({ error: "Exercise not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update workout
// PUT: Update workout (including toggling completed)
app.put("/workouts/:id", async (req, res) => {
  try {
    const { user_id, workout_type, notes, completed, user_name } = req.body;

    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    // Update only the fields that are provided
    if (user_id !== undefined) workout.user_id = user_id;
    if (workout_type !== undefined) workout.workout_type = workout_type;
    if (notes !== undefined) workout.notes = notes;
    if (completed !== undefined) workout.completed = completed;
    if (user_name !== undefined) workout.user_name = user_name; // Update user_name if provided
    workout.last_updated = new Date(); // Update last_updated to current date

    await workout.save();

    res.json(workout);
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
