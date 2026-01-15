const Booking = require("../../src/models/Booking");
const mongoose = require("mongoose");

describe("Booking model (réel)", () => {

  test("création booking valide", () => {
    const b = new Booking({
      user: new mongoose.Types.ObjectId(),
      room: new mongoose.Types.ObjectId(),
      startTime: new Date(),
      endTime: new Date()
    });

    expect(b.user).toBeDefined();
    expect(b.room).toBeDefined();
  });

  test("booking sans champs ne plante pas", () => {
    const b = new Booking({});
    expect(b).toBeDefined();
  });

});
