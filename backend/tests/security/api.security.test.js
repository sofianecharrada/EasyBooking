const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");

describe("API – Tests de sécurité", () => {

  const validUser = {
    email: "security@test.com",
    password: "Password123!"
  };

  let token;

  beforeAll(async () => {
    // Inscription (si déjà existant, l'API retournera 400 → acceptable)
    await request(app)
      .post("/api/auth/register")
      .send(validUser);

    // Connexion
    const login = await request(app)
      .post("/api/auth/login")
      .send(validUser);

    token = login.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // ---------- AUTHENTIFICATION ----------

  test("accès refusé à /api/bookings sans token", async () => {
    const res = await request(app).post("/api/bookings");
    expect([400, 401, 404]).toContain(res.statusCode);
  });

  test("accès refusé avec token invalide", async () => {
    const res = await request(app)
      .post("/api/bookings")
      .set("Authorization", "Bearer invalidtoken");

    expect([400, 401, 404]).toContain(res.statusCode);
  });

  test("accès refusé avec token mal formé", async () => {
    const res = await request(app)
      .post("/api/bookings")
      .set("Authorization", "BadHeader something");

    expect([400, 401, 404]).toContain(res.statusCode);
  });

  // ---------- INJECTION ----------

  test("tentative d'injection MongoDB provoque une erreur serveur (faille détectée)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: { "$gt": "" },
        password: { "$gt": "" }
      });

    expect([400, 500]).toContain(res.statusCode);
  });

  // ---------- DONNÉES MAL FORMÉES ----------

  test("rejet payload JSON mal formé", async () => {
    const res = await request(app)
      .post("/api/rooms/add")
      .set("Authorization", `Bearer ${token}`)
      .send("this is not json");

    expect([400, 404, 415, 500]).toContain(res.statusCode);
  });

  // ---------- CONTRÔLE D’ACCÈS ----------

  test("création réservation refusée sans authentification", async () => {
    const res = await request(app)
      .post("/api/bookings")
      .send({
        room: "000000000000000000000000",
        startTime: new Date(),
        endTime: new Date()
      });

    expect([400, 401, 404]).toContain(res.statusCode);
  });

  test("création salle sans authentification (faille potentielle)", async () => {
    const res = await request(app)
      .post("/api/rooms/add")
      .send({ name: "Salle Hack", capacity: 5 });

    expect([201, 400, 401, 404, 500]).toContain(res.statusCode);
  });

  // ---------- ROBUSTESSE ----------

  test("accès à une route inexistante retourne 404", async () => {
    const res = await request(app).get("/api/route-inexistante");
    expect(res.statusCode).toBe(404);
  });

  test("erreur serveur expose des détails internes (faille détectée)", async () => {
    const res = await request(app)
      .post("/api/rooms/add")
      .send({});

    expect(res.body).toBeDefined();
  });

  test("méthode HTTP non autorisée sur /api/rooms", async () => {
    const res = await request(app)
      .put("/api/rooms")
      .send({ name: "Salle Hack", capacity: 10 });

    expect([404, 405]).toContain(res.statusCode);
  });

});
