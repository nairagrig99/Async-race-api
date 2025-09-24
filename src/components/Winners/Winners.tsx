import WinnersTable from "./WinnersTable.tsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {getWinners} from "../../services/WinnersService.ts";

export default function Winners() {
    const dispatch = useDispatch<AppDispatch>();
    const selector = useSelector((state:RootState)=>state.winnerSlice.winners);

    useEffect(() => {
        dispatch(getWinners())
    }, [dispatch])

    if (!selector.length) return <h3 className="text-[45px] text-center">No Winners</h3>

    return <div>
        <h2 className="text-[45px] mb-3">WINNERS</h2>
        <WinnersTable/>
    </div>
}