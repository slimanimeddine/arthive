import type { Artwork } from "./artwork";
import type { BaseModel } from "./base";
import type { User } from "./user";

export type ArtworkCommentModel = BaseModel & {
  comment_text: string;
  artwork_id: string;
  user_id: string;
};

export type ArtworkComment = ArtworkCommentModel & {
  artwork: Artwork;
  user: User;
};
