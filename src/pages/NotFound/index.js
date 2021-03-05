import React from "react"
import { SentimentVeryDissatisfied } from "@material-ui/icons"
import { useDispatch } from "react-redux"

import Container from "../../components/Container"
import * as changeTab from "../../reducers/changeTab/actions"

export default function NotFound() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(changeTab.selectNone())
  }, [])

  return (
    <Container title="Página não encontrada">
      <SentimentVeryDissatisfied style={{ width: "40%", height: "40%" }} />
    </Container>
  )
}
