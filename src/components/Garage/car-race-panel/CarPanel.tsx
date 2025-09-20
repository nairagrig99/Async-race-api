import CarSvg from "../../../UI/CarSvg.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../../store/store.ts";
import CarControlEvents from "./CarControlEvents.tsx";
import {useEffect, useRef, useState} from "react";
import type {CarModelInterface} from "../../../interface/car-model.interface.ts";
import {Pagination} from "../../../enums/pagination.ts";
import PaginationPanel from "./PaginationPanel.tsx";
import {PAGE_LIMIT, PAGE_START} from "../../../enums/global-variables.ts";

type racingState = {
    racingPanel: (paginatedCar: HTMLDivElement[]) => void
}

export default function CarPanel({racingPanel}: racingState) {
    const carsRef = useRef<HTMLDivElement[]>([]);
    const getCarList = useSelector((state: RootState) => state.carSlice.car);
    const [carList, setCarList] = useState<CarModelInterface[]>([]);
    const [page, setPage] = useState<number>(PAGE_START);
    const garageLength: number = getCarList.length;

    const pagination = (direction: string) => {
        if (direction === Pagination.NEXT && page * PAGE_LIMIT < getCarList.length) {
            setPage(prevState => prevState + PAGE_START)
        } else if (direction === Pagination.PREV && page > PAGE_START) {
            setPage(prevState => prevState - PAGE_START);
        }
    }

    useEffect(() => {
        console.log('this effect work ')
        const start = (page - PAGE_START) * PAGE_LIMIT;
        const end = start + PAGE_LIMIT;
        const paginatedCarList = getCarList.slice(start, end)
        setCarList(paginatedCarList);
    }, [getCarList, page]);

    useEffect(() => {
        racingPanel(carsRef.current);
    }, [carList]);


    return <div className="border border-solid border-r-0">
        <div className="flex border border-solid  border-r-0 pl-2.5 relative">
            <div>
                {carList.length > 0 &&
                    carList.map((car) =>
                        <div key={car.id} className="w-fit">
                            <div className="flex gap-2 items-center ">
                                <CarControlEvents car={car}/>
                                <div
                                    key={car.id}
                                    ref={(element) => {
                                        if (car.id && element != null) {
                                            carsRef.current[car.id] = element as HTMLDivElement;
                                        }
                                    }} className="w-[70px] h-[70px]">
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
        <PaginationPanel garageLength={garageLength} page={page} pagination={pagination}/>
    </div>

}

