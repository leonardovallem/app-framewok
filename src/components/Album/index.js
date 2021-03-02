import React from "react"
import {
  Dialog, Button, DialogTitle, DialogContent, GridList, GridListTile,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}))

export default function Album({ id, data }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  React.useEffect(() => {
  }, [])

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Abrir álbum
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="album-title"
      >
        <DialogTitle id="album-title">
          Álbum de fotos #
          {id}
        </DialogTitle>
        <DialogContent>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {data?.filter((pic) => String(pic.albumId) === String(id))?.map((pic) => (
              <GridListTile key={pic.id} cols={1}>
                <img src={pic.url} alt={pic.title} />
              </GridListTile>
            ))}
          </GridList>
        </DialogContent>
      </Dialog>
    </>
  )
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
}
