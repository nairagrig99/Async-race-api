import Button from "../../../UI/Button.tsx";
import {useDispatch} from "react-redux";
import {openCarModal} from "../../../store/ModalSlide.ts";
import type {AppDispatch} from "../../../store/store.ts";
import {ButtonStyleEnum} from "../../../enums/style-enum.ts";
import {ButtonType} from "../../../enums/button-type.ts";
import {CAR_LIST} from "../../../enums/global-variables.ts";
import {createCar} from "../../../services/Service.ts";

export default function CarModal() {

    const dispatch = useDispatch<AppDispatch>();

    function createRandomCars() {
        const carList = [];
        for (let i = 0; i < 100; i++) {
            const randomIndex = Math.floor(Math.random() * CAR_LIST.length - 1) + 1;
            carList.push(CAR_LIST[randomIndex]);
        }
        carList.forEach(car => {
            dispatch(createCar({form: car}));
        });
    }

    return <div className="border-b border-solid pb-[30px] flex justify-between">
        <Button className={ButtonStyleEnum.CREATE_BUTTON}
                onClick={() => dispatch(openCarModal({mode: ButtonType.CREATE, car: undefined}))}
                value={ButtonType.CREATE}/>

        <Button className={ButtonStyleEnum.CREATE_BUTTON}
                onClick={() => createRandomCars()}
                value={ButtonType.PAGINATE}/>

    </div>
}