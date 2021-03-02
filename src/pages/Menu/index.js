import React from "react"
import { Button, Typography } from "@material-ui/core"
import { DynamicFeed, PhotoLibrary, FormatListBulleted } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

import * as changeTab from "../../reducers/changeTab/actions"
import "./index.css"

export default function Menu() {
  const dispatch = useDispatch()
  const [clientWidth, setClientWidth] = React.useState(window.innerWidth)
  const [boxSize, setBoxSize] = React.useState(document.getElementById("root")?.offsetHeight)

  function getBoxSize() {
    const headerHeight = document.getElementById("root")?.offsetHeight - document.querySelector(".body-grid")?.offsetHeight
    setBoxSize(window.innerHeight - headerHeight)
  }

  function updateScreenSize() {
    setClientWidth(window.innerWidth)
    getBoxSize()
  }

  React.useEffect(() => {
    dispatch(changeTab.selectMenu())

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
  }, [])

  return (
    <div className="body-grid" style={{ height: boxSize }}>
      <Typography align="center" variant="h1" className="title">
        Menu
      </Typography>
      <div className={`options ${clientWidth > 950 ? "desktop" : "mobile"}`}>
        <Button
          className="btn purple"
          variant="contained"
          startIcon={<DynamicFeed />}
          component={Link}
          to="/postagens"
        >
          Postagens
        </Button>

        <Button
          className="btn blue"
          variant="contained"
          startIcon={<PhotoLibrary />}
          component={Link}
          to="/albuns"
        >
          Álbuns
        </Button>

        <Button
          className="btn green"
          variant="contained"
          startIcon={<FormatListBulleted />}
          component={Link}
          to="/todos"
        >
          To-Dos
        </Button>
      </div>
      <Typography align="center" variant="body1" className="footer">
        App Framework - Leonardo Valle
      </Typography>
    </div>
  )
}
