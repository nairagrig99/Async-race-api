import type {CarModelInterface} from "./car-model.interface.ts";

export interface ModalState {
    isOpen: boolean;
    mode:string,
    car:CarModelInterface | undefined
}