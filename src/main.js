"use strict";

const screen = document.getElementById("screen");
const xmlns = "http://www.w3.org/2000/svg";
const xlinkns = "http://www.w3.org/1999/xlink";

window.addEventListener(
  "pointermove",
  (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    rad = 0;
  },
  false
);

const resize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
};

let width, height;
window.addEventListener("resize", () => resize(), false);
resize();

const prepend = (use, i) => {
  const elem = document.createElementNS(xmlns, "use");
  elems[i].use = elem;
  console.log(use);
  elem.setAttributeNS(xlinkns, "xlink:href", "#" + use);
  screen.prepend(elem);
};

const N = 25;

const elems = [];
for (let i = 0; i < N; i++) elems[i] = { use: null, x: width / 2, y: 0 };
const pointer = { x: width / 2, y: height / 2 };
const radm = Math.min(pointer.x, pointer.y) - 20;
let frm = Math.random();
let rad = 0;

for (let i = 1; i < N; i++) {
  if (i === 1) prepend("Head", i);
  else if (i % 8 == 0) prepend("Fins", i);
  else prepend("Thorn", i);
}

const run = () => {
  /**
   * Llamada Recursiva:
   * requestAnimationFrame(run); asegura que la función run se ejecute en el siguiente frame de animación, creando un bucle continuo.
   */
  requestAnimationFrame(run);
  // obtiene el primer elemento del array elems.
  let e = elems[0];
  /**
   * ax y ay son desplazamientos calculados usando funciones trigonométricas (Math.cos y Math.sin) y están escalados por rad, width, y height. Estos valores determinan cómo se moverá el primer elemento en el espacio.
   * e.x y e.y se actualizan suavemente hacia ax + pointer.x y ay + pointer.y respectivamente, usando un factor de suavizado de 10.
   */
  const ax = (Math.cos(3 * frm) * rad * width) / height;
  const ay = (Math.sin(4 * frm) * rad * height) / width;
  e.x += (ax + pointer.x - e.x) / 10;
  e.y += (ay + pointer.y - e.y) / 10;
  /**
   * Un bucle for recorre los elementos desde el segundo hasta el último (i = 1 a N-1).
   * Para cada elemento e, se calcula el ángulo a hacia el elemento anterior ep usando Math.atan2.
   * e.x y e.y se ajustan para seguir al elemento anterior ep, con un desplazamiento adicional basado en el ángulo a y el índice i.
   * s es un factor de escala que disminuye con el índice i.
   */
  for (let i = 1; i < N; i++) {
    let e = elems[i];
    let ep = elems[i - 1];
    const a = Math.atan2(e.y - ep.y, e.x - ep.x);
    e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
    e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;
    const s = (162 + 4 * (1 - i)) / 50;
    /**
     * e.use.setAttributeNS aplica una transformación SVG al elemento e, que incluye una traslación al punto medio entre e y ep, una rotación basada en el ángulo a, y una escala basada en s.
     */
    e.use.setAttributeNS(
      null,
      "transform",
      `translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${
        (180 / Math.PI) * a
      }) translate(${0},${0}) scale(${s},${s})`
    );
  }
  /**
   * Si rad es menor que radm, se incrementa en 1.
   * frm se incrementa ligeramente (0.003) para animar los cálculos trigonométricos en los siguientes frames.
   */
  if (rad < radm) rad++;
  frm += 0.003;
  /**
   * Si rad es mayor que 60, pointer.x y pointer.y se ajustan suavemente hacia el centro de la pantalla (width / 2, height / 2), usando un factor de suavizado de 0.05.
   */
  if (rad > 60) {
    pointer.x += (width / 2 - pointer.x) * 0.05;
    pointer.y += (height / 2 - pointer.y) * 0.05;
  }
};

run();
