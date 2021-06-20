import React, { forwardRef } from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import {
  Button,
  IconButton,
  Slider,
  Tooltip,
  Typography,
  Grid,
  Popover,
} from "@material-ui/core"
import {
  FastRewind,
  FastForward,
  PlayArrow,
  Pause,
  VolumeUp,
  Fullscreen,
  Bookmark,
  VolumeOff,
  Forward10,
  Replay10,
  SkipNext,
  SkipPrevious,
} from "@material-ui/icons"

const useStyles = makeStyles({
  mainContainer: {
    border: "1px solid black",
    padding: "10px",
  },
  controlWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1,
  },
  controlIcons: {
    color: "#777",
    fontSize: 50,
    // transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      // transform: "scale(1)",
    },
  },
  buttonIcons: {
    color: "#fff",
    "&:hover": {
      color: "#fff",
    },
  },
  volumeSlider: {
    width: 100,
    color: "#fff",
  },
})

function ValueLabelComponent(props) {
  const { children, open, value } = props
  return (
    <Tooltip open={open} enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  )
}

const PrettoSlider = withStyles({
  root: {
    height: 0,
  },
  thumb: {
    // height: 12,
    // width: 12,
    backgroundColor: "#fff",
    // border: "2px solid currentColor",
    marginTop: -4,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {
    color: "#fff",
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 4,
    borderRadius: 4,
    color: "#fff",
  },
  rail: {
    height: 4,
    borderRadius: 4,
    background: "#fff",
  },
})(Slider)

export default forwardRef(function PlayersControl(
  {
    onPlayPause,
    playing,
    onRewind,
    onForward,
    onMute,
    muted,
    onVolumeChange,
    onVolumeSeekUp,
    volume,
    playbackRate,
    onPlaybackRateChange,
    onToggaleFullScreen,
    played,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    elapsedTime,
    totalDuration,
    onChangeDisplayFormat,
    onBookMarkChangeNext,
    onBookMarkChangePrevious,
    marks,
  },
  ref
) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // console.log(marks)
  const open = Boolean(anchorEl)
  const id = open ? "playbackrate-popover" : undefined
  // console.log("updated value of played is: ", played * 100)
  // console.log(typeof totalDuration)
  // const val = parseInt(totalDuration)
  // console.log(typeof val, val * 60)
  // console.log("currennt val", played * 100)

  return (
    <div className={classes.controlWrapper} ref={ref}>
      {/* Top controls */}
      <Grid
        container
        direction='row'
        alighItems='center'
        justify='space-between'
        style={{ padding: 16 }}
      >
        <Grid item>
          {/* <Typography variant='p' style={{ color: "#fff" }}>
            Video Title
          </Typography> */}
        </Grid>
        {/* <Grid item>
          <Button variant='contained' color='primary' startIcon={<Bookmark />}>
            Bookmark
          </Button>
        </Grid> */}
      </Grid>
      {/* miidle controls */}
      <Grid container direction='row' alignItems='center' justify='center'>
        <IconButton className={classes.controlIcons} aria-label='requied'>
          <Replay10
            fontSize='large'
            style={{ color: "#fff" }}
            onClick={onRewind}
          />
        </IconButton>
        <IconButton
          style={{ color: "#fff" }}
          onClick={onPlayPause}
          className={classes.controlIcons}
          aria-label='requied'
        >
          {playing ? (
            <Pause fontSize='large' />
          ) : (
            <PlayArrow fontSize='large' />
          )}
        </IconButton>
        <IconButton className={classes.controlIcons} aria-label='requied'>
          <Forward10
            fontSize='large'
            style={{ color: "#fff" }}
            onClick={onForward}
          />
        </IconButton>
      </Grid>

      {/* Bottom controls */}
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        style={{ padding: 16 }}
      >
        <Grid item xs='12'>
          <PrettoSlider
            min={0}
            max={100}
            step={1}
            value={played * 100}
            ValueLabelComponent={(props) => (
              <ValueLabelComponent {...props} value={elapsedTime} />
            )}
            marks={marks}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onSeekMouseUp}
          />
        </Grid>

        <Grid item>
          <Grid container alignItems='center' direction='row'>
            <IconButton
              onClick={onPlayPause}
              className={classes.buttonIcons}
              aria-label='requied'
            >
              {playing ? (
                <Pause fontSize='large' />
              ) : (
                <PlayArrow fontSize='large' />
              )}
            </IconButton>

            <IconButton
              onClick={onMute}
              className={classes.buttonIcons}
              aria-label='requied'
            >
              {muted ? (
                <VolumeOff fontSize='large' />
              ) : (
                <VolumeUp fontSize='large' />
              )}
            </IconButton>
            <Slider
              className={classes.volumeSlider}
              min={0}
              max={100}
              value={volume * 100}
              defaultValue={50}
              onChange={onVolumeChange}
              onChangeCommitted={onVolumeSeekUp}
            />

            <Button
              onClick={onChangeDisplayFormat}
              variant='text'
              style={{ color: "#fff" }}
            >
              <Typography>
                {elapsedTime}/{totalDuration}
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton
            style={{ color: "#fff" }}
            className={classes.controlIcons}
            aria-label='requied'
          >
            <SkipPrevious
              onClick={onBookMarkChangePrevious}
              fontSize='large'
              style={{ color: "#fff" }}
            />
          </IconButton>
          <IconButton
            style={{ color: "#fff" }}
            className={classes.controlIcons}
            aria-label='requied'
          >
            <Bookmark fontSize='large' />
          </IconButton>
          <IconButton className={classes.controlIcons} aria-label='requied'>
            <SkipNext
              onClick={onBookMarkChangeNext}
              fontSize='large'
              style={{ color: "#fff" }}
            />
          </IconButton>
        </Grid>
        <Grid item>
          <Button
            onClick={handlePopover}
            variant='text'
            style={{ color: "#fff" }}
          >
            <Typography>{playbackRate}X</Typography>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Grid container direction='column-reverse'>
              {[0.5, 1, 1.5, 2].map((rate) => (
                <Button
                  key={rate}
                  onClick={() => onPlaybackRateChange(rate)}
                  variant='text'
                >
                  <Typography
                    color={rate === playbackRate ? "secondary" : "default"}
                  >
                    {rate}
                  </Typography>
                </Button>
              ))}
            </Grid>
          </Popover>
          <IconButton
            onClick={onToggaleFullScreen}
            className={classes.buttonIcons}
            aria-label='requied'
          >
            <Fullscreen fontSize='large' />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
})
