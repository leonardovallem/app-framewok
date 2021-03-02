import React from "react"
import axios from "axios"
import { useDispatch } from "react-redux"

import Tabela from "../../components/Tabela"
import * as changeTab from "../../reducers/changeTab/actions"
import Container from "../../components/Container"

const campos = [
  "Id do Usuário",
  "Id da Postagem",
  "Título",
  "Descrição",
]

export default function Postagens() {
  const dispatch = useDispatch()
  const [postagens, setPostagens] = React.useState([])

  React.useEffect(() => {
    let isCancelled = false
    dispatch(changeTab.selectPostagens())

    async function getData() {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
      if (!isCancelled) setPostagens(response.data)
    }
    getData()

    return () => {
      isCancelled = true
    }
  }, [postagens])

  return (
    <Container title="Postagens">
      <Tabela fields={campos} dataValues={postagens} />
    </Container>
  )
}
