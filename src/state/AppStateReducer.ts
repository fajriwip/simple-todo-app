import { type Action } from "./Action"
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { DragItem } from "../DragItem";

export interface Task {
    id: string;
    text: string;
}

export interface List {
    id: string;
    title: string;
    tasks: Task[];
}

export interface AppState {
    lists: List[];
    draggedItem: DragItem | null
}

const id = Math.random().toString(36).slice(2);

export const appStateReducer = (
    draft: AppState,
    action: Action
): AppState | void => {
    switch (action.type) {
        case "ADD_LIST": {
            draft.lists.push({
                id: id,
                title: action.payload,
                tasks: []
            })
            break
        }
        case "ADD_TASK": {
            const { text, listId } = action.payload
            const targetListIndex = findItemIndexById(draft.lists, listId)
            draft.lists[targetListIndex].tasks.push({
                id: id,
                text: text
            })
            break
        }
        case 'MOVE_LIST': {
            const { draggedId, hoverId } = action.payload
            const dragIndex = findItemIndexById(draft.lists, draggedId)
            const hoverIndex = findItemIndexById(draft.lists, hoverId)
            draft.lists = moveItem(draft.lists, dragIndex, hoverIndex)
            break
        }
        case 'SET_DRAGGED_ITEM': {
            draft.draggedItem = action.payload
            break
        }
    }
}
