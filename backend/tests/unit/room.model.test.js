const Room = require("../../src/models/Room");

describe("Room model (réel)", () => {

  test("room valide", () => {
    const r = new Room({ name: "Salle A", capacity: 10 });
    expect(r.name).toBe("Salle A");
  });

  test("name obligatoire", () => {
    const r = new Room({ capacity: 5 });
    const err = r.validateSync();
    expect(err.errors.name).toBeDefined();
  });

  test("capacity obligatoire", () => {
    const r = new Room({ name: "Salle B" });
    const err = r.validateSync();
    expect(err.errors.capacity).toBeDefined();
  });

});
