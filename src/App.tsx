import RouteElement from './RouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElement = RouteElement()
  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
