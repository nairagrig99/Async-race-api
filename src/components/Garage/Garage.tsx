import CarModal from "./car-creation/CarModal.tsx";
import CarPanel from "./car-race-panel/CarPanel.tsx";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store.ts";
import {useEffect} from "react";
import {getCars} from "../../services/Service.ts";
import Modal from "../../UI/Modal.tsx";

export default function Garage() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCars())
    }, [dispatch]);

    return <div>
        <CarModal/>
        <CarPanel/>
        <Modal></Modal>
    </div>
}