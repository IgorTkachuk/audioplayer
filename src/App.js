import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faStopCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons'


function timePattern(sec) {
  sec = Math.floor(sec)

  const hours = Math.floor(sec/3600)
  const min = Math.floor((sec - (hours * 3600))/60)
  const s = sec - (hours * 3600 + min * 60)

  return String(hours).padStart(2, '0') + ':' + String(min).padStart(2,0) + ":" + String(s).padStart(2, '0')
}

class App extends Component {
  state ={
    loaded: false,
    playing: false,
    currenTime: 0,
    duration: 0
  }

  componentDidMount () {
    const audio = this.audio
    audio.src='https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3'

    audio.addEventListener('loadeddata', _ =>{
      this.setState({
        loaded: true,
        duration: audio.duration
      })
    })

    audio.addEventListener('ended', _ => {
      this.setState({
        playing: false
      })
    })

    this.intervalId = setInterval(_=>{
      this.setState({
        currenTime: this.audio.currentTime
      })
    }, 50)

    HTMLAudioElement.prototype.stop = function(){
      this.pause();
      this.currentTime = 0.0;
    }
  }

  play = () => {
    this.setState({
      playing: true
    })
    this.audio.play()
  }

  stop = () => {
    this.setState({
      playing: false,
      currentTime: 0
    })
    this.audio.stop()
  }

  pause = () => {
    this.setState({
      playing: false
    })
    this.audio.pause()
  }

  sliderChangeHandler = (e) => {
    this.audio.currentTime = e.target.value
  }

  render() {
    const {loaded, playing, currenTime, duration} = this.state

    return (
      <div>
        <audio ref={ref => this.audio = ref} controls={false} autoPlay={false}/>
        { loaded ? 
            <>
              {playing ? <FontAwesomeIcon icon={faPauseCircle} onClick={this.pause} />
                : <FontAwesomeIcon icon={faPlayCircle} onClick={this.play} />
              }
              {"  "}
              <FontAwesomeIcon icon={faStopCircle} onClick={this.stop}/>
              <span style={{color: 'steelblue', fontFamily: 'Tahoma', fontSize: '0.7em', padding: '0px 6px'}}>{ timePattern(currenTime) }</span>
              <input className="slider" type="range" min="0" max={Math.floor(duration)} value={Math.floor(currenTime)} onChange={e => this.sliderChangeHandler(e)}/>
              <span style={{color: 'steelblue', fontFamily: 'Tahoma', fontSize: '0.7em', padding: '0px 6px'}}>{timePattern(duration)}</span>
            </> 
          : <p>Loading...</p>
        }
      </div>
    )
  }
}

export default App;
