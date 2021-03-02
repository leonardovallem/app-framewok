import React from 'react'
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles'
import {
  TablePagination, IconButton, Table, TableBody, Typography,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  TableFooter, ListItem, ListItemText, List, Divider,
} from '@material-ui/core'
import { KeyboardArrowRight, KeyboardArrowLeft } from "@material-ui/icons"
import PropTypes from "prop-types"

import Album from "../Album"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

function handleBoolean(value) {
  let resp = String(value)

  if (resp === "true") resp = "Sim"
  else if (resp === "false") resp = "Não"

  return resp
}

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}))

function TablePaginationActions(props) {
  const classes = useStyles1()
  const theme = useTheme()
  const {
    count, page, onChangePage,
  } = props

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1)
  }

  return (
    <div className={classes.root}>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page > count - 2}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
}

const cardStyles = makeStyles(() => ({
  root: {
    width: '95%',
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: '#424242',
    borderRadius: "0.3em",
  },
}))

export default function Tabela({
  fields, dataValues, externalLink, data: albumData,
}) {
  const classes = useStyles()
  const cardClasses = cardStyles()

  const [clientWidth, setClientWidth] = React.useState(window.innerWidth)
  const [rows, setRows] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [renderedRows, setRenderedRows] = React.useState([[]])

  function updateScreenSize() {
    setClientWidth(window.innerWidth)
  }

  function handleCount() {
    setCount(Math.ceil(rows.length / rowsPerPage))
  }

  function divideRows() {
    const rendered = []
    for (let i = 0; i < Math.ceil(rows.length / rowsPerPage); i++) {
      const start = i * rowsPerPage
      rendered[i] = rows.slice(start, start + rowsPerPage)
    }
    setRenderedRows(rendered)
    handleCount()
  }

  function handleChangePage(e, newPage) {
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  function handleChangeRowsPerPage(e) {
    setRowsPerPage(parseInt(e.target.value, 10))
    divideRows()
    setPage(0)
  }

  function createData() {
    const data = []
    for (let i = 0; i < dataValues.length; i++) {
      data[i] = {}
      for (let j = 0; j < fields.length; j++) {
        data[i][fields[j]] = handleBoolean(Object.values(dataValues[i])[j])
      }
    }
    setRows(data)
    divideRows()
  }

  React.useEffect(() => {
    if (rows.length === 0) createData()
    divideRows()
  }, [rows])

  React.useEffect(() => {
    divideRows()
    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
  }, [rowsPerPage])

  function desktopRows() {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <StyledTableCell key={field}>{field}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderedRows[page]?.map((row) => (
              <StyledTableRow key={row[fields[1]]}>
                {fields.map((field) => (
                  <StyledTableCell key={field} component="th" scope="row">
                    {field === externalLink?.field ? (
                      <Album id={row[externalLink.reference]} data={albumData} />
                    ) : row[field]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={count}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelDisplayedRows={({ from }) => `${from}-${from + rowsPerPage - 1} de ${rows.length}`}
                labelRowsPerPage="Linhas por página"
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    )
  }

  function mobileRows() {
    return (
      <List className={cardClasses.root}>
        {renderedRows[page]?.map((row) => (
          <>
            <ListItem key={row[fields[1]]} className={cardClasses.card}>
              {fields.map((field) => (field === externalLink?.field ? (
                <Album id={row[externalLink.reference]} data={albumData} style={{ float: "right" }} />
              ) : (
                <ListItemText
                  key={field}
                  secondary={(
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ color: "white" }}
                      >
                        {field}
                        {": "}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ color: "#989898" }}
                      >
                        {row[field]}
                      </Typography>
                    </>
                    )}
                />
              )))}
            </ListItem>
            <Divider key={row[fields[1] * Math.PI]} />
          </>
        ))}
        <TablePagination
          count={count}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelDisplayedRows={({ from }) => `${from}-${from + rowsPerPage - 1}/${rows.length}`}
          labelRowsPerPage="Mostrar"
          ActionsComponent={TablePaginationActions}
        />
      </List>
    )
  }

  return (
    clientWidth > 780 ? desktopRows() : mobileRows()
  )
}

Tabela.defaultProps = {
  externalLink: null,
  data: null,
}

Tabela.propTypes = {
  fields: PropTypes.instanceOf(Array).isRequired,
  dataValues: PropTypes.instanceOf(Object).isRequired,
  externalLink: PropTypes.instanceOf(Object),
  data: PropTypes.instanceOf(Array),
}
