const { Flights } = require("../models/Flight");
const { v4: uuid } = require("uuid");

// Add/Book flight
exports.addFlight = async (req, res) => {
  try {
    const { title, price } = await req.body;
    const newFlight = {
      id: uuid(),
      title,
      time: new Date().toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      price,
      date: new Date().toLocaleDateString(),
    };

    Flights.push(newFlight);

    res.status(201).json({
      message: "flight booked",
      newFlight,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all flight
exports.getFlights = async (req, res) => {
  try {
    const flights = Flights;
    res.status(200).json({
      message: "All flights",
      flights: flights,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Get single flight
exports.getFlight = async (req, res) => {
  try {
    let id = req.params.id;
    const flight = Flights.find((flight) => flight.id === id);
    res.status(200).json({
      message: "flight found",
      flight,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update/Edit flight
exports.updateFlight = async (req, res) => {
  try {
    let id = req.params.id;
    const flight = Flights.find((flight) => flight.id === id);
    const { title, price } = await req.body;
    flight.title = title;
    flight.price = price;

    res.status(200).json({
      message: "flight updated",
      flight,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete flight

exports.deleteFlight = async (req, res) => {
  try {
    let id = req.params.id;
    const flight = Flights.find((flight) => flight.id === id);
    Flights.splice(Flights.indexOf(flight), 1);

    res.status(200).json({
      message: "flight deleted",
      flight,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
