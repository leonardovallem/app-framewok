import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"

import Styles from "./styles/global"
import Routes from "./routes"
import Header from "./components/Header"
import reducers from "./reducers"

import "./app.css"

const store = createStore(reducers)

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <Styles />
      </BrowserRouter>
    </Provider>
  )
}

export default App
