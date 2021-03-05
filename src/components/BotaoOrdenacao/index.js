import React from 'react'
import {
  FormControl, Grid, ListItemIcon, MenuItem, Select, TextField, Typography,
} from '@material-ui/core'
import { Sort } from "@material-ui/icons"
import PropTypes from "prop-types"

import "./index.css"

export default function BotaoOrdenacao({ campos, search, sort }) {
  const [value, setValue] = React.useState(0)
  const [query, setQuery] = React.useState("")

  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleSearch(e) {
    setQuery(e.target.value)
  }

  React.useEffect(() => {
    sort(campos[value])
  }, [value])

  React.useEffect(() => {
    search(query)
  }, [query])

  const menuProps = {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  }

  return (
    <Grid
      container
      justify="space-evenly"
      className="filter-body"
    >
      <Typography variant="h4">Filtros:</Typography>
      <TextField label="Pesquisar" variant="outlined" onChange={handleSearch} />
      <FormControl className="btn-order">
        <Select
          disableUnderline
          MenuProps={menuProps}
          value={value}
          onChange={handleChange}
        >
          {campos?.map((campo, index) => (
            <MenuItem value={index} key={String(index)} className="sort-item">
              <ListItemIcon>
                <Sort />
              </ListItemIcon>
              <span className="field-name">
                {campo}
              </span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}

BotaoOrdenacao.propTypes = {
  campos: PropTypes.instanceOf(Array).isRequired,
  sort: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
}
