import request from "supertest";
import app from "../apicalls.js";

describe("Test GET requests to /data", () => {
    test("Should respond with 200 and JSON content type on GET /data", async () => {
        const response = await request(app).get("/data");
        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toMatch(/json/);
    });
});

describe("Test GET with the path /data/1", () => {
    test("Should respond with 200 and the expected user data on GET /data/1", async () => {
        const expected = { "id": "1", "Firstname": "Jyri", "Lastname": "Kemppainen" };

        const response = await request(app).get('/data/1');

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expected);
    });
});

describe("Test POST with the path /data", () => {
    test("Should create a new user and respond with 201 Created", async () => {
        const newUser = { "id": "3", "Firstname": "New", "Lastname": "User" };

        const response = await request(app)
            .post("/data")
            .send(newUser)
            .set("content-type", "application/json");

        expect(response.status).toEqual(201);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toEqual("Created");
    });

    test("Should respond with 409 Conflict when attempting to create a duplicate user", async () => {
        const duplicateUser = { "id": "1", "Firstname": "Jyri", "Lastname": "Kemppainen" };

        const response = await request(app)
            .post("/data")
            .send(duplicateUser)
            .set("content-type", "application/json");

        expect(response.status).toEqual(409);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toEqual({ "error": "record already exists" });
    });
});

describe("Test PUT with the path /data/:id", () => {
    test("Should update an existing user and respond with 200 OK", async () => {
        const updatedUser = { "Firstname": "UpdatedFirst", "Lastname": "UpdatedLast" };

        const response = await request(app)
            .put("/data/1")
            .send(updatedUser)
            .set("content-type", "application/json");

        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toEqual({ id: "1", ...updatedUser });
    });
});