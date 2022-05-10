import { types } from "../types/types";

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
});

export const removeError = () => ({
    type: types.uiRemoveError
});

export const startLoading = () => ({
    type: types.uiStartLoading
});

export const finishLoading = () => ({
    type: types.uiFinishLoading
});

export const startPercentUpload = (percent) => ({
    type: types.uiStartPercentUpload,
    payload: percent
});

export const finishPercentUpload = () => ({
    type: types.uiFinishPercentUpload
});
