import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import {useEffect, useState} from "react";
import CarSvg from "../../UI/CarSvg.tsx";
import type {CarModelInterface} from "../../interface/car-model.interface.ts";
import type {WinnerModel} from "../../interface/winner-interface.ts";
import {TABLE_TD, TABLE_TH, PAGE_LIMIT, PAGE_START} from "../../enums/global-variables.ts";
import {Pagination} from "../../enums/pagination.ts";
import PaginationPanel from "../Garage/car-race-panel/PaginationPanel.tsx";
import {SortEnum} from "../../enums/sort-enum.ts";

type WinnerWithCar = WinnerModel & CarModelInterface;

export default function WinnersTable() {
    const selectWinners = useSelector((state: RootState) => state.winnerSlice.winners);
    const carList = useSelector((state: RootState) => state.carSlice.car);

    const [winners, setWinners] = useState<WinnerWithCar[]>([]);
    const [paginatedWinners, setPaginatedWinners] = useState<WinnerWithCar[]>([]);
    const [page, setPage] = useState<number>(PAGE_START);

    useEffect(() => {
        if (carList.length && selectWinners.length) {
            const updateWinnersList = selectWinners.map((el) => {
                const findWinner = carList.find((carEl) => carEl.id === el.id)

                return {
                    ...el,
                    color: findWinner?.color,
                    name: findWinner?.name
                }

            });
            setWinners(updateWinnersList);

        }
    }, [selectWinners, carList]);

    useEffect(() => {
        const start = (page - PAGE_START) * PAGE_LIMIT;
        const end = start + PAGE_LIMIT;
        const paginated = winners.slice(start, end);
        setPaginatedWinners(paginated);
    }, [winners, page]);

    const handlePagination = (direction: string) => {
        if (direction === Pagination.NEXT && page * PAGE_LIMIT < winners.length) {
            setPage(prevState => prevState + PAGE_START);
        } else if (direction === Pagination.PREV && page > PAGE_START) {
            setPage(prevState => prevState - PAGE_START);
        }
    };

    const winnersLength = winners.length;
    const SortBy = (mode: string) => {
        if (mode === SortEnum.TIME) {
            setPaginatedWinners((prev) => {
                return [...prev].sort((a, b) => a.time - b.time);
            })
        } else {
            setPaginatedWinners((prev) => {
                return [...prev].sort((a, b) => a.wins - b.wins);
            })
        }
    }
    return (
        <div>
            <table
                className="min-w-full border border-gray-300 rounded-lg overflow-hidden border border-black border-collapse">
                <thead className="bg-gray-100">
                <tr>
                    <th className={TABLE_TH}>ID</th>
                    <th className={TABLE_TH}>Car</th>
                    <th className={TABLE_TH}>Name</th>
                    <th onClick={() => SortBy(SortEnum.TIME)} className={TABLE_TH}>
                        Time (s)
                        <span className="ml-4">⇅</span>
                    </th>
                    <th onClick={() => SortBy(SortEnum.WINE)} className={TABLE_TH}>
                        Wins
                        <span className="ml-4">⇅</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {paginatedWinners.map((winner) => (
                    <tr key={winner.id} className="hover:bg-gray-50">
                        <td className={TABLE_TD}>{winner.id}</td>
                        <td className={TABLE_TD}>
                            <CarSvg color={winner.color}></CarSvg>
                        </td>
                        <td className={TABLE_TD}>{winner.name}</td>
                        <td className={TABLE_TD}>{winner.time.toFixed(2)}</td>
                        <td className={TABLE_TD}>{winner.wins}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {winners.length > PAGE_LIMIT && (
                <PaginationPanel garageLength={winnersLength} page={page} pagination={handlePagination}
                                 paginationName='Winners'/>
            )}
        </div>
    );
}