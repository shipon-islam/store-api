export interface userType {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface DecodedToken {
  id?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
