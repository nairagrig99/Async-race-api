import PrevSvg from "../../../UI/PrevSvg.tsx";
import {Pagination} from "../../../enums/pagination.ts";
import NextSvg from "../../../UI/NextSvg.tsx";
import type {PaginationState} from "../../../interface/pagination-state.ts";

export default function PaginationPanel({garageLength, page, pagination}: PaginationState) {
    return <div className="flex justify-between mt-5">
        <div>
            <b>GARAGE ({garageLength})</b>
        </div>
        <div className="flex gap-2.5">
            <PrevSvg onClick={() => pagination(Pagination.PREV)}/>
            <b>page #{page}</b>
            <NextSvg onClick={() => pagination(Pagination.NEXT)}/>
        </div>

    </div>
}