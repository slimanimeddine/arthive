import { type Artwork } from "./artwork";
import { type ArtworkComment } from "./artwork-comment";
import { type ArtworkLike } from "./artwork-like";
import { type BaseModel } from "./base";

export type UserModel = BaseModel & {
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  country?: string;
  bio?: string;
  photo?: string;
  artist_verified_at?: string;
  email_verified_at?: string;
  role: "artist" | "admin";
};

export type User = UserModel & {
  artworks: Artwork[];
  published_artworks: Artwork[];
  drafts: Artwork[];
  followers: User[];
  following: User[];
  favorites: Artwork[];
  artwork_likes: ArtworkLike[];
  artwork_comments: ArtworkComment[];
  received_artwork_likes: ArtworkLike[];
};
