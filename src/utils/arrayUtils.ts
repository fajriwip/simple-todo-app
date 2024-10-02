type Item = {
    id: string
}

export const findItemIndexById = <T extends Item>(items: T[], id: string | null) => {
    return items.findIndex((item: T) => item.id === id)
}

function removeItemAtIndex<Item>(array: Item[], index: number) {
    return [...array.slice(0, index), ...array.slice(index + 1)]
}

function insertItemAtIndex<Item>(array: Item[], item: Item, index: number) {
    return [...array.slice(0, index), item, ...array.slice(index)]
}

export const moveItem = <Item>(array: Item[], from: number, to: number) => {
    const item = array[from]
    return insertItemAtIndex(removeItemAtIndex(array, from), item, to)
}