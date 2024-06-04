import { useState } from "react"
import { Col, NewItemButton, NewItemFormContainer, NewItemInput, Row } from "./styles"
import useFocus from "./utils/useFocus"

type NewItemFormProps = {
    onAdd(text: string): void
    onCancel(): void
}

export const NewItemForm = ({ onAdd, onCancel }: NewItemFormProps) => {
    const [text, setText] = useState("")
    const inputRef = useFocus()

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onAdd(text)
    }
    return (
        <NewItemFormContainer>
            <NewItemInput onChange={changeHandler} onKeyDown={keyDownHandler} value={text} ref={inputRef} />
            <Row $gutters={1}>
                <Col>
                    <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
                </Col>
                <Col>
                    <NewItemButton onClick={onCancel} $bgColor="orange">Cancel</NewItemButton>
                </Col>
            </Row>
        </NewItemFormContainer>
    )
}
