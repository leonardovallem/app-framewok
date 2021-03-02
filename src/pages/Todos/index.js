import React from "react"
import axios from "axios"
import { useDispatch } from "react-redux"

import Tabela from "../../components/Tabela"
import * as changeTab from "../../reducers/changeTab/actions"
import Container from "../../components/Container"

const campos = [
  "Id do Aluno",
  "Id da Tarefa",
  "Título",
  "Realizado",
]

export default function Todos() {
  const dispatch = useDispatch()
  const [todos, setTodos] = React.useState([])

  React.useEffect(() => {
    let isCancelled = false
    dispatch(changeTab.selectTodos())

    async function getData() {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
      if (!isCancelled) setTodos(response.data)
    }
    getData()

    return () => {
      isCancelled = true
    }
  }, [todos])

  return (
    <Container title="To-Dos">
      <Tabela fields={campos} dataValues={todos} />
    </Container>
  )
}
