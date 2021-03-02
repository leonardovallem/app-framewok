import React from "react"
import { Route, Switch } from "react-router-dom"

import Menu from "../pages/Menu"
import Postagens from "../pages/Postagens"
import Albuns from "../pages/Albuns"
import Todos from "../pages/Todos"

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Menu} />
      <Route exact path="/postagens" component={Postagens} />
      <Route exact path="/albuns" component={Albuns} />
      <Route exact path="/todos" component={Todos} />
    </Switch>
  )
}
