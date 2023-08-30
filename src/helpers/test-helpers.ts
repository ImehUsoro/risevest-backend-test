export const baseURL = "/api/v1";

export const newUser = {
  firstName: "Thelma",
  lastName: "Nwokeji",
  email: "thelma@gmail.com",
  password: "123456",
};

export const currentUser = {
  id: "68e81d64-0efb-48ef-852b-4e4933a1869c",
  email: "imeusoro@rocketmail.com",
  firstName: "Imeh",
  lastName: "Usoro",
};

export const resolvedNewUser = {
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

export const userLoginCredential = {
  email: "thelma@gmail.com",
  password: "123456",
};

export const newLoginUser = {
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
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5YzUzMjQyLWU4MGQtNGQyMC05ZmJiLTA2NjllYjBkZTg1NCIsImVtYWlsIjoidGhlbG1hQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IlRoZWxtYSIsImxhc3ROYW1lIjoiTndva2VqaSIsImV4cCI6MTY5MzcwMDg2NiwiaWF0IjoxNjkzMDk2MDY2fQ.TQcK6MjgVZyo7RSBzJVRK4Ej0G7jcPQbwzadHgUiLm8",
  },
};

export const createdPost = {
  message: "success",
  data: {
    id: "3e63dd6a-6910-4d1b-b839-90940e14e729",
    content: "First post on Risevest!",
    createdAt: "2023-08-27T00:40:48.349Z",
    updatedAt: "2023-08-27T00:40:48.349Z",
    userId: "c9c53242-e80d-4d20-9fbb-0669eb0de854",
    user: {
      id: "c9c53242-e80d-4d20-9fbb-0669eb0de854",
      firstName: "Thelma",
      lastName: "Nwokeji",
    },
  },
};

export const mockPost = {
  id: "3e63dd6a-6910-4d1b-b839-90940e14e729",
  content: "First post on Risevest!",
  createdAt: "2023-08-27T00:40:48.349Z",
  updatedAt: "2023-08-27T00:40:48.349Z",
  userId: "c9c53242-e80d-4d20-9fbb-0669eb0de854",
};

export const createdComment = {
  message: "success",
  data: {
    id: "85d48ae6-6788-4e0a-a7ab-a5b7c552f8f2",
    content:
      "I'm sorry but i agree with Dami on this. Let's leave out anything work related on this platform",
    createdAt: "2023-08-25T06:21:05.141Z",
    updatedAt: "2023-08-25T06:21:05.141Z",
    userId: "bcf2718e-b4ef-49a6-9598-2ee9ac3abae0",
    postId: "d8bc8146-c328-4f5a-853a-fc41c7703890",
    user: {
      id: "bcf2718e-b4ef-49a6-9598-2ee9ac3abae0",
      firstName: "Thelma",
      lastName: "Nwokeji",
    },
    post: {
      id: "d8bc8146-c328-4f5a-853a-fc41c7703890",
      content: "Redis is an interesting concept, isn't it?",
      user: {
        firstName: "Imeh",
        lastName: "Usoro",
      },
    },
  },
};
