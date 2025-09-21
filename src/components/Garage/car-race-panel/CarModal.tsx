import Button from "../../../UI/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {openCarModal} from "../../../store/ModalSlide.ts";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {ButtonStyleEnum} from "../../../enums/style-enum.ts";
import {ButtonType} from "../../../enums/button-type.ts";
import {CAR_LIST, MAX_DURATION, MIN_DURATION, PAGE_END, PAGE_START, START} from "../../../enums/global-variables.ts";
import {createCar} from "../../../services/Service.ts";
import type {racingState} from "../../../interface/racing-state.ts";
import {useEffect} from "react";

export default function CarModal({carListRace}: racingState) {

    const dispatch = useDispatch<AppDispatch>();
    const selector = useSelector((state: RootState) => state.carRaceStartSlice);

    useEffect(() => {
        if (selector.mode === ButtonType.START) {
            racing(carListRace[selector.id])
        } else {
            stopRacing(carListRace[selector.id])
        }
    }, [selector.id,selector.mode,carListRace]);

    const createRandomCars = () => {
        const carList = [];
        for (let i = START; i < PAGE_END; i++) {
            const randomIndex = Math.floor(Math.random() * CAR_LIST.length - PAGE_START) + PAGE_START;
            carList.push(CAR_LIST[randomIndex]);
        }

        carList.forEach(car => {
            dispatch(createCar({form: car}));
        });
    }

    const startRacing = () => {
        carListRace.forEach((el: HTMLElement) => {
            racing(el)
        })
    }
    const resetRacing = () => {
        carListRace.forEach((el: HTMLElement) => {
            stopRacing(el)
        })
    }

    const racing = (el: HTMLElement) => {
        if (el){
            const randomDuration = Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION + 1)) + MIN_DURATION;
            (el.querySelector(".race-car") as HTMLElement).style.position = "absolute";
            (el.querySelector(".race-car") as HTMLElement).style.animation = `moveRight ${randomDuration}s linear forwards`;
        }

    }
    const stopRacing = (el: HTMLElement) => {
        if(el){
            (el.querySelector(".race-car") as HTMLElement).style.position = "relative";
            (el.querySelector(".race-car") as HTMLElement).style.animation = `none`;
        }
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