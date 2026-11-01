import { Credit } from "../../components/credits/credits.component";

export interface CarOption {
  id: string;
  name: string;
  era: string;
  file: string;
  credit?: Credit; // only for assets that require attribution
  rotationY?: number;
}