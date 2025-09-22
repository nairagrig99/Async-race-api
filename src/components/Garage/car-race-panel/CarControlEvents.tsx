import Button from "../../../UI/Button.tsx";
import {ButtonStyleEnum} from "../../../enums/style-enum.ts";
import {ButtonType} from "../../../enums/button-type.ts";
import {openCarModal} from "../../../store/ModalSlide.ts";
import type {CarModelInterface} from "../../../interface/car-model.interface.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../store/store.ts";
import {removeCar} from "../../../services/GarageService.ts";
import {startCarRacing, stopCarRacing} from "../../../store/UniqCarRaceStart.ts";
import {useState} from "react";

export default function CarControlEvents({car}: { car: CarModelInterface }) {
    const dispatch = useDispatch<AppDispatch>()
    const [disableStartBtn, setDisableStartBtn] = useState<boolean>(false)
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
            setDisableStartBtn(true)
        }
    }
    const stopRacing = () => {
        if (car.id != undefined) {
            dispatch(stopCarRacing(car.id))
            setDisableStartBtn(false)
        }
    }

    return <div className="flex gap-2 h-[70px]">
        <div className="flex flex-col gap-2">
            <Button onClick={editCar} className={ButtonStyleEnum.EDIT_BUTTON} value={ButtonType.EDIT}/>
            <Button onClick={removeCarFromList}
                    className={ButtonStyleEnum.DELETE_BUTTON}
                    value={ButtonType.DELETE}/>
        </div>

        <div className="flex flex-col">
            <Button disabled={disableStartBtn} onClick={startRacing} className={ButtonStyleEnum.START_BUTTON}
                    value={ButtonType.START}/>
            <Button onClick={stopRacing} className={ButtonStyleEnum.FINISH_BUTTON} value={ButtonType.STOP}/>
        </div>
    </div>
}