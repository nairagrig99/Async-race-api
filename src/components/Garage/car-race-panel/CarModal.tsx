import Button from "../../../UI/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {openCarModal} from "../../../store/ModalSlide.ts";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {ButtonStyleEnum} from "../../../enums/style-enum.ts";
import {ButtonType} from "../../../enums/button-type.ts";
import {
    CAR_LIST,
    MAX_TIME_HIDDEN,
    PAGE_END,
    PAGE_START,
    START
} from "../../../enums/global-variables.ts";
import {createCar} from "../../../services/GarageService.ts";
import type {racingState} from "../../../interface/racing-state.ts";
import {useEffect, useRef} from "react";
import type {WinnerModel} from "../../../interface/winner-interface.ts";
import {setWinners, updateWinners} from "../../../services/WinnersService.ts";
import {hideWinnerModal, showWinnerModal} from "../../../store/WinnerModal.ts";
import {ServerEnum} from "../../../enums/request-url.enum.ts";
import {EngineService} from "../../../services/EngineService.ts";
import {ErrorMessageEnum} from "../../../enums/error-message.enum.ts";

export default function CarModal({carListRace}: racingState) {

    const dispatch = useDispatch<AppDispatch>();
    const selector = useSelector((state: RootState) => state.carRaceStartSlice);
    const winners = useSelector((state: RootState) => state.winnerSlice.winners);
    const carList = useSelector((state: RootState) => state.carSlice.car);
    const raceBtnDisabled: boolean = true;

    const timeOutRef = useRef<Set<number>>(new Set());
    let firstIsWinner = 1;

    useEffect(() => {
        const carElement = carListRace.find(element =>
            element && element.dataset.id === selector.id.toString()
        );

        if (carElement) {
            if (selector.mode === ButtonType.START) {
                const elementIndex = carListRace.indexOf(carElement);
                startRace(carElement, elementIndex + 1);
            } else {
                removeAllTimeouts();
                stopRacing(carElement);
            }
        }
    }, [selector.id, selector.mode]);

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

    const racingMode = (mode: string) => {
        if (mode === ButtonType.RACE) {
            carListRace.forEach((el: HTMLElement) => {
                    const id = Number(el.dataset.id);
                    startRace(el, id)
                }
            );
        } else {
            removeAllTimeouts()
            carListRace.forEach((el: HTMLElement) => {
                stopRacing(el);
            });
        }
    }

    const removeAllTimeouts = () => {
        timeOutRef.current.forEach((timeout) => {
            clearTimeout(timeout);
        })
        timeOutRef.current.clear()
    }

    const startRace = (el: HTMLElement, id: number) => {
        fetch(`${ServerEnum.URL}/engine?id=${id}&status=started`, {method: "PATCH"})
            .then(async (res) => {
                if (!res.ok) throw new Error(ErrorMessageEnum.FAILED_ENGINE);
                return res.json();
            })
            .then((startedData) => {
                const velocityTime = Math.round(startedData.distance / startedData.velocity);
                const durationSeconds = velocityTime / 1000;
                return {durationSeconds}
            }).then(({durationSeconds}) => {
            let isWinnerBroken = true;
            fetch(`${ServerEnum.URL}/engine?id=${id}&status=drive`, {method: "PATCH"})
                .then((driveRes) => {
                    if (!driveRes.ok && driveRes.status === 500) {
                        isWinnerBroken = false;
                        stopRacingOnTheWay(el);
                        dispatch(EngineService(id))
                    }
                });
            return {durationSeconds, isWinnerBroken}
        }).then(({durationSeconds, isWinnerBroken}) => {
            const carElement = el.querySelector(".race-car") as HTMLElement;

            carElement.style.position = "absolute";
            carElement.style.animation = `moveRight ${durationSeconds}s linear forwards`;
            const handleAnimationEnd = () => {
                carElement.removeEventListener("animationend", handleAnimationEnd);
                if (firstIsWinner === 1 && isWinnerBroken) {
                    handleWinnerFetch({
                        id: id,
                        time: durationSeconds,
                        wins: 1,
                    });
                } else {
                    dispatch(EngineService(id))
                }
                firstIsWinner++;
            };
            carElement.addEventListener("animationend", handleAnimationEnd);
        })
    };

    const stopRacingOnTheWay = (el: HTMLElement) => {
        if (el) {
            (el.querySelector(".race-car") as HTMLElement).style.animationPlayState = 'paused';
        }
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
            })
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

        const timeout = setTimeout(() => {
            dispatch(hideWinnerModal())
        }, MAX_TIME_HIDDEN)

        timeOutRef.current.add(timeout)
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

            <Button className={ButtonStyleEnum.CANCEL_BUTTON}
                    onClick={() => racingMode(ButtonType.RESET)}
                    value={ButtonType.RESET}/>
        </div>

        <Button className={ButtonStyleEnum.CREATE_BUTTON}
                onClick={() => dispatch(openCarModal({mode: ButtonType.CREATE, car: undefined}))}
                value={ButtonType.CREATE}/>


        <Button className={ButtonStyleEnum.GENERATE_BUTTON}
                onClick={() => createRandomCars()}
                value={ButtonType.GENERATE_CARS}/>

    </div>
}