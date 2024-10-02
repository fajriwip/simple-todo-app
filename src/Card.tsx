import { throttle } from "throttle-debounce-ts"
import { useAppState } from "./state/AppStateContext"
import { CardContainer } from "./styles"
import { isHidden } from "./utils/isHidden"
import { useItemDrag } from "./utils/useItemDrag"
import { moveTask, setDraggedItem } from "./state/Action"
import { useDrop } from "react-dnd"
import { useRef } from "react"

type CardProps = {
    text: string
    id: string
    columnId: string
    isPreview?: boolean
}

export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
    const { draggedItem, dispatch } = useAppState()
    const ref = useRef<HTMLDivElement>(null)
    const { drag } = useItemDrag({ type: "CARD", id, columnId, text })
    const [, drop] = useDrop(
        () => ({
            accept: "CARD",
            hover: throttle(200, () => {
                if (!draggedItem) return
                if (draggedItem.type !== "CARD") return
                if (draggedItem.id === id) return
                dispatch(
                    moveTask(draggedItem.id, id, draggedItem.columnId, columnId)
                )
                dispatch(setDraggedItem({ ...draggedItem, columnId }))
            })
        }),
        [draggedItem]
    )

    drag(drop(ref))
    return (
        <CardContainer
            isPreview={isPreview}
            isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
            ref={ref}
        >
            {text}
        </CardContainer>
    )
}
