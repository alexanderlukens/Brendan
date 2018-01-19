import React from 'react'
import ReactDom from 'react-dom'
import { ReactMic } from 'react-mic'
import axios from 'axios'

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

    let data = new FormData();
    data.append('file', recordedBlob.blob );
    this.setState({
      blobURL: recordedBlob.blobURL,
      blob: recordedBlob.blob
    });
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
  }


  render(){
    return(
      <div>
       <ReactMic
         record={this.state.record}
         className="sound-wave"
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
