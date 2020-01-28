import app from "../../app";
import request from "supertest";

describe("GET /api - main api endpoint", () => {
  it("Main API Request", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toEqual(200);
  });
});
