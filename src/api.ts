import { AppState } from "./state/AppStateReducer";

export const save = (payload: AppState) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_ENDPOINT}/save`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Something went wrong");
        }
    })
}

export const load = () => {
    return fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_ENDPOINT}/load`).then(res => {
        if (res.ok) {
            return res.json() as Promise<AppState>;
        } else {
            throw new Error("Something went wrong");
        }
    })
}