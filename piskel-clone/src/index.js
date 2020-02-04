const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let myColor = 'black';
const colorButton = document.getElementById('colorselect');
// const previousColor = document.getElementById('previouscolor');
const bucket = document.getElementById('bucket');
const pencil = document.getElementById('pencil');
// const redcolor = document.getElementById('redcolor');
// const bluecolor = document.getElementById('bluecolor');
const clear = document.getElementById('clean');
const controlMenu = document.getElementById('control_menu');
const colorArray = [];
// const hex = document.querySelector('.hex');
const colorpicker = document.getElementById('colorpicker');
// const colorblock = document.querySelector('color');
const smallcolor1 = document.querySelector('.smallcolor');
// const smallcolor2 = document.querySelector('.smallcolor2');
// const size2 = document.getElementById('size2');
// const size3 = document.getElementById('size3');
// const size4 = document.getElementById('size4');
// const size5 = document.getElementById('size5');
const pencilsizeBlock = document.getElementById('pencilsize');
let pencilSize = 1;
const eraser = document.getElementById('eraser');
const canvasesArray = [];
const images_array = [];
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let scale = 32;
canvas.width = scale;
canvas.height = scale;
const canvases = document.querySelector('.canvases');
const for_fps = document.querySelector('.for_fps');
const example = document.querySelector('.example');
const delete_last = document.querySelector('.delete_last');
const add_more = document.querySelector('.add_more');
const stop = document.querySelector('.stop');
const copy = document.querySelector('.copy');
let fps = 1;
let i = 0;
let pause = false;

function saveToLocal() {
  const dataURL = localStorage.getItem(canvas);
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
}

if (performance.navigation.type === 1) {
  saveToLocal();
}
add_more.addEventListener('click', addNewDiv);

add_more.addEventListener('click', addNewCanvas);

delete_last.addEventListener('click', deleting_last);

copy.addEventListener('click', copy_last);

canvas.addEventListener('click', getColor);

example.addEventListener('click', go);

stop.addEventListener('click', () => {
  pause = true;
});

eraser.addEventListener('click', () => {
  myColor = '#FFFFFF';
});

for_fps.addEventListener('click', (event) => {
  const targetId = event.target.closest('div').id;
  if (targetId === '4fps') {
    fps = 4;
    pause = true;
    go();
  }
  if (targetId === '8fps') {
    fps = 8;
    pause = true;
    go();
  }
  if (targetId === '12fps') {
    fps = 12;
    pause = true;
    go();
  }
  if (targetId === '16fps') {
    fps = 16;
    pause = true;
    go();
  }
  if (targetId === '20fps') {
    fps = 20;
    pause = true;
    go();
  }
  if (targetId === '24fps') {
    fps = 24;
    pause = true;
    go();
  }
});

pencilsizeBlock.addEventListener('click', (event) => {
  const targetId = event.target.closest('div').id;
  if (targetId === 'size2') {
    pencilSize = 2;
  }
  if (targetId === 'size3') {
    pencilSize = 3;
  }
  if (targetId === 'size4') {
    pencilSize = 4;
  }
  if (targetId === 'size5') {
    pencilSize = 5;
  }
});

clear.addEventListener('click', () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 512, 512);
});

colorButton.addEventListener('input', () => {
  myColor = colorButton.value;
  colorArray.push(myColor);
  smallcolor1.style.background = myColor;
});

pencil.addEventListener('click', () => {
  myColor = '#000000';
  pencil.classList.add('active');
});

bucket.addEventListener('click', () => {
  ctx.fillStyle = myColor;
  ctx.fillRect(0, 0, 512, 512);
});

function addNewDiv() {
  const div_forcanvas = document.createElement('div');
  div_forcanvas.classList.add('mini_div_for_canvas');
  canvases.append(div_forcanvas);
  canvasesArray.push(div_forcanvas);
  div_forcanvas.classList.add(`a${canvasesArray.length}`);
}

function addNewCanvas() {
  const dataURL = canvas.toDataURL();
  const img = new Image();
  const last = document.querySelector(`.a${canvasesArray.length}`);
  img.src = dataURL;
  images_array.push(dataURL);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 512, 512);
  img.style.width = '100px';
  img.style.height = '100px';
  last.append(img);
  last.addEventListener('click', () => {
    ctx.drawImage(img, 0, 0);
  });
}

