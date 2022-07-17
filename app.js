const canvas = document.querySelector("#jsCanvas");
console.log(canvas)

let painting = false;

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
        /* clientX,Y - window 화면 전체에서의 좌표
    offsetX,Y - canvas 화면 내에서의 좌표를 의미 */
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(event);
    console.log(x,y);
}

function onMouseDown(event){
    console.log(event);
    painting = true;
}

function onMouseUp(event){
    stopPainting();
}


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",onMouseDown);
    canvas.addEventListener("mouseup",onMouseUp);
    canvas.addEventListener("mouselive",stopPainting);
}