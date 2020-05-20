/* eslint-disable camelcase */
/* eslint-disable max-len */
'use strict';
const graf = {};
const loops = [];
const N = 11;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// const term = document.getElementById('term');

// let startText = 'Graph-plotter:~ circle$ ';
// term.innerHTML = startText;

//term.innerHTML +=  'directed --info <br>';

ctx.font = '17px Times new Roman';
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';


const G = [
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1],
  [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const A = [
  [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
];
const  W  = [
  [0,  21, 0,  63, 72, 14, 0,  0,  84, 89, 95],
  [21, 0,  23, 4,  13, 0,  83, 35, 28, 0,  25],
  [0,  23, 0,  44, 45, 0,  0,  28, 0,  57, 0 ],
  [63, 4,  44, 0,  40, 0,  0,  46, 0,  0,  0 ],
  [72, 13, 45, 40, 0,  51, 98, 80, 15, 39, 0 ],
  [14, 0,  0,  0,  51, 0,  0,  25, 0,  0,  0 ],
  [0,  83, 0,  0,  98, 0,  0,  78, 0,  26, 0 ],
  [0,  35, 28, 46, 80, 25, 78, 0,  65, 0,  22],
  [84, 28, 0,  0,  15, 0,  0,  65, 0,  5,  0 ],
  [89, 0,  57, 0,  39, 0,  26, 0,  5,  0,  0 ],
  [95, 25, 0,  0,  0,  0,  0,  22, 0,  0,  0 ],
];

const r = 14;
const rloops = 3 * r / 4;

const calcVertics = (n, P, x0, y0, obj) => {

  const step = P / n;
  const side = P / 3;
  let left = 0;
  let vert = 1;
  let newX = x0;
  let newY = y0;

  ctx.beginPath();
  ctx.setLineDash([5, 15]);
  ctx.moveTo(x0, y0);

  ctx.lineTo(x0 + side / 2, y0 - side * Math.sin(Math.PI / 3));
  ctx.lineTo(x0 + side, y0);
  ctx.lineTo(x0, y0);
  ctx.stroke();

  ctx.setLineDash([]);

  for (let curMargin = 0; curMargin <= side; curMargin += step) {
    Object.defineProperty(obj, `vert${vert}`, {
      value: {
        coords: [newX, newY],
        num: vert,
      },
      enumerable: true,
      writable: true
    });
    newX += step * Math.cos(Math.PI / 3);
    newY += -step * Math.sin(Math.PI / 3);
    left = side - curMargin;
    vert++;
  }

  newX = x0 + side / 2;
  newY = y0 - side * Math.sin(Math.PI / 3);

  for (let curMargin = left; curMargin <= side; curMargin += step) {
    Object.defineProperty(obj, `vert${vert}`, {
      value: {
        coords: [newX, newY],
        num: vert,
      },
      enumerable: true,
      writable: true
    });
    newX += step * Math.cos(Math.PI / 3);
    newY += step * Math.sin(Math.PI / 3);
    left = side - curMargin;
    vert++;
  }

  newX = x0 + side;
  newY = y0;

  for (vert; vert <= n; vert++) {
    newX += -step;

    Object.defineProperty(obj, `vert${vert}`, {
      value: {
        coords: [newX, newY],
        num: vert,
      },
      enumerable: true,
      writable: true
    });
  }
};

calcVertics(11, 2200, 50, 670, graf);

const makeCons = (matrix, obj) => {
  for (const key in obj) {
    obj[key].double = [];
    obj[key].double = [];
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j]) {
        const names = [`vert${i + 1}`, `vert${j + 1}`];
        if (i === j) loops.push(`vert${i + 1}`);
        else if (!matrix[j][i]) {
          obj[names[0]].double.push(`vert${j + 1}`);
        } else {
          obj[names[0]].double.push(`vert${j + 1}`);
        }
      }
    }
  }
};
const center = (x0, y0, p) => {
  const x = x0 + p / 6;
  const y = y0 + p / 6;
  return {
    x,
    y
  };
};

const drawLoops = (arr, obj, x0, y0) => {
  let alpha;
  const xc = center(x0, y0, 1600).x;
  const yc = center(x0, y0, 1600).y;
  for (const i in arr) {
    alpha = Math.atan2(obj[arr[i]].coords[1] - yc, obj[[arr[i]]].coords[0] - xc);
    const R = Math.sqrt((obj[arr[i]].coords[0] - xc) ** 2 + (obj[arr[i]].coords[1] - yc) ** 2) + r;
    const xloops = xc + R * Math.cos(alpha);
    const yloops = yc + R * Math.sin(alpha);
    ctx.beginPath();
    ctx.arc(xloops, yloops, rloops, 0, 2 * Math.PI, false);
    ctx.stroke();
  }
};



