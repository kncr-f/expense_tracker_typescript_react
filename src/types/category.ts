import { ThunkDispatch } from "redux-thunk";

export interface CategoryState {
    data: Category[];
    loading: boolean;
    error: string;
}

export interface Category {
    id: number;
    name: string;
    type: string;
    color: string;
}

interface GET_CATEGORIES_START {
    type: "GET_CATEGORIES_START";
}

interface GET_CATEGORIES_SUCCESS {
    type: "GET_CATEGORIES_SUCCESS";
    payload: Category[];
}

interface GET_CATEGORIES_ERROR {
    type: "GET_CATEGORIES_ERROR";
}

export type CategoryAction =
    | GET_CATEGORIES_START
    | GET_CATEGORIES_SUCCESS
    | GET_CATEGORIES_ERROR;

export type CategoryDispatch = ThunkDispatch<
    CategoryState,
    void,
    CategoryAction
>;
