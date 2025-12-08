import type { Artwork } from "./artwork";
import type { BaseModel } from "./base";
import type { User } from "./user";

export type ArtworkLikeModel = BaseModel & {
  artwork_id: string;
  user_id: string;
};

export type ArtworkLike = ArtworkLikeModel & {
  artwork: Artwork;
  user: User;
};
