
import ListCategory from './components/listCategory';
import './App.css'

function App() {
    const isLoggedIn = true;

  return (
    <>
     
      <h1>Vite + React</h1>
          <ListCategory isLoggedIn={isLoggedIn} />
    </>
  )
}

export default App
