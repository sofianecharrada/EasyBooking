const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");

describe("Auth API (intégration)", () => {

  const user = {
    email: "integration@test.com",
    password: "Password123!"
  };

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("inscription refusée si email déjà utilisé", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(res.statusCode).toBe(400);
  });

  test("connexion utilisateur valide", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("connexion refusée avec mauvais mot de passe", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: "wrong" });

    expect(res.statusCode).toBe(400);
  });

  test("accès à une route inexistante sans token retourne 404", async () => {
    const res = await request(app).get("/api/bookings");
    expect(res.statusCode).toBe(404);
  });

  test("accès à une route inexistante avec token invalide retourne 404", async () => {
    const res = await request(app)
      .get("/api/bookings")
      .set("Authorization", "Bearer faketoken");

    expect(res.statusCode).toBe(404);
  });
  
afterAll(async () => {
  await mongoose.connection.close();
});

});
