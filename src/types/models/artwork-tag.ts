import type { Artwork } from "./artwork";
import type { BaseModel } from "./base";
import type { Tag } from "./tag";

export type ArtworkTagModel = BaseModel & {
  artwork_id: string;
  tag_id: string;
};

export type ArtworkTag = ArtworkTagModel & {
  artwork: Artwork;
  tag: Tag;
};
