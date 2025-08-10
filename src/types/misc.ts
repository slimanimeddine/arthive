import { type JWTPayload } from "jose";

export type SessionPayload = {
  id: string;
  token: string;
};

export type Session = JWTPayload & SessionPayload;

export type Tag =
  | "painting"
  | "graphic"
  | "sculpture"
  | "folk art"
  | "textile"
  | "ceramics"
  | "stained glass windows"
  | "beads"
  | "paper"
  | "glass"
  | "dolls"
  | "jewellery"
  | "fresco"
  | "metal"
  | "mosaic";
