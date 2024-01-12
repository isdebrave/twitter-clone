declare module "express-session" {
  interface SessionData {
    code: string;
    expiration: number;
    meId: string | null;
  }
}

export default {};
