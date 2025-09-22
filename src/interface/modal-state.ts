import type {CarModelInterface} from "./car-model.interface.ts";
import type {WinnerModel} from "./winner-interface.ts";

export interface ModalState {
    isOpen: boolean;
    mode: string,
    car: CarModelInterface | undefined
}

export interface ModalWinnerState {
    isOpen: boolean;
    winner: WinnerModel | null
}