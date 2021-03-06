import { RecordAction, RecordState } from "../../types/record";

const defaultState: RecordState = {
    data: [],
    loading: false,
    error: "",
};

const recordReducer = (
    state: RecordState = defaultState,
    action: RecordAction
): RecordState => {
    switch (action.type) {
        case "GET_RECORDS_START":
            return { ...state, loading: true, error: "" };
        case "GET_RECORDS_SUCCESS":
            return { ...state, loading: false, data: action.payload };
        case "GET_RECORDS_ERROR":
            return {
                ...state,
                loading: false,
                error: "Error getting records",
            };
        case "ADD_RECORD_START":
            return { ...state, loading: true, error: "" };
        case "ADD_RECORD_SUCCESS":
            return {
                ...state,
                loading: false,
                data: [action.payload, ...state.data],
            };
        case "ADD_RECORD_ERROR":
            return {
                ...state,
                loading: false,
                error: "Error adding record",
            };
        case "UPDATE_RECORD_START":
            return { ...state, loading: true, error: "" };
        case "UPDATE_RECORD_SUCCESS":
            return {
                ...state,
                loading: false,
                data: state.data.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case "UPDATE_RECORD_ERROR":
            return {
                ...state,
                loading: false,
                error: "Error updating record",
            };
        case "DELETE_RECORD_START":
            return { ...state, loading: true, error: "" };
        case "DELETE_RECORD_SUCCESS":
            return {
                ...state,
                loading: false,
                data: state.data.filter((item) => item.id !== action.payload),
            };
        case "DELETE_RECORD_ERROR":
            return {
                ...state,
                loading: false,
                error: "Error deleting record",
            };
        default:
            return state;
    }
};

export default recordReducer;
