import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    code: string;
    expiration: number;
    meId: string | null;
  }
}
