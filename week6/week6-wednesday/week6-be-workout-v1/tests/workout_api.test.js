const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Workout = require("../models/workoutModel");

const initialWorkouts = [
  {
    title: "test workout 1",
    reps: 11,
    load: 101,
  },
  {
    title: "test workout 2",
    reps: 12,
    load: 102,
  },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

beforeEach(async () => {
  await Workout.deleteMany({});
  let workoutObject = new Workout(initialWorkouts[0]);
  await workoutObject.save();
  workoutObject = new Workout(initialWorkouts[1]);
  await workoutObject.save();
});
describe("GET /api/workouts", () => {

  it("all workouts are returned", async () => {
    const response = await api.get("/api/workouts");
    expect(response.body).toHaveLength(initialWorkouts.length);
  });

  it("a specific workout is within the returned workouts", async () => {
    const response = await api.get("/api/workouts");
    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("test workout 2");
  });

  it("Workouts are returned as json", async () => {
    await api
      .get("/api/workouts")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  

});

describe("POST /api/workouts", () => {

  describe("when payload is valid", () => {
    it("should create a new workout and return 201", async () => {

      const newWorkout = {
        title: "test workout 3",
        reps: 13,
        load: 103,
      };

      await api
        .post("/api/workouts")
        .send(newWorkout)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const workoutsAtEnd = await workoutsInDb();
      expect(workoutsAtEnd).toHaveLength(initialWorkouts.length + 1);

      const titles = workoutsAtEnd.map(w => w.title);
      expect(titles).toContain(newWorkout.title);

    });
  });

});

describe("DELETE /api/workouts/:id", () => {

  describe("when id is valid", () => {
    it("should delete workout and return 204", async () => {

      const workoutsAtStart = await workoutsInDb();
      const workoutToDelete = workoutsAtStart[0];

      await api
        .delete(`/api/workouts/${workoutToDelete.id}`)
        .expect(204);

      const workoutsAtEnd = await workoutsInDb();
      expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

    });
  });

  describe("when id is invalid", () => {
    it("should return 400 for malformed id", async () => {

      const invalidId = "12345";

      await api
        .delete(`/api/workouts/${invalidId}`)
        .expect(400);

    });
  });

});



afterAll(() => {
  mongoose.connection.close();
});
