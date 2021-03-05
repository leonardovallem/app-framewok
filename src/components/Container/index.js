import React from "react"
import { Container as MUIContainer, Typography } from "@material-ui/core"
import PropTypes from "prop-types"

import "./index.css"

export default function Container({ title, children }) {
  return (
    <MUIContainer className="container-box">
      <Typography variant="h3" align="center">{title}</Typography>
      {children}
    </MUIContainer>
  )
}

Container.defaultProps = {
  children: <></>,
  title: "",
}

Container.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}
