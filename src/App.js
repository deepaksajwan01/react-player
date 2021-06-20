import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"
import screenfull from "screenfull"
import { Toolbar, Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import PlayersControl from "./components/PlayersControl"
import "./App.css"

const useStyles = makeStyles({
  mainContainer: {
    // border: "1px solid black",
    // padding: "10px",
  },
  playerWrapper: {
    width: "100%",
    position: "relative",
  },
})

const format = (seconds) => {
  if (isNaN(seconds)) return "00:00"
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = date.getUTCSeconds()

  if (hh) return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
  return `${mm}:${ss}`
}
let count = 0
function App() {
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    currentMark: 0,
  })
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal")
  const classes = useStyles()
  const { playing, muted, volume, playbackRate, played, currentMark } = state

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing })
  }
  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
  }

  const handleForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
  }

  const handleMute = () => {
    setState({ ...state, muted: !state.muted })
  }

  const handleVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    })
  }
  const handleVolumeSeekUp = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    })
  }
  const handlePlaybackRateChange = (rate) => {
    setState({
      ...state,
      playbackRate: rate,
    })
  }
  const toggaleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current)
  }
  const handleProgress = (changeState) => {
    if (count > 3) {
      controlRef.current.style.visibility = "hidden"
      count = 0
    }
    if (controlRef.current.style.visibility == "visible") {
      count += 1
    }
    // console.log(count)
    // console.log("changeState: ", changeState)

    /* check for if we the current state has the bookmark time  */
    /* update the current bookmark */
    if (bookmarks.includes(changeState.playedSeconds / 60)) {
      console.log("we passed the bookmark")
    }

    setState({
      ...state,
      ...changeState,
    })
  }

  const handleSeekChange = (e, newValue) => {
    // console.log("handleSeekChange", newValue)
    // console.log(playerRef.current.played)
    if (!state.seeking) {
      setState({
        ...state,
        played: parseFloat(newValue / 100),
      })
    }
  }
  const handleOnSeekMouseDown = (e) => {
    // console.log("handleOnSeekMouseDown")
    setState({
      ...state,
      seeking: true,
    })
  }
  const handleOSeekMouseUp = (e, newValue) => {
    // console.log("total time is : ", playerRef.current.getDuration())
    console.log("handleOSeekMouseUp", newValue)
    setState({
      ...state,
      seeking: false,
    })
    playerRef.current.seekTo(newValue / 100)
  }

  const handleChangeDisplayFormat = () => {
    setTimeDisplayFormat(timeDisplayFormat === "normal" ? "remaning" : "normal")
  }
  const playerRef = useRef(null)
  const playerContainerRef = useRef(null)
  const controlRef = useRef(null)

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00"
  const duration = playerRef.current ? playerRef.current.getDuration() : "00:00"

  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}
  `
  const totalDuration = format(duration)

  const handleMouseMove = () => {
    controlRef.current.style.visibility = "visible"
    count = 0
  }
  const bookmarks = [2, 4, 5.5, 7, 10]
  const createMarkers = () => {
    // const totalDuration = 14
    const marks = bookmarks.map((bookmark) => {
      const val = (bookmark / 14) * 100
      return { value: val }
    })
    return marks
  }
  const marks = createMarkers()
  // console.log(marks)
  //handle bookmarks

  const handleBookMarkChangeNext = () => {
    if (currentMark === bookmarks.length - 1) return
    playerRef.current.seekTo(bookmarks[currentMark + 1] * 60)
    setState({
      ...state,
      currentMark: state.currentMark + 1,
    })
    console.log("currentMark", currentMark)
  }

  const handleBookMarkChangePrevious = () => {
    if (currentMark === 0) return
    playerRef.current.seekTo(bookmarks[currentMark - 1] * 60)
    setState({
      ...state,
      currentMark: state.currentMark - 1,
    })
    console.log("currentMark", currentMark)
  }

  return (
    <>
      <Toolbar />
      <Container maxWidth='md' className={classes.mainContainer}>
        <div
          ref={playerContainerRef}
          className={classes.playerWrapper}
          onMouseMove={handleMouseMove}
        >
          <ReactPlayer
            ref={playerRef}
            width={"100%"}
            height='100%'
            url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
            // url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'

            playing={playing}
            muted={muted}
            volume={volume}
            playbackRate={playbackRate}
            onProgress={handleProgress}
          />
          <PlayersControl
            ref={controlRef}
            onPlayPause={handlePlayPause}
            playing={playing}
            onRewind={handleRewind}
            onForward={handleForward}
            onMute={handleMute}
            muted={muted}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekUp={handleVolumeSeekUp}
            volume={volume}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRateChange}
            onToggaleFullScreen={toggaleFullScreen}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleOnSeekMouseDown}
            onSeekMouseUp={handleOSeekMouseUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            onChangeDisplayFormat={handleChangeDisplayFormat}
            onBookMarkChangeNext={handleBookMarkChangeNext}
            onBookMarkChangePrevious={handleBookMarkChangePrevious}
            marks={marks}
          />
        </div>
      </Container>
    </>
  )
}

export default App
