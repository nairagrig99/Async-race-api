import Button from "../../../UI/Button.tsx";
import {useDispatch} from "react-redux";
import {openCarModal} from "../../../store/ModalSlide.ts";
import type {AppDispatch} from "../../../store/store.ts";
import {ButtonStyleEnum} from "../../../enums/style-enum.ts";
import {ButtonType} from "../../../enums/button-type.ts";
import {CAR_LIST} from "../../../enums/global-variables.ts";
import {createCar} from "../../../services/Service.ts";

type racingState = {
    carListRace: HTMLDivElement[]
}
export default function CarModal({carListRace}: racingState) {

    const dispatch = useDispatch<AppDispatch>();

    const createRandomCars = () => {
        const carList = [];
        for (let i = 0; i < 100; i++) {
            const randomIndex = Math.floor(Math.random() * CAR_LIST.length - 1) + 1;
            carList.push(CAR_LIST[randomIndex]);
        }
        carList.forEach(car => {
            dispatch(createCar({form: car}));
        });
    }

    const startRacing = () => {
        carListRace.forEach((el: HTMLElement) => {
            if (el != null) {
                const minDuration = 2;
                const maxDuration = 10;
                const randomDuration = Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
                (el.querySelector(".race-car") as HTMLElement).style.animation = `moveRight ${randomDuration}s linear forwards`;
            }

        })
    }
    const resetRacing = () => {
        carListRace.forEach((el: HTMLElement) => {
            (el.querySelector(".race-car") as HTMLElement).style.animation = `none`;
        })
    }

    return <div className="border-b border-solid pb-[30px] flex justify-between">
        <div className="flex gap-2.5">
            <Button className={ButtonStyleEnum.CREATE_BUTTON}
                    onClick={startRacing}
                    value={ButtonType.RACE}/>

            <Button className={ButtonStyleEnum.CREATE_BUTTON}
                    onClick={() => resetRacing()}
                    value={ButtonType.RESET}/>
        </div>

        <Button className={ButtonStyleEnum.CREATE_BUTTON}
                onClick={() => dispatch(openCarModal({mode: ButtonType.CREATE, car: undefined}))}
                value={ButtonType.CREATE}/>

        <Button className={ButtonStyleEnum.CREATE_BUTTON}
                onClick={() => createRandomCars()}
                value={ButtonType.PAGINATE}/>

    </div>
}