const Car = require("./carLib");

// GET /cars
const getAllCars = (req, res) => {
  const cars = Car.getAll();
  res.json(cars);
};

// POST /cars
const createCar = (req, res) => {
  const { model, color, age } = req.body;
  const newCar = Car.addOne(model, color, age);

  if (newCar) {
    res.json(newCar);
  } else {
    res.status(500).json({ message: "Failed to create car" });
  }
};

// GET /cars/:carId
const getCarById = (req, res) => {
  const car = Car.findById(req.params.carId);
  car
    ? res.json(car)
    : res.status(404).json({ message: "Car not found" });
};

// PUT /cars/:carId
const updateCar = (req, res) => {
  const updatedCar = Car.updateOneById(req.params.carId, req.body);

  updatedCar
    ? res.json(updatedCar)
    : res.status(404).json({ message: "Car not found" });
};

// DELETE /cars/:carId
const deleteCar = (req, res) => {
  const isDeleted = Car.deleteOneById(req.params.carId);

  isDeleted
    ? res.json({ message: "Car deleted successfully" })
    : res.status(404).json({ message: "Car not found" });
};

module.exports = {
  getAllCars,
  createCar,
  getCarById,
  updateCar,
  deleteCar,
};
