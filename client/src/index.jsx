import React from 'react'
import ReactDom from 'react-dom'
import { ReactMic } from 'react-mic'
import axios from 'axios'
import toWav from 'audiobuffer-to-wav'

const audioContext = new AudioContext()


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      record: false,
      blobURL: '',
      blob: ''
    }
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  startRecording(){
    this.setState({
      record: true
    });
  }

  stopRecording(){
    this.setState({
      record: false
    });
  }

  onStop(recordedBlob) {
    const data = new FormData();
    const fileReader = new FileReader();
    let arrayBuffer;

    fileReader.onload = function() {
      arrayBuffer = this.result;
      audioContext.decodeAudioData(arrayBuffer, (audio) => {
        //convert audiobuffer to wav audio buffer
        var wav = toWav(audio)
        //convert wav audio buffer to blob
        var blob = new Blob([wav], {type: "audio/wav"});
        //append blob to formdata, efficient way to send blob to backend
        data.append('file', blob);
        axios.post('/api/test', data, {
          headers: {
           'Content-Type': 'multipart/form-data',
          }
        })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.error(err);
        })
      })
    };
    //convert blob to arrayBuffer
    fileReader.readAsArrayBuffer(recordedBlob.blob);

    this.setState({
      blobURL: recordedBlob.blobURL,
      blob: recordedBlob.blob
    });
  }


  render(){
    return(
      <div>
       <ReactMic
         record={this.state.record}
         className="sound-wave"
         mimeType='audio/wav;codecs=opus'
         onStop={this.onStop}
         strokeColor="#000000"
         backgroundColor="#FF4081" />
       <button onClick={this.startRecording} type="button">Start</button>
       <button onClick={this.stopRecording} type="button">Stop</button>
       <div>
         <audio ref="audioSource" controls="controls" src={this.state.blobURL}></audio>
       </div>
     </div>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app'))
