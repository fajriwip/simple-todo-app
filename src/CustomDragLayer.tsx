import { useDragLayer } from "react-dnd"
import { useAppState } from "./state/AppStateContext"
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles"
import { Column } from "./Column"
import { Card } from "./Card"

export const CustomDragLayer = () => {
    const { draggedItem } = useAppState()
    const { currentOffset } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset()
    }))

    return draggedItem && currentOffset ? (
        <CustomDragLayerContainer>
            <DragPreviewWrapper position={currentOffset}>
                {draggedItem.type === "COLUMN" ? (
                    <Column id={draggedItem.id} title={draggedItem.text} isPreview />
                ) : (
                    <Card isPreview columnId={draggedItem.columnId} text={draggedItem.text} id={draggedItem.id} />
                )}
            </DragPreviewWrapper>
        </CustomDragLayerContainer>
    ) : null
}