// ===== Imports =====
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const User = require("../models/userModel");
const Workout = require("../models/workoutModel");


// ===== Global token variable =====
let token = null;


// ===== Run once before all tests =====
// Create a user and get JWT token
beforeAll(async () => {
  await User.deleteMany({});

  const response = await api
    .post("/api/user/signup")
    .send({
      email: "test@test.com",
      password: "R3g5T7#gh"
    });

  token = response.body.token;
});


// ===== Run before every test =====
// Clear workouts collection
beforeEach(async () => {
  await Workout.deleteMany({});
});


// GET ALL WORKOUTS

describe("GET /api/workouts", () => {

  it("should return workouts as JSON with status 200", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

});



// CREATE WORKOUT

describe("POST /api/workouts", () => {

  describe("when payload is valid", () => {

    it("should create a workout and return 201", async () => {
      const newWorkout = {
        title: "Test workout",
        reps: 10,
        load: 20
      };

      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(newWorkout)
        .expect(201);

      const workouts = await Workout.find({});
      expect(workouts).toHaveLength(1);
    });

  });

  describe("when payload is invalid", () => {

    it("should return 400 if title is missing", async () => {
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send({ reps: 10 })
        .expect(400);
    });

  });

});



// GET SINGLE WORKOUT

describe("GET /api/workouts/:id", () => {

  beforeEach(async () => {
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send({
        title: "Single Test",
        reps: 15,
        load: 30
      });
  });

  it("should return one workout with status 200", async () => {
    const workouts = await Workout.find({});
    const workoutId = workouts[0]._id;

    const response = await api
      .get(`/api/workouts/${workoutId}`)
      .set("Authorization", "bearer " + token)
      .expect(200);

    expect(response.body.title).toBe("Single Test");
    expect(response.body.reps).toBe(15);
  });

});

describe("DELETE /api/workouts/:id", () => {

  beforeEach(async () => {
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send({
        title: "Delete Test",
        reps: 5,
        load: 10
      });
  });

  it("should delete a workout and return 200", async () => {

    const workouts = await Workout.find({});
    const workoutId = workouts[0]._id;

    await api
      .delete(`/api/workouts/${workoutId}`)
      .set("Authorization", "bearer " + token)
      .expect(200);

    const workoutsAfter = await Workout.find({});
    expect(workoutsAfter).toHaveLength(0);
  });

});

describe("PATCH /api/workouts/:id", () => {

  beforeEach(async () => {
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send({
        title: "Patch Test",
        reps: 10,
        load: 20
      });
  });

  it("should update workout reps and return 200", async () => {

    const workouts = await Workout.find({});
    const workoutId = workouts[0]._id;

    await api
      .patch(`/api/workouts/${workoutId}`)
      .set("Authorization", "bearer " + token)
      .send({ reps: 99 })
      .expect(200);

    const updatedWorkout = await Workout.findById(workoutId);

    expect(updatedWorkout.reps).toBe(99);
  });

});

// ===== Close database connection =====
afterAll(async () => {
  await mongoose.connection.close();
});