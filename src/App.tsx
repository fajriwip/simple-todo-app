import 'normalize.css'
import './App.css'
import { AppContainer } from './styles.tsx'
import { Column } from './Column.tsx'
import { AddNewItem } from './AddNewItem.tsx'
import { useAppState } from './state/AppStateContext.tsx'
import { addList } from './state/Action.ts'
import { CustomDragLayer } from './CustomDragLayer.tsx'

function App() {
  const { lists, dispatch } = useAppState()

  const addColumnHandler = (title: string) => {
    dispatch(addList(title))
  }

  return (
    <AppContainer>
      <CustomDragLayer />
      {
        lists.map(({ id, title }) => <Column key={id} title={title} id={id} />)
      }
      <AddNewItem text="+ Add another card" onAdd={addColumnHandler} />
    </AppContainer>
  )
}

export default App
