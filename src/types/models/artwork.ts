import type { ArtworkComment } from "./artwork-comment";
import type { ArtworkLike } from "./artwork-like";
import type { ArtworkPhoto } from "./artwork-photo";
import type { BaseModel } from "./base";
import type { Tag } from "./tag";
import type { User } from "./user";

export type ArtworkModel = BaseModel & {
  title: string;
  description: string;
  status: "draft" | "published";
  user_id: string;
  artwork_likes_count: number;
  artwork_comments_count: number;
  artwork_main_photo_path: string;
};

export type Artwork = ArtworkModel & {
  user: User;
  artwork_photos: ArtworkPhoto[];
  artwork_comments: ArtworkComment[];
  artwork_likes: ArtworkLike[];
  tags: Tag[];
};
