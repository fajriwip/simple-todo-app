export type ColumnDragItem = {
    id: string
    text: string
    type: 'COLUMN'
    columnId?: string
}

export type CardDragItem = {
    id: string
    text: string
    type: 'CARD'
    columnId: string
}

export type DragItem = ColumnDragItem | CardDragItem