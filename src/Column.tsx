import { AddNewItem } from './AddNewItem'
import { Card } from './Card'
import { ColumnContainer, ColumnTitle } from './styles'

import { useAppState } from './state/AppStateContext'

import { addTask, moveList } from './state/Action'
import { useRef } from 'react'
import { useItemDrag } from './utils/useItemDrag'
import { useDrop } from 'react-dnd'
import { throttle } from 'throttle-debounce-ts'

type ColumnProps = {
    title: string
    id: string
}

export const Column = ({ title, id }: ColumnProps) => {
    const { getTasksByListId, dispatch, draggedItem } = useAppState()

    const tasks = getTasksByListId(id)

    const addCardHandler = (text: string) => {
        dispatch(addTask(text, id))
    }

    const ref = useRef<HTMLDivElement>(null)

    const [, drop] = useDrop({
        accept: 'COLUMN',
        hover: throttle(200, () => {
            if (!draggedItem) return
            if (draggedItem.type === 'COLUMN') {
                if (draggedItem.id === id) {
                    return
                }

                dispatch(moveList(draggedItem.id, id))
            }
        })
    })

    const { drag } = useItemDrag({ type: 'COLUMN', id })

    drag(drop(ref))

    return (
        <ColumnContainer ref={ref}>
            <ColumnTitle>{title}</ColumnTitle>
            {
                tasks.map(({ text, id }) => <Card text={text} key={id} id={id} />)
            }
            <AddNewItem text="+ Add another card" dark onAdd={addCardHandler} />
        </ColumnContainer>
    )
}
