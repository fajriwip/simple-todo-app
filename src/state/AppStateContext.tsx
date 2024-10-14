import { type Dispatch, createContext, useContext, useEffect } from "react";
import { type AppState, type List, type Task, appStateReducer } from "./AppStateReducer";
import { useImmerReducer } from "use-immer";
import { type Action } from "./Action";
import { DragItem } from "../DragItem";
import { save } from "../api";
import { withInitialState } from "../withInitialState";

interface AppStateContextProps {
    lists: List[]
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
    draggedItem: DragItem | null
}

type AppStateProviderProps = {
    children: React.ReactNode
    initialState: AppState
}

export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const useAppState = () => {
    return useContext(AppStateContext);
}

export const AppStateProvider = withInitialState<AppStateProviderProps>(({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);
    const { lists, draggedItem } = state;

    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || [];
    }

    useEffect(() => {
        save(state)
    }, [state])

    return (
        <AppStateContext.Provider
            value={{ lists, getTasksByListId, dispatch, draggedItem }}
        >
            {children}
        </AppStateContext.Provider>
    )
})