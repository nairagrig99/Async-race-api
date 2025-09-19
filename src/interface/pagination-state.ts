import {Pagination} from "../enums/pagination.ts";

export type PaginationState = {
    garageLength: number,
    page: number,
    pagination: (direction: Pagination) => void;
}