import { StatusCodes } from "http-status-codes";
import supertest from "supertest";
import app from "../../app";
import { baseURL } from "../../helpers";

const request = supertest(app);

describe("Register user", () => {
  const data = {
    firstName: "Jane",
    lastName: "Doe",
    email: "Jane@doe.com",
    password: "JaneDoe123",
  };

  it("returns 400 with an invalid email", async () => {
    await request
      .post(`${baseURL}/users/register-user`)
      .send({ ...data, email: "Jane.com" })
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("disallows duplicate emails", async () => {
    await request
      .post(`${baseURL}/users/register-user`)
      .send(data)
      .expect(StatusCodes.CREATED);
    await request
      .post(`${baseURL}/users/register-user`)
      .send(data)
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("returns 400 with fields being empty", async () => {
    await request
      .post(`${baseURL}/users/register-user`)
      .send({})
      .expect(StatusCodes.BAD_REQUEST);
  });
});
