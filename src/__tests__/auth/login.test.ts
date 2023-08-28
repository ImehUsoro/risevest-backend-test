import { StatusCodes } from "http-status-codes";
import supertest from "supertest";
import app from "../../app";
import { baseURL } from "../../helpers";

const request = supertest(app);

// Buyer Login tests
describe("Signin a Buyer", () => {
  beforeEach(async () => {
    await request
      .post(`${baseURL}/users/register-user`)
      .send({
        firstName: "Jane",
        lastName: "Doe",
        email: "Jane@doe.com",
        password: "JaneDoe123",
      })
      .expect(StatusCodes.CREATED);
  });

  it("should return 400 on invalid email", async () => {
    await request
      .post(`${baseURL}/users/login`)
      .send({
        email: "john",
        password: "johnDoe123",
      })
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("should return 400 on incorrect credentials of user", async () => {
    await request
      .post(`${baseURL}/users/login`)
      .send({
        email: "john@doe.com",
        password: "johnDoe",
      })
      .expect(StatusCodes.BAD_REQUEST);
  });
});
