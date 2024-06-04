import { useState } from "react"
import { AddItemButton } from "./styles"
import { NewItemForm } from "./NewItemForm"

type AddNewItemProps = {
    onAdd(text: string): void
    dark?: boolean
    text: string
}

export const AddNewItem = ({ onAdd, text, dark }: AddNewItemProps) => {
    const [showForm, setShowForm] = useState(false)

    const addHandler = (text: string) => {
        onAdd(text)
        setShowForm(false)
    }

    if (showForm) {
        return <NewItemForm onAdd={addHandler} onCancel={() => setShowForm(false)} />
    }
    return (
        <AddItemButton $dark={dark} onClick={() => setShowForm(true)}>{text}</AddItemButton>
    )
}
