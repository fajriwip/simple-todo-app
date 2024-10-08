import styled from "styled-components";

type AddItemButtonProps = {
  $dark?: boolean
}

type NewItemButtonProps = {
  $bgColor?: string
}

type GridProps = {
  $gutters?: number
}

interface DragPreviewContainerProps {
  isHidden?: boolean
  isPreview?: boolean
}

type DragPreviewWrapperProps = {
  position: {
    x: number
    y: number
  }
}

export const AppContainer = styled.div`
  align-items: flex-start;
  background-color: #3179ba;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 20px;
`

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${props => props.isHidden ? 0 : 1};
  transform: ${props => props.isPreview ? 'rotate(5deg)' : 'none'}
`

export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #ebecf0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
`

export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`

export const CardContainer = styled(DragPreviewContainer)`
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
`

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${props => (props.$dark ? "#000" : "#fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    background-color: #ffffff52;
  }
`

export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`

export const Col = styled.div``

export const Row = styled.div<GridProps>`
  display: flex;
  flex-wrap: wrap;
  margin-left: ${props => props.$gutters ? `-${props.$gutters / 2}rem` : 0};
  margin-right: ${props => props.$gutters ? `-${props.$gutters / 2}rem` : 0};

  ${Col} {
    ${props => props.$gutters ? `padding-left: ${props.$gutters / 2}rem; padding-right: ${props.$gutters / 2}rem` : "padding-left: 0; padding-right: 0"}
  }
`


export const NewItemButton = styled.button<NewItemButtonProps>`
  background-color: ${props => props.$bgColor ? props.$bgColor : "#5aac44"};
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
  cursor: pointer;
`

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`
export const CustomDragLayerContainer = styled.div`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`

export const DragPreviewWrapper = styled.div.attrs<DragPreviewWrapperProps>(
  ({ position: { x, y } }) => ({
    style: {
      transform: `translate(${x}px, ${y}px)`
    }
  })
) <DragPreviewWrapperProps>``