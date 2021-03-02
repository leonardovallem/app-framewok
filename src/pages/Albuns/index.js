import React from "react"
import { useDispatch } from "react-redux"
import axios from "axios"

import * as changeTab from "../../reducers/changeTab/actions"
import Container from "../../components/Container"
import Tabela from "../../components/Tabela"

const campos = [
  "Id do Usuário",
  "Id do Álbum",
  "Título",
  "Visualizar",
]

export default function Albuns() {
  const dispatch = useDispatch()
  const [albuns, setAlbuns] = React.useState([])
  const [imagens, setImagens] = React.useState([])

  React.useEffect(() => {
    let isCancelled = false
    dispatch(changeTab.selectAlbuns())

    async function getData() {
      const response = await axios.get("https://jsonplaceholder.typicode.com/albums")
      if (!isCancelled) setAlbuns(response.data)
    }
    getData()

    return () => {
      isCancelled = true
    }
  }, [albuns])

  React.useEffect(() => {
    let isCancelled = false

    async function getData() {
      const response = await axios.get("https://jsonplaceholder.typicode.com/photos")
      if (!isCancelled) setImagens(response.data)
    }
    getData()

    return () => {
      isCancelled = true
    }
  }, [imagens])

  return (
    <Container title="Álbuns">
      <Tabela fields={campos} dataValues={albuns} externalLink={{ field: "Visualizar", reference: "Id do Álbum" }} data={imagens} />
    </Container>
  )
}
