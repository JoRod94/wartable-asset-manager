import { BufferGeometry } from "three";

export type Asset = {
  name: string;
  uri: string;
  size: number;
};

export type BasicCharacterInfo = {
  uuid: string;
  file: string;
};

export type BasicCharacterMap = Record<string, BasicCharacterInfo>;

export type GeometryRecord = Record<string, BufferGeometry>;