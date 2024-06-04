import { type Dispatch, createContext, useContext } from "react";
import { type AppState, type List, type Task, appStateReducer } from "./AppStateReducer";
import { useImmerReducer } from "use-immer";
import { type Action } from "./Action";
import { DragItem } from "../DragItem";

interface AppStateContextProps {
    lists: List[]
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
    draggedItem: DragItem | null
}

const appData: AppState = {
    draggedItem: null,
    lists: [
        {
            id: "0",
            title: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            title: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            title: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        }
    ]
}

export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const useAppState = () => {
    return useContext(AppStateContext);
}

export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, appData);
    const { lists, draggedItem } = state;

    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || [];
    }

    return <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch, draggedItem }}>{children}</AppStateContext.Provider>;
}