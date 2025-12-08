import type { BaseModel } from "./base";
import type { User } from "./user";

export type FollowModel = BaseModel & {
  follower_id: string;
  followed_id: string;
};

export type Follow = FollowModel & {
  follower: User;
  followed: User;
};
