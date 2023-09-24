const startRecordButton = document.getElementById('startRecord');
const stopRecordButton = document.getElementById('stopRecord');
const audioPlayer = document.getElementById('audioPlayer');
const info = document.getElementById('info');
let mediaRecorder;
let audioChunks = [];

info.style.background = 'rgba(255, , 0, 0.699)';

navigator.mediaDevices.getUserMedia({
        audio: true
    })
    .then(function(stream) {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function(event) {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        }

        mediaRecorder.onstop = function() {
            const audioBlob = new Blob(audioChunks, {
                type: 'audio/wav'
            });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayer.src = audioUrl;
        }
    })
    .catch(function(error) {
        console.error('Erro ao acessar o microfone:', error);
    });

startRecordButton.addEventListener('click', function() {
    audioChunks = [];
    mediaRecorder.start();
    startRecordButton.disabled = true;
    info.style.background = 'rgb(0, 255, 42)';

    stopRecordButton.disabled = false;
});

stopRecordButton.addEventListener('click', function() {
    mediaRecorder.stop();
    startRecordButton.disabled = false;
    info.style.background = 'rgba(255, 0, 0.699)';
    stopRecordButton.disabled = true;
});