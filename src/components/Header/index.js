import React from "react"
import { Paper, Tabs, Tab } from "@material-ui/core"
import {
  Menu, DynamicFeed, PhotoLibrary, FormatListBulleted,
} from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import styled from "styled-components"

import "./index.css"

export default function Header() {
  const [value, setValue] = React.useState(0)
  const selectedTab = useSelector((state) => state.changeTab.selectedTab)

  function handleChange(e, newTab) {
    setValue(newTab)
  }

  React.useEffect(() => setValue(selectedTab), [selectedTab])

  function tabColor() {
    let color = "gold"
    switch (value) {
      case 1:
        color = "#db4c5a"
        break
      case 2:
        color = "cyan"
        break
      case 3:
        color = "#00897B"
        break
      default:
    }
    return color
  }

  const ColoredTab = styled(Tab)`
    &.MuiTab-textColorSecondary.Mui-selected > span {
      color: ${tabColor()};
    }
  `

  return (
    <Paper square className="tabbar">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="Abas para escolher entre postagens, álbuns e to-dos"
        TabIndicatorProps={{ style: { background: tabColor() } }}
      >
        <ColoredTab icon={<Menu />} label="MENU" component={Link} to="/" />
        <ColoredTab icon={<DynamicFeed />} label="POSTAGENS" component={Link} to="/postagens" />
        <ColoredTab icon={<PhotoLibrary />} label="ÁLBUNS" component={Link} to="/albuns" />
        <ColoredTab icon={<FormatListBulleted />} label="TO-DOs" component={Link} to="/todos" />
      </Tabs>
    </Paper>
  )
}
