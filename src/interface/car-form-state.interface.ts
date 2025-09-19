import type {CarModelInterface} from "./car-model.interface.ts";

export interface carFormState {
    form: CarModelInterface
}

export interface carListState {
    carList: CarModelInterface[]
}