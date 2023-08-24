import { User } from "@prisma/client";

// enum UserTypes {
//   Seller,
//   Buyer
// }

export interface UserPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

declare global {
  namespace Express {
    interface Users extends User {}
  }
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
