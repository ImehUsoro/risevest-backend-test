"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newLoginUser = exports.userLoginCredential = exports.resolvedNewUser = exports.currentUser = exports.newUser = exports.baseURL = void 0;
exports.baseURL = "/api/v1";
exports.newUser = {
    firstName: "Thelma",
    lastName: "Nwokeji",
    email: "thelma@gmail.com",
    password: "123456",
};
exports.currentUser = {
    id: "68e81d64-0efb-48ef-852b-4e4933a1869c",
    email: "imeusoro@rocketmail.com",
    firstName: "Imeh",
    lastName: "Usoro",
};
exports.resolvedNewUser = {
    message: "success",
    data: {
        id: "c9c53242-e80d-4d20-9fbb-0669eb0de854",
        email: "thelma@gmail.com",
        firstName: "Thelma",
        lastName: "Nwokeji",
        createdAt: "2023-08-27T00:27:09.569Z",
        updatedAt: "2023-08-27T00:27:09.569Z",
    },
};
exports.userLoginCredential = {
    email: "thelma@gmail.com",
    password: "123456",
};
exports.newLoginUser = {
    message: "success",
    data: {
        user: {
            id: "c9c53242-e80d-4d20-9fbb-0669eb0de854",
            email: "thelma@gmail.com",
            firstName: "Thelma",
            lastName: "Nwokeji",
            createdAt: "2023-08-27T00:27:09.569Z",
            updatedAt: "2023-08-27T00:27:09.569Z",
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5YzUzMjQyLWU4MGQtNGQyMC05ZmJiLTA2NjllYjBkZTg1NCIsImVtYWlsIjoidGhlbG1hQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IlRoZWxtYSIsImxhc3ROYW1lIjoiTndva2VqaSIsImV4cCI6MTY5MzcwMDg2NiwiaWF0IjoxNjkzMDk2MDY2fQ.TQcK6MjgVZyo7RSBzJVRK4Ej0G7jcPQbwzadHgUiLm8",
    },
};
