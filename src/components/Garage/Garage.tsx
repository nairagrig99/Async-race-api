import CarModal from "./car-race-panel/CarModal.tsx";
import CarPanel from "./car-race-panel/CarPanel.tsx";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store.ts";
import {useEffect, useState} from "react";
import Modal from "../../UI/Modal.tsx";
import {getWinners} from "../../services/WinnersService.ts";
import WinnerModal from "../../UI/WinnerModal.tsx";

export default function Garage() {
    const dispatch = useDispatch<AppDispatch>();
    const [carListRace, setCarListRace] = useState<HTMLDivElement[]>([])

    useEffect(() => {
        dispatch(getWinners())
    }, [dispatch]);
    const carListForRacing = (carList: HTMLDivElement[]) => {
        if (carList.length) {
            setCarListRace(carList);
        }
    }

    return <div>
        <h3 className="text-[45px] mb-3">GARAGE</h3>
        <CarModal carListRace={carListRace}/>
        <CarPanel racingPanel={carListForRacing}/>
        <Modal></Modal>
        <WinnerModal></WinnerModal>
    </div>
}