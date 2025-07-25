import { type BaseModel } from "./base";
import { type User } from "./user";

export type ArtistVerificationRequestModel = BaseModel & {
  user_id: string;
  status: "pending" | "approved" | "rejected";
  reason?: string;
};

export type ArtistVerificationRequest = ArtistVerificationRequestModel & {
  user: User;
};
