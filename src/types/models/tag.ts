import type { Artwork } from "./artwork";
import type { BaseModel } from "./base";

export type TagModel = BaseModel & {
  name: string;
};

export type Tag = TagModel & {
  artworks: Artwork[];
};
