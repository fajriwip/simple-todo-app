import { AddNewItem } from './AddNewItem'
import { Card } from './Card'
import { ColumnContainer, ColumnTitle } from './styles'

import { useAppState } from './state/AppStateContext'

import { addTask, moveList, moveTask, setDraggedItem } from './state/Action'
import { useRef } from 'react'
import { useItemDrag } from './utils/useItemDrag'
import { useDrop } from 'react-dnd'
import { throttle } from 'throttle-debounce-ts'
import { isHidden } from './utils/isHidden'

type ColumnProps = {
    title: string
    id: string
    isPreview?: boolean
}

export const Column = ({ title, id, isPreview }: ColumnProps) => {
    const { getTasksByListId, dispatch, draggedItem } = useAppState()

    const tasks = getTasksByListId(id)

    const addCardHandler = (text: string) => {
        dispatch(addTask(text, id))
    }

    const ref = useRef<HTMLDivElement>(null)

    const [, drop] = useDrop({
        accept: ['COLUMN', 'CARD'],
        hover: throttle(200, () => {
            if (!draggedItem) return
            if (draggedItem.type === 'COLUMN') {
                if (draggedItem.id === id) {
                    return
                }

                dispatch(moveList(draggedItem.id, id))
            } else {
                if (draggedItem.columnId !== id) return
                if (tasks.length) return
                dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id))
            }
            dispatch(setDraggedItem({ ...draggedItem, columnId: id }))
        })
    })

    const { drag } = useItemDrag({ type: 'COLUMN', id, text: title })

    drag(drop(ref))

    return (
        <ColumnContainer isPreview={isPreview} ref={ref} isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}>
            <ColumnTitle>{title}</ColumnTitle>
            {
                tasks.map(({ text }) =>
                    <Card
                        isPreview={isPreview}
                        columnId={id}
                        text={text}
                        key={id}
                        id={id}
                    />
                )
            }
            <AddNewItem text="+ Add another card" dark onAdd={addCardHandler} />
        </ColumnContainer>
    )
}