function singleAdditionalDots(x0, y0, x1, y1) {
  const alpha = Math.atan2(y1 - y0, x1 - x0);
  return {
    dx: -(r * 5.4) * Math.cos(Math.PI / 2 - alpha),
    dy: (r * 3.8) * Math.sin(Math.PI / 2 - alpha)
  };
}
const single = obj => {
  for (const key in obj) {
    for (let i = 0; i < obj[key].double.length; i++) {
      const fromX = obj[key].coords[0];
      const fromY = obj[key].coords[1];
      const toX = obj[`${obj[key].double[i]}`].coords[0];
      const toY = obj[`${obj[key].double[i]}`].coords[1];

      if (obj[key].num <= obj[`${obj[key].double[i]}`].num) {
        if (Math.abs(obj[key].num - obj[`${obj[key].double[i]}`].num) === 1 || Math.abs(obj[key].num - obj[`${obj[key].double[i]}`].num) === (Object.keys(obj).length - 1)) {
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(toX, toY);
          ctx.stroke();
        } else {
          const { dx, dy } = singleAdditionalDots(fromX, fromY, toX, toY);
          let newX = (fromX + toX) / 2;
          let newY = (fromY + toY) / 2;
          newX -= dx;
          newY += dy;
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(newX, newY);
          ctx.lineTo(toX, toY);
          ctx.stroke();
        }
      }
    }
  }
};