function addOldCanvas() {
  // let dataURL = canvas.toDataURL();
  const img = new Image();
  const last = document.querySelector(`.a${canvasesArray.length}`);
  img.src = images_array[images_array.length - 1];
  images_array.push(img.src);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 512, 512);
  img.style.width = '100px';
  img.style.height = '100px';
  last.append(img);
  last.addEventListener('click', () => {
    ctx.drawImage(img, 0, 0);
  });
}

function copy_last() {
  addNewDiv();
  addOldCanvas();
}

function deleting_last() {
  const last = document.querySelector(`.a${canvasesArray.length}`);
  canvases.removeChild(last);
  canvasesArray.pop();
  images_array.pop();
  if (canvasesArray.length === 0) {
    delete_last.setAttribute('disabled', 'disabled');
  }
}

function step() {
  setTimeout(function() {
      if(pause === true){return};
      requestAnimationFrame(step);
      const img = new Image();
      img.src = images_array[i];
        ctx.drawImage(img,0,0); 
        i++;
        if(i === images_array.length){
          i = 0;
        }      
  }, 1000 / fps);}

function go() {
  pause = false;
  step();
}

function resize() {
  canvas.width = scale;
  canvas.height = scale;
  scale = 512 / scale;
}

// const loadButton = document.getElementById('load');
// const bw = document.getElementById('blackandwhite');

// const img = new Image();
// img.crossOrigin = 'anonymous';

// let smallimgurl;

// function resizeimage() {
//   img.src = smallimgurl;
//   img.onload = () => {
//     const ratio = Math.min(canvas.width / img.width, canvas.width / img.height);
//     const centredX = (canvas.width - img.width * ratio) / 2;
//     const centredY = (canvas.width - img.height * ratio) / 2;
//     ctx.drawImage(img, 0, 0, img.width, img.height, centredX, centredY, img.width * ratio, img.height * ratio);
//     ctx.imageSmoothingEnabled = false;
//   };
// }

controlMenu.addEventListener('click', (event) => {
  const targetId = event.target.closest('li').id;
  if (targetId === 'button4x4') {
    scale = 4;
    resize();
    // resizeimage();
  }
  if (targetId === 'button32x32') {
    scale = 32;
    resize();
    // resizeimage();
  }
  if (targetId === 'button128x128') {
    scale = 128;
    resize();
    // resizeimage();
  }
  if (targetId === 'button256x256') {
    scale = 256;
    resize();
    // resizeimage();
  }
  if (targetId === 'button512x512') {
    scale = 512;
    resize();
    // resizeimage();
  }
});

scale = 512 / scale;

function draw(event) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.fillStyle = myColor;
  ctx.fillRect(Math.floor(lastX / scale), Math.floor(lastY / scale), pencilSize, pencilSize);
  lastX = event.offsetX;
  lastY = event.offsetY;
  localStorage.setItem(canvas, canvas.toDataURL());
}
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});
// eslint-disable-next-line no-return-assign
canvas.addEventListener('mouseup', () => isDrawing = false);
// canvas.addEventListener('mouseout', () => isDrawing = false);

let colorpickeractive = false;
function activate() {
  if (colorpickeractive === true) {
    colorpickeractive = false;
    return;
  }
  colorpickeractive = true;
}
colorpicker.addEventListener('click', activate);
function getColor(e) {
  if (colorpickeractive === true) {
    const x = e.offsetX / scale;
    const y = e.offsetY / scale;
    const pixel = ctx.getImageData(x, y, 1, 1);
    const { data } = pixel;
    const r = data[0];
    const g = data[0];
    const b = data[0];
    const rgba = `rgb(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`;
    
    smallcolor1.style.background = rgba;
    ctx.fillStyle = rgba;
    function rgbToHex() {
      const hex = `#${((1 < 24) + (r < 16) + (g < 8) + b).toString(16).slice(1)}`;
      return hex;
    }
    function rgbToHex(r,g,b) {
      r = r.toString(16);
      g = g.toString(16);
      b = b.toString(16);
    
      if (r.length == 1)
        r = "0" + r;
      if (g.length == 1)
        g = "0" + g;
      if (b.length == 1)
        b = "0" + b;
    
      return "#" + r + g + b;
    }
    const choosencolor = rgbToHex(r, g, b,);
    console.log(choosencolor);
    myColor = choosencolor;
    // colorButton.value = choosencolor;
  }
}
