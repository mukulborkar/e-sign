const colorPicker = document.getElementById("colorPicker");
const canvaseColor = document.getElementById("canvasColor");
const canvas = document.getElementById("canvas");
const clearBtn = document.getElementById("clearBtn");
const retreiveBtn = document.getElementById("retrieveBtn");
const saveBtn = document.getElementById("saveBtn");
const fontSize = document.getElementById("fontSize");

const ctx = canvas.getContext('2d');

colorPicker.addEventListener('change',(event) => {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
});

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        lastX = event.offsetX;
        lastY = event.offsetY;
   } 
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
}); 


canvaseColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, 800, 500);
});

fontSize.addEventListener('change', (event) => {
    ctx.lineWidth = event.target.value;
});

clearBtn.addEventListener('click', (event) => {
    ctx.clearRect(0,0,canvas.width,canvas.height); 
});

saveBtn.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

retreiveBtn.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img, 0, 0);
    }
});