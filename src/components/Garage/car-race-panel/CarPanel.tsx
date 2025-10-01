import CarSvg from "../../../UI/CarSvg.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import CarControlEvents from "./CarControlEvents.tsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {Pagination} from "../../../enums/pagination.ts";
import PaginationPanel from "./PaginationPanel.tsx";
import {PAGE_LIMIT, PAGE_START} from "../../../enums/global-variables.ts";
import {resetEngineState} from "../../../store/EngineState.ts";
import {pageState} from "../../../store/PageState.ts";

type racingState = {
    racingPanel: (paginatedCar: HTMLDivElement[]) => void
}
export default function CarPanel({racingPanel}: racingState) {
    const carsRef = useRef<HTMLDivElement[]>([]);
    const getCarList = useSelector((state: RootState) => state.carSlice.car);
    const savedPage = useSelector((state: RootState) => state.pageStateSlice.page);
    const [page, setPage] = useState<number>(savedPage || PAGE_START);
    const garageLength: number = getCarList.length;
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(resetEngineState())
        dispatch(pageState(page));
    }, [page,dispatch]);

    const pagination = (direction: string) => {
        if (direction === Pagination.NEXT && page * PAGE_LIMIT < getCarList.length) {
            setPage(prevState => prevState + PAGE_START)
        } else if (direction === Pagination.PREV && page > PAGE_START) {
            setPage(prevState => prevState - PAGE_START);
        }
    }

    const carList = useMemo(() => {
        const start = (page - PAGE_START) * PAGE_LIMIT;
        const end = start + PAGE_LIMIT;

        if (end > garageLength) {
            return getCarList.slice(start, garageLength);
        } else {
            return getCarList.slice(start, end);
        }

    }, [getCarList, page]);

    useEffect(() => {
        racingPanel(carsRef.current);
    }, [carList]);

    return <div className="border border-solid border-r-0">
        <div className="flex border border-solid  border-r-0 pl-2.5 relative pt-2.5">
            <div>
                {carList.length > 0 &&
                    carList.map((car) =>
                        <div key={car.id} className="w-[200px]">
                            <div className="flex gap-2 items-center ">
                                <CarControlEvents car={car}/>
                                <div
                                    key={car.id}
                                    data-id={car.id}
                                    ref={(element) => {
                                        if (element != null) {
                                            const index = carList.findIndex(c => c.id === car.id);
                                            if (index !== -1) {
                                                carsRef.current[index] = element as HTMLDivElement;
                                            }
                                        }
                                    }}

                                    className="w-[70px] h-[70px]">
                                    <CarSvg color={car.color}/>
                                </div>

                            </div>
                        </div>
                    )
                }
            </div>
            <div className="line-start w-[30px] flex items-center border-r border-l border-solid">
                <h2 className="text-[30px] [writing-mode:sideways-rl] m-[-8px]">START</h2>
            </div>

            <div className="w-full">
                {carList.length > 0 &&
                    carList.map((car) =>
                        <div key={car.id}
                             className=" flex items-center pl-5 text-[24px] uppercase text-[#c0c0b8] line-street h-[70px] border-b border-solid w-full">
                            {car.name}
                        </div>
                    )
                }
            </div>

            <div className="line-start w-[30px] flex items-center border-r border-l border-solid">
                <h2 className="text-[30px] [writing-mode:sideways-rl] m-[-8px]">FINISH</h2>
            </div>
            <div className="w-[40px]">
                {carList.length > 0 &&
                    carList.map((car) =>
                        <div key={car.id}
                             className="flex  line-street h-[70px] border-b border-solid w-full">
                        </div>
                    )
                }
            </div>
        </div>
        <PaginationPanel garageLength={garageLength} page={page} pagination={pagination} paginationName='Garage'/>
    </div>

}