const drawVertex = obj => {
  for (const key in obj) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(obj[key].coords[0], obj[key].coords[1], r, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'grey';
    ctx.fill();
    ctx.font = '17px Times new Roman';
    ctx.strokeStyle = 'white';
    ctx.strokeText(obj[key].num, obj[key].coords[0], obj[key].coords[1]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
};



function drawCircle(context, x, y, r, fillStyle, strokeStyle) {
  context.fillStyle = fillStyle;
  context.strokeStyle = strokeStyle;
  context.arc(x, y, r, 0, Math.PI * 2);
  context.stroke();
  if (fillStyle) context.fill();
  context.closePath();
}


makeCons(A, graf);












const drawWeigths = (matrix, obj) => {
  for (let i = 0; i < A.length; i++) {
    for (let j = i; j < A.length; j++) {
      if (matrix[i][j]) {
        const w = matrix[i][j];
        const fromX = obj[`vert${i + 1}`].coords[0];
        const fromY = obj[`vert${i + 1}`].coords[1];
        const toX = obj[`vert${j + 1}`].coords[0];
        const toY = obj[`vert${j + 1}`].coords[1];
        const { dx, dy } = singleAdditionalDots(fromX, fromY, toX, toY);
        let newX = (fromX + toX) / 2;
        let newY = (fromY + toY) / 2;
        newX -= dx;
        newY += dy;

        if (Math.abs(obj[`vert${i + 1}`].num - obj[`vert${j + 1}`].num) === 1 || Math.abs(obj[`vert${i + 1}`].num - obj[`vert${j + 1}`].num) === (Object.keys(obj).length - 1)) {
          ctx.beginPath();
          ctx.strokeStyle = 'black';
          ctx.fillStyle = 'white';
          ctx.arc((fromX + toX) / 2, (fromY + toY) / 2, 8, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.font = '12px Arial';
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          ctx.fillText(w, (fromX + toX) / 2, (fromY + toY) / 2);
        } else {
          ctx.beginPath();
          ctx.strokeStyle = 'black';
          ctx.fillStyle = 'white';
          ctx.arc(newX, newY, 8, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.font = '12px Arial';
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          ctx.fillText(w, newX, newY);
        }
      }
    }
  }
};









const START_VERT = 1;
const DijkObj = {};
const inf = Math.pow(10, 200);

for (let i = 1; i <= N; i++) {
  DijkObj[i] = {
    dist: i === START_VERT ? 0 : inf,
    mark: i === START_VERT ? 'P' : 'T',
    prev: undefined
  };
}

const GetAdjacentLenghts = (obj, curr) => {
  W[curr - 1].forEach((weight, v) => {
    if (obj[v + 1].mark === 'T' && weight && weight + obj[curr].dist < obj[v + 1].dist)  {
      obj[v + 1].dist = weight + obj[curr].dist;
      obj[v + 1].prev = curr;
    }
  });
};

const GetMinLength = obj => {
  const weights = [];
  for (const v in obj) {
    if (obj[v].mark === 'T') {
      const distObj = {};
      distObj.v = +v;
      distObj.dist = obj[v].dist;
      weights.push(distObj);
    }
  }
  const min = weights.reduce((a, b) => (a.dist < b.dist ? a : b));
  return min;
};

const IsDijkstraDone = obj => {
  let done = true;
  for (const v in obj) {
    if (obj[v].mark === 'T') done = false;
  }
  return done;
};


ctx.fillText('Pathes', 900, 100);
ctx.fillText('Length', 1000, 100);
let counter = 0;
const Dijkstra = (obj, current = START_VERT) => {
  counter++;
  GetAdjacentLenghts(obj, current);
  const min = GetMinLength(obj);
  obj[min.v].mark = 'P';
  const newWay = [];
  for (let i = min.v; i; i = obj[i].prev) {
    newWay.unshift(i);
  }
  ctx.beginPath;
  ctx.font = '22px Times new Roman';
  ctx.fillStyle = 'black';
  ctx.fillText(newWay, 900, 100 + (counter) * 25);
  ctx.fillText(newWay.length, 1000, 100 + (counter) * 25);
  console.log(min.v, newWay);
  return { obj, current: min.v };
};
let curr = START_VERT;

const halt = (object, currentV) => {
  if (!IsDijkstraDone(object)) {
    const { obj, current } = Dijkstra(object, currentV);
    curr = current;
    ctx.clearRect(0, 0, 800, 700);
    const newWay = [];
    for (let i = current; i; i = obj[i].prev) { //find way
      newWay.unshift(i);
    }
    single(graf);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    newWay.forEach((v, i, arr) => {
      if (arr[i + 1]) {
        const to = graf[`vert${v}`];
        const from = graf[`vert${arr[i + 1]}`];
        // ctx.moveTo(graf[`vert${v}`].coords[0], graf[`vert${v}`].coords[1]);
        // ctx.lineTo(graf[`vert${arr[i + 1]}`].coords[0], graf[`vert${arr[i + 1]}`].coords[1]);

        if (Math.abs(from.num - to.num) === 1 || Math.abs(from.num - to.num) === (Object.keys(graf).length - 1)) {
          ctx.beginPath();
          ctx.moveTo(from.coords[0], from.coords[1]);
          ctx.lineTo(to.coords[0], to.coords[1]);
          ctx.stroke();
        } else {
          ctx.beginPath();
          if (from.num < to.num) {
            const { dx, dy } = singleAdditionalDots(from.coords[0], from.coords[1], to.coords[0], to.coords[1]);
            let newX = (from.coords[0] + to.coords[0]) / 2;
            let newY = (from.coords[1] + to.coords[1]) / 2;
            newX -= dx;
            newY += dy;
            ctx.moveTo(from.coords[0], from.coords[1]);
            ctx.lineTo(newX, newY);
            ctx.lineTo(to.coords[0], to.coords[1]);
            ctx.stroke();
          } else {
            const { dx, dy } = singleAdditionalDots(to.coords[0], to.coords[1], from.coords[0], from.coords[1],);
            let newX = (from.coords[0] + to.coords[0]) / 2;
            let newY = (from.coords[1] + to.coords[1]) / 2;
            newX -= dx;
            newY += dy;
            ctx.moveTo(to.coords[0], to.coords[1]);
            ctx.lineTo(newX, newY);
            ctx.lineTo(from.coords[0], from.coords[1]);
            ctx.stroke();
          }
        }
      }
    });
    ctx.strokeStyle = 'black';
    for (const v in obj) {
      //draw vertics
      ctx.beginPath();
      ctx.lineWidth = 5;
      let color = obj[v].mark === 'T' ? 'red' : 'blue';
      if (+v === curr) color = 'green';
      drawCircle(ctx, graf[`vert${v}`].coords[0], graf[`vert${v}`].coords[1], r, 'gray', color);
      //draw text
      ctx.lineWidth = 1;
      ctx.font = '15px Arial';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.strokeText(`${v}(${obj[v].dist === inf ? '∞' : obj[v].dist})`, graf[`vert${v}`].coords[0], graf[`vert${v}`].coords[1]);
      ctx.fillText(`${v}(${obj[v].dist === inf ? '∞' : obj[v].dist})`, graf[`vert${v}`].coords[0], graf[`vert${v}`].coords[1]);
    }
    drawWeigths(W, graf);
  }
};


ctx.fillStyle = 'black';
ctx.font = '22px Times new Roman';
ctx.fillText('Adjacency matrix', 250, 800);
for (let i = 0; i < G.length; i++) {
  ctx.font = '24px Times new Roman';
  ctx.fillText(G[i], 250, 800 + (i + 1) * 25);
}

ctx.font = '22px Times new Roman';
ctx.fillText('Adjacency matrix of non-or', 600, 800);
for (let i = 0; i < A.length; i++) {
  ctx.font = '24px Times new Roman';
  ctx.fillText(A[i], 600, 800 + (i + 1) * 25);
}








drawLoops(loops, graf, 75, 100);
single(graf);
drawVertex(graf);
drawWeigths(W, graf);






