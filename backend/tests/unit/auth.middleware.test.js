const auth = require("../../src/middleware/auth");

describe("Auth middleware (réel)", () => {

  test("refuse requête sans token", () => {
    const req = { header: jest.fn().mockReturnValue(null) };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("refuse requête avec token invalide", () => {
    const req = { header: jest.fn().mockReturnValue("Bearer faketoken") };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalled();
  });
});
