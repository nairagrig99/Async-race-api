import WinnersTable from "./WinnersTable.tsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store/store.ts";
import {getWinners} from "../../services/WinnersService.ts";

export default function Winners() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getWinners())
    }, [dispatch])

    return <div>
        <h2>WINNERS</h2>
        <WinnersTable/>
    </div>
}