import {Pagination} from "../enums/pagination.ts";

export type PaginationState = {
    garageLength: number,
    page: number,
    paginationName: string,
    pagination: (direction: Pagination) => void;
}