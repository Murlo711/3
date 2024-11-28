// Аудио и Видео

document.getElementById('audioInput').addEventListener('change', function(event) {

    const file = event.target.files[0];

    if (file) {

        const url = URL.createObjectURL(file);

        const audioPlayer = document.getElementById('audioPlayer');

        audioPlayer.src = url;

    }

});

document.getElementById('videoInput').addEventListener('change', function(event) {

    const file = event.target.files[0];

    if (file) {

        const url = URL.createObjectURL(file);

        const videoPlayer = document.getElementById('videoPlayer');

        videoPlayer.src = url;

    }

});

// Рисование на Canvas

const canvas = document.getElementById('drawingCanvas');

const ctx = canvas.getContext('2d');

let animationId;

canvas.addEventListener('mousedown', startDrawing);

canvas.addEventListener('mouseup', stopDrawing);

canvas.addEventListener('mousemove', draw);

let drawing = false;

function startDrawing(event) {

    drawing = true;

    ctx.beginPath();

    ctx.moveTo(event.offsetX, event.offsetY);

}

function stopDrawing() {

    drawing = false;

    ctx.closePath();

}

function draw(event) {

    if (!drawing) return;

    ctx.lineTo(event.offsetX, event.offsetY);

    ctx.stroke();

}

// Анимация

let x = 0;

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'blue';

    ctx.fillRect(x, 100, 50, 50);

    x += 2;

    if (x > canvas.width) x = -50;

    animationId = requestAnimationFrame(animate);

}

document.getElementById('startAnimation').addEventListener('click', function() {

    if (!animationId) {

        animate();

    }

});

// Работа с изображениями

document.getElementById('imageInput').addEventListener('change', function(event) {

    const file = event.target.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function(e) {

            const img = new Image();

            img.onload = function() {

                const imageCanvas = document.getElementById('imageCanvas');

                const imgCtx = imageCanvas.getContext('2d');

                imgCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

                imgCtx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);

            };

            img.src = e.target.result;

        };

        reader.readAsDataURL(file);

    }

});

// Сохранение изображений

document.getElementById('saveImage').addEventListener('click', function() {

    const imageCanvas = document.getElementById('imageCanvas');

    const link = document.createElement('a');

    link.download = 'image.png';

    link.href = imageCanvas.toDataURL('image/png');

    link.click();

});