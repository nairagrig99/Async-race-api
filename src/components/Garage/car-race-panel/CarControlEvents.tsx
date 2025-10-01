import Button from "../../../UI/Button.tsx";
import {ButtonStyleEnum} from "../../../enums/style-enum.ts";
import {ButtonType} from "../../../enums/button-type.ts";
import {openCarModal} from "../../../store/ModalSlide.ts";
import type {CarModelInterface} from "../../../interface/car-model.interface.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {removeCar} from "../../../services/GarageService.ts";
import {startCarRacing, stopCarRacing} from "../../../store/UniqCarRaceStart.ts";
import {startRaceMode, stopCar, stopRace} from "../../../store/EngineState.ts";
import {useState} from "react";
export default function CarControlEvents({car}: { car: CarModelInterface }) {
    const dispatch = useDispatch<AppDispatch>()
    const selector = useSelector((state: RootState) => state.engineStateSlice)
    const [stopState, setStopState] = useState<boolean>(true);
    const editCar = () => {
        dispatch(openCarModal({mode: ButtonType.EDIT, car: car}))
    }
    const removeCarFromList = () => {
        if (car.id != undefined) {
            dispatch(removeCar({id: car.id}))
        }
    }
    const startRacing = () => {
        if (car.id != undefined) {
            dispatch(startCarRacing(car.id))
            dispatch(stopCar(false))
            dispatch(startRaceMode(true))
            dispatch(stopRace(true))
            setStopState(false)
        }
    }
    const stopRacing = () => {
        if (car.id != undefined) {
            dispatch(stopCarRacing(car.id))
            setStopState(true)
            dispatch(startRaceMode(false))
            dispatch(stopRace(true))
        }
    }

    return <div className="flex gap-2 h-[70px]">
        <div className="flex flex-col gap-2">
            <Button onClick={editCar}
                    className={ButtonStyleEnum.EDIT_BUTTON + ' ' + (selector.start  ? ButtonStyleEnum.BUTTON_DISABLED : '')}
                    value={ButtonType.EDIT}/>
            <Button onClick={removeCarFromList}
                    disabled={selector.start}
                    className={ButtonStyleEnum.DELETE_BUTTON + ' ' + (selector.start ? ButtonStyleEnum.BUTTON_DISABLED : '')}
                    value={ButtonType.DELETE}/>
        </div>

        <div className="flex flex-col">
            <Button disabled={selector.start || !stopState}
                    onClick={startRacing}
                    className={ButtonStyleEnum.START_BUTTON + ' ' + (selector.start || !stopState ? ButtonStyleEnum.BUTTON_DISABLED : '')}
                    value={ButtonType.START}/>
            <Button onClick={stopRacing}
                    disabled={stopState || selector.stop }
                    className={ButtonStyleEnum.FINISH_BUTTON + ' ' + (stopState || selector.stop ? ButtonStyleEnum.BUTTON_DISABLED : '')}
                    value={ButtonType.STOP}/>
        </div>
    </div>
}