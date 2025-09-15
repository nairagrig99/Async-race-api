import type {CarModelInterface} from "./car-model.interface.ts";

export interface CarState {
    car: CarModelInterface[],
    loading: boolean,
    error: string | null;
}