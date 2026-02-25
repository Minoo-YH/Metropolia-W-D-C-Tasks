const workouts = [
  {
    title: "Workout 2023-10-05",
    reps: 35,
    load: 20,
  },
  {
    title: "Workout 2023-10-06",
    reps: 11,
    load: 101,
  },
  {
    title: "Workout 2023-10-07",
    reps: 30,
    load: 42,
  },
  {
    title: "Workout 2023-10-08",
    reps: 12,
    load: 102,
  },
];

const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutController");

router.delete("/:id", deleteWorkout);
module.exports = workouts;
