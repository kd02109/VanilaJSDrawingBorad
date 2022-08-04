const color = document.querySelector("#color");
const canvas = document.querySelector("#jsCanvas");
const range = document.querySelector("#jsRange");
const ctx = canvas.getContext("2d");
const colorList=[
    "#1abc9c",
    "#3498db",
    "#34495e",
    "#27ae60",
    "#8e44ad",
    "#f1c40f",
    "#e74c3c",
    "#95a5a6",
    "#d35400",
    "#bdc3c7",
    "#2ecc71",
    "#e67e22"
]
const colorOPtions =Array.from(
    document.getElementsByClassName("color-option")
);
const modeBtn = document.querySelector("#jsMode");
const destoryBtn = document.querySelector("#jsDestroy");
const eraseBtn = document.querySelector("#jsErase");
const file = document.querySelector("#file");
const text = document.querySelector("#text");
const save = document.querySelector("#jsSave");
const fontSize = document.querySelector("#fontSize");
const font = document.querySelector("#fontTypes");
const strokeStyle = document.querySelector("#fontFillType");



//context = brush
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = range.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onOver(event){
    if(isPainting === true){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function onMove(event){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event){
    console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}
function colorChange(event){
    ctx.strokeStyle=event.target.value;
    ctx.fillStyle=event.target.value;
}

function oncolorClick(event){
    console.log(event);
    ctx.strokeStyle=event.target.dataset.color;
    ctx.fillStyle=event.target.dataset.color;
    color.value = event.target.dataset.color;
}

function changeMode(){
    if(isFilling){
        isFilling=false;
        modeBtn.innerText = "fill";
    }else{
        isFilling=true;
        modeBtn.innerText = "draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,800,800);
    }
}

function canvasDestroy(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,800,800);
}

function onCanvasErase(){
    ctx.strokeStyle="white";
    ctx.lineWidth=range.value;
    isFilling=false;
}

function onFileChange(event){
    const eventFile = event.target.files[0];
    const url = URL.createObjectURL(eventFile);
    console.log(url);
    const img = new Image()
    img.src=url;
    img.onload = function(){
        ctx.drawImage(img, 0, 0,800,800);
        file.value=null;
    }
}

function onDbclick(event){
    const textType =text.value;
    const fontNum = fontSize.value;
    const fontForm = font.value;
    console.log(fontNum, fontForm);
    if(textType !== ""){
        ctx.save();
        ctx.lineWidth=1;
        ctx.font=`${fontNum}px ${fontForm}`
        console.log(ctx.font);
        if(strokeStyle.value ==="fillText"){
            ctx.fillText(textType,event.offsetX,event.offsetY);
        }else if(strokeStyle.value === "strokeText"){
            ctx.strokeText(textType,event.offsetX,event.offsetY);
        }
        ctx.restore();
    }
}

function onSeavFile(){
    const url = canvas.toDataURL();
    console.log(canvas.toDataURL());
    const a =document.createElement("a");
    a.href=url;
    a.download="myDrawing.png";
    a.click();
}


canvas.addEventListener("dblclick",onDbclick);
canvas.addEventListener("mousedown", onMove);
canvas.addEventListener("mousemove", onOver);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click",onCanvasClick);
eraseBtn.addEventListener("click",onCanvasErase);
color.addEventListener("change",colorChange);
range.addEventListener("change", onLineWidthChange);
colorOPtions.forEach(color => color.addEventListener("click",oncolorClick));
modeBtn.addEventListener("click",changeMode);
destoryBtn.addEventListener("click",canvasDestroy);
file.addEventListener("change",onFileChange);
save.addEventListener("click",onSeavFile);

