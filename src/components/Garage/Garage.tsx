import CarModal from "./car-race-panel/CarModal.tsx";
import CarPanel from "./car-race-panel/CarPanel.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {useEffect, useState} from "react";
import Modal from "../../UI/Modal.tsx";
import {getWinners} from "../../services/WinnersService.ts";
import WinnerModal from "../../UI/WinnerModal.tsx";

export default function Garage() {
    const dispatch = useDispatch<AppDispatch>();
    const [carListRace, setCarListRace] = useState<HTMLDivElement[]>([])
    const selector = useSelector((state: RootState) => state.carSlice.car);

    useEffect(() => {
        dispatch(getWinners())
    }, [dispatch]);
    const carListForRacing = (carList: HTMLDivElement[]) => {
        if (carList.length) {
            setCarListRace(carList);
        }
    }
    if (!selector.length) return <h3 className="text-[45px] text-center">No Cars</h3>

    return <div>
        <h3 className="text-[45px] mb-3">GARAGE</h3>
        <CarModal carListRace={carListRace}/>
        <CarPanel racingPanel={carListForRacing}/>
        <Modal></Modal>
        <WinnerModal></WinnerModal>
    </div>
}