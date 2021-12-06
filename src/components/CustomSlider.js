import React, { useState, useEffect } from "react"
import bookmarkImg from "../imges/bookmark.png"
import bookmarkImg1 from "../imges/bookmark1.png"
function CustomSlider({
  playedSeconds,
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
}) {
  const [currentTime, setCurrentTime] = useState(0)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime((pre) => pre + 1)
  //     console.log("update time!!!", currentTime)
  //   }, 1000)
  //   return () => clearTimeout(timer)
  // }, [currentTime])

  return (
    <div className='slider-wrap'>
      <div className='seekbar'>
        <div className='bookmark-container'>
          <span className='bookmark-icon' style={{ left: "20%" }}>
            <img src={bookmarkImg1} alt='' />
          </span>
          <span className='bookmark-icon' style={{ left: "50%" }}>
            <img src={bookmarkImg1} alt='' />
          </span>
          <span className='bookmark-icon' style={{ left: "80%" }}>
            <img src={bookmarkImg1} alt='' />
          </span>
        </div>
        <div className='slider-container'>
          <input
            id='volume'
            type='range'
            name='volume'
            min='0'
            max='400'
            step='1'
            value={playedSeconds}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onMouseUp={onSeekMouseUp}
            // onChange={(e) => {
            //   setCurrentTime(e.target.value)
            //   console.log("onChnage!!!!", e.target.value)
            // }}
            // onMouseDown={(e) => console.log("onMouseDown!!!!", e.target.value)}
            // onMouseUp={(e) => console.log("onMouseUp!!!!", e.target.value)}
          />
          {/* <label for='volume'>Volume</label> */}
          <span style={{ left: "50%" }} className='marker-dot'></span>
          <span style={{ left: "20%" }} className='marker-dot'></span>
          <span style={{ left: "80%" }} className='marker-dot'></span>
        </div>
      </div>
      <p> Playing time :{Math.floor(playedSeconds)}</p>
    </div>
  )
}

// onChange={onSeek}
// onMouseDown={onSeekMouseDown}
// onChangeCommitted={onSeekMouseUp}

export default CustomSlider
