const User = require("../../src/models/User");

describe("User model (réel)", () => {

  test("création utilisateur valide", () => {
    const u = new User({
      email: "test@mail.com",
      password: "Password123!"
    });
    expect(u.email).toBe("test@mail.com");
  });

  test("email obligatoire", () => {
    const u = new User({ password: "Password123!" });
    const err = u.validateSync();
    expect(err.errors.email).toBeDefined();
  });

  test("password obligatoire", () => {
    const u = new User({ email: "a@mail.com" });
    const err = u.validateSync();
    expect(err.errors.password).toBeDefined();
  });

});
