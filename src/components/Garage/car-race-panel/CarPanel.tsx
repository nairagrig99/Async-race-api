import CarSvg from "../../../UI/CarSvg.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../../store/store.ts";
import CarControlEvents from "./CarControlEvents.tsx";
import {useEffect, useState} from "react";
import type {CarModelInterface} from "../../../interface/car-model.interface.ts";
import {Pagination} from "../../../enums/pagination.ts";
import PaginationPanel from "./PaginationPanel.tsx";


export default function CarPanel() {

    const getCarList = useSelector((state: RootState) => state.carSlice.car);

    const [carList, setCarList] = useState<CarModelInterface[]>([]);
    const [page, setPage] = useState<number>(1);

    const numOfPerPage: number = 7;
    const garageLength: number = getCarList.length;

    const pagination = (direction: string) => {
        if (direction === Pagination.NEXT && page * numOfPerPage < getCarList.length) {
            setPage(prevState => prevState + 1)
        } else if (direction === Pagination.PREV && page > 1) {
            setPage(prevState => prevState - 1);
        }
    }

    useEffect(() => {
        const start = (page - 1) * numOfPerPage;
        const end = start + numOfPerPage;
        setCarList(getCarList.slice(start, end));
    }, [getCarList, page])

    return <div className="border border-solid">
        <div className="flex border border-solid pl-2.5">
            <div>
                {carList.length > 0 &&
                    carList.map((car) =>
                        <div key={car?.id} className="w-fit">
                            <div className="flex gap-2 items-center">
                                <CarControlEvents car={car}/>
                                <CarSvg color={car?.color}/>
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
                        <div key={car?.id}
                             className=" flex items-center pl-5 text-[24px] uppercase text-[#c0c0b8] line-street h-[100px] border-b border-solid w-full">
                            {car?.name}
                        </div>
                    )
                }
            </div>
            <div className="line-start w-[30px] flex items-center border-r border-l border-solid">
                <h2 className="text-[30px] [writing-mode:sideways-rl] m-[-8px]">FINISH</h2>
            </div>
        </div>

        <PaginationPanel garageLength={garageLength} page={page} pagination={pagination}/>
    </div>

}

