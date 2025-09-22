import Button from "../../../UI/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {openCarModal} from "../../../store/ModalSlide.ts";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {ButtonStyleEnum} from "../../../enums/style-enum.ts";
import {ButtonType} from "../../../enums/button-type.ts";
import {CAR_LIST, MAX_DURATION, MIN_DURATION, PAGE_END, PAGE_START, START} from "../../../enums/global-variables.ts";
import {createCar} from "../../../services/GarageService.ts";
import type {racingState} from "../../../interface/racing-state.ts";
import {useEffect} from "react";
import type {WinnerModel} from "../../../interface/winner-interface.ts";
import {setWinners, updateWinners} from "../../../services/WinnersService.ts";
import {hideWinnerModal, showWinnerModal} from "../../../store/WinnerModal.ts";

export default function CarModal({carListRace}: racingState) {

    const dispatch = useDispatch<AppDispatch>();
    const selector = useSelector((state: RootState) => state.carRaceStartSlice);
    const winners = useSelector((state: RootState) => state.winnerSlice.winners);
    const carList = useSelector((state: RootState) => state.carSlice.car);

    useEffect(() => {
        if (selector.mode === ButtonType.START) {
            uniqueCarRacing(carListRace[selector.id], selector.id)
        } else {
            stopRacing(carListRace[selector.id])
        }
    }, [selector.id, selector.mode]);

    const createRandomCars = () => {
        const carList = [];
        for (let i = START; i < PAGE_END; i++) {
            const randomIndex = +(Math.floor(Math.random() * CAR_LIST.length - PAGE_START) + PAGE_START).toFixed(2);
            carList.push(CAR_LIST[randomIndex]);
        }

        carList.forEach(car => {
            dispatch(createCar({form: car}));
        });
    }

    const racingMode = (mode: string) => {
        if (mode === ButtonType.RACE) {

            const racePromises = carListRace.map((el: HTMLElement, index) =>
                startRace(el, index)
            );

            Promise.all(racePromises).then((results) => {
                const validResults = results.filter(result => result !== null);
                if (validResults.length > 0) {
                    const winner = validResults.sort((a, b) => a.time - b.time)[0];
                    handleWinnerFetch(winner);
                }
            });
        } else {
            carListRace.forEach((el: HTMLElement) => {
                stopRacing(el);
            });
        }
    }

    const startRace = (el: HTMLElement, index: number): Promise<WinnerModel | null> => {
        return new Promise((resolve) => {
            const randomDuration = +(Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION);
            if (el) {
                const carElement = el.querySelector(".race-car") as HTMLElement;
                if (carElement) {
                    carElement.style.position = "absolute";
                    carElement.style.animation = `moveRight ${randomDuration}s linear forwards`;
                    const handleAnimationEnd = () => {
                        carElement.removeEventListener('animationend', handleAnimationEnd);
                        resolve({
                            id: index,
                            time: randomDuration,
                            wins: 1
                        });
                    };

                    carElement.addEventListener('animationend', handleAnimationEnd);

                    setTimeout(() => {
                        carElement.removeEventListener('animationend', handleAnimationEnd);
                        resolve({
                            id: index,
                            time: randomDuration,
                            wins: 1
                        });
                    }, randomDuration * 1000 + 100);
                }
            } else {
                resolve(null);
            }
        });
    }

    const uniqueCarRacing = (el: HTMLElement, index: number) => {
        const randomDuration = +(Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION);

        if (el) {
            (el.querySelector(".race-car") as HTMLElement).style.position = "absolute";
            (el.querySelector(".race-car") as HTMLElement).style.animation = `moveRight ${randomDuration}s linear forwards`;
        }
        const raceResult: WinnerModel = {
            id: index,
            time: randomDuration,
            wins: 1
        }

        setTimeout(() => {
            if (randomDuration) {
                handleWinnerFetch(raceResult)
            }
        }, randomDuration * 1000)
    }

    const handleWinnerFetch = (winner: WinnerModel) => {

        const existingWinner = winners.find(winnerCar => winnerCar.id === winner.id);

        if (existingWinner) {
            dispatch(updateWinners({
                ...existingWinner,
                wins: existingWinner.wins + 1,
                time: winner.time
            })).then((response) => {
                openWinnerPopup(response.payload)
            });
        } else {
            dispatch(setWinners({
                id: winner.id,
                wins: winner.wins,
                time: winner.time
            })).then((response) => {
                openWinnerPopup(response.payload)
            });
        }
    }
    const openWinnerPopup = (winnerCar: WinnerModel) => {
        const findWinner = carList.find((car) => car.id === winnerCar.id);
        if (findWinner) {
            const winner = {
                ...winnerCar,
                name: findWinner.name
            }
            dispatch(showWinnerModal(winner))
        }

        setTimeout(() => {
            dispatch(hideWinnerModal())
        }, 5000)

    }
    const stopRacing = (el: HTMLElement) => {
        if (el) {
            const carElement = el.querySelector(".race-car") as HTMLElement;
            if (carElement) {
                carElement.style.position = "relative";
                carElement.style.animation = `none`;
            }
        }
    }

    return <div className="border-b border-solid pb-[30px] flex justify-between">
        <div className="flex gap-2.5">
            <Button className={ButtonStyleEnum.CREATE_BUTTON}
                    onClick={() => racingMode(ButtonType.RACE)}
                    value={ButtonType.RACE}/>

            <Button className={ButtonStyleEnum.CREATE_BUTTON}
                    onClick={() => racingMode(ButtonType.RESET)}
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