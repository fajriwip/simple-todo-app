import { DragItem } from "../DragItem"

interface addTaskAction {
    type: 'ADD_TASK'
    payload: {
        text: string,
        listId: string
    }
}

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

interface draggedItemAction {
    type: 'SET_DRAGGED_ITEM'
    payload: DragItem | null
}

export type Action = addListAction | addTaskAction | moveListAction | draggedItemAction

export const addList = (text: string): Action => ({
    type: "ADD_LIST",
    payload: text
})

export const addTask = (text: string, listId: string): Action => ({
    type: "ADD_TASK",
    payload: {
        listId,
        text
    }
})

export const moveList = (draggedId: string, hoverId: string): Action => ({
    type: 'MOVE_LIST',
    payload: {
        draggedId,
        hoverId
    }
})

export const setDraggedItem = (draggedItem: DragItem | null): Action => ({
    type: 'SET_DRAGGED_ITEM',
    payload: draggedItem
})