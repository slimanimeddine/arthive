import { type Artwork } from "./artwork";
import { type BaseModel } from "./base";
import { type User } from "./user";

export type FavoriteModel = BaseModel & {
  artwork_id: string;
  user_id: string;
};

export type Favorite = FavoriteModel & {
  user: User;
  artwork: Artwork;
};
