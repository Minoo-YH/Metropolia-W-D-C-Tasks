const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});


   beforeEach(async () => {
  await Workout.deleteMany({});
});

  describe("GET /api/workouts", () => {
  it("should return workouts as JSON with status 200", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});


describe("POST /api/workouts", () => {

  describe("when payload is valid", () => {
    it("should create a workout and return status 201", async () => {
      const newWorkout = { title: "test", reps: 10, load: 20 };

      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(newWorkout)
        .expect(201);
    });
  });

  describe("when payload is invalid", () => {
    it("should return 400 when title is missing", async () => {
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send({ reps: 10 })
        .expect(400);
    });
  });

});

describe("GET /api/workouts/:id", () => {

  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send({ title: "Single Test", reps: 10, load: 20 });
  });

  it("should return a single workout with status 200", async () => {

    const workouts = await Workout.find({});
    const workoutId = workouts[0]._id;

    const response = await api
      .get(`/api/workouts/${workoutId}`)
      .set("Authorization", "bearer " + token)
      .expect(200);

    expect(response.body.title).toBe("Single Test");
  });

});

afterAll(() => {
  mongoose.connection.close();
});
