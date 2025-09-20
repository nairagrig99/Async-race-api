import Button from "../../../UI/Button.tsx";
import {ButtonStyleEnum} from "../../../enums/style-enum.ts";
import {ButtonType} from "../../../enums/button-type.ts";
import {openCarModal} from "../../../store/ModalSlide.ts";
import type {CarModelInterface} from "../../../interface/car-model.interface.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../store/store.ts";
import {removeCar} from "../../../services/Service.ts";

export default function CarControlEvents({car}: { car: CarModelInterface }) {
    const dispatch = useDispatch<AppDispatch>()
    const editCar = () => {
        dispatch(openCarModal({mode: ButtonType.EDIT, car: car}))
    }
    const removeCarFromList = () => {
        if (car.id != undefined) {
            dispatch(removeCar({id: car.id}))
        }
    }

    return <div className="flex gap-2">
        <div className="flex flex-col gap-2">
            <Button onClick={editCar} className={ButtonStyleEnum.EDIT_BUTTON} value={ButtonType.EDIT}/>
            <Button onClick={removeCarFromList}
                    className={ButtonStyleEnum.DELETE_BUTTON}
                    value={ButtonType.DELETE}/>
        </div>

        <div>
            <Button className={ButtonStyleEnum.START_BUTTON} value={ButtonType.START}/>
            <Button className={ButtonStyleEnum.FINISH_BUTTON} value={ButtonType.STOP}/>
        </div>
    </div>
}