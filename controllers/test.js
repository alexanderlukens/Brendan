const spawn = require('child_process').spawn
const FileReader = require('filereader')
const request = require('request');
const fs = require('fs')
const fileReader = new FileReader();

const start = (req, res) => {
  console.log(req.file.buffer)

  fs.writeFileSync('test.wav', req.file.buffer);


    //
    // const py = spawn('python', ['vendor/OpenVokaturi-2-2a/examples/measure_wav_mac.py', 'test.wav'])
    // let dataString = '';
    //
    // py.stdout.on('data', function(data){
    //   dataString += data.toString('utf8');
    //   console.log(dataString)
    // });
    //
    // py.stdout.on('end', function(){
    //   console.log('Sum of numbers=',dataString);
    // });
    //
    // py.stderr.on('data', (data) => {
    //   console.error(`child stderr:\n${data}`);
    // });
    res.send('ok');
  //})
}


module.exports = {
  start
}
