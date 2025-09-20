import CarModal from "./car-race-panel/CarModal.tsx";
import CarPanel from "./car-race-panel/CarPanel.tsx";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store.ts";
import {useEffect, useState} from "react";
import {getCars} from "../../services/Service.ts";
import Modal from "../../UI/Modal.tsx";

export default function Garage() {
    const dispatch = useDispatch<AppDispatch>();
    const [carListRace, setCarListRace] = useState<HTMLDivElement[]>([])

    useEffect(() => {
        dispatch(getCars())
    }, [dispatch]);
    const carListForRacing = (carList: HTMLDivElement[]) => {
        if (carList.length){
            setCarListRace(carList);
        }

    }

    return <div>
        <CarModal carListRace={carListRace}/>
        <CarPanel racingPanel={carListForRacing}/>
        <Modal></Modal>
    </div>
}