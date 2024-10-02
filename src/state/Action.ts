import { DragItem } from "../DragItem"


// task actions

interface addTaskAction {
    type: 'ADD_TASK'
    payload: {
        text: string,
        listId: string
    }
}

interface moveTaskAction {
    type: 'MOVE_TASK',
    payload: {
        draggedItemId: string
        hoveredItemId: string | null
        sourceColumnId: string
        targetColumnId: string
    }
}

export const addTask = (text: string, listId: string): Action => ({
    type: "ADD_TASK",
    payload: {
        listId,
        text
    }
})

export const moveTask = (
    draggedItemId: string, hoveredItemId: string | null, sourceColumnId: string, targetColumnId: string
): Action => ({
    type: 'MOVE_TASK',
    payload: {
        draggedItemId,
        hoveredItemId,
        sourceColumnId,
        targetColumnId
    }
})

// list actions

interface addListAction {
    type: "ADD_LIST"
    payload: string
}

interface moveListAction {
    type: 'MOVE_LIST'
    payload: {
        draggedId: string
        hoverId: string
    }
}
export const addList = (text: string): Action => ({
    type: "ADD_LIST",
    payload: text
})

export const moveList = (draggedId: string, hoverId: string): Action => ({
    type: 'MOVE_LIST',
    payload: {
        draggedId,
        hoverId
    }
})

interface draggedItemAction {
    type: 'SET_DRAGGED_ITEM'
    payload: DragItem | null
}

export const setDraggedItem = (draggedItem: DragItem | null): Action => ({
    type: 'SET_DRAGGED_ITEM',
    payload: draggedItem
})

export type Action = addListAction | addTaskAction | moveListAction | draggedItemAction | moveTaskAction