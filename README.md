# Proyecto: Follow Dragon

Este proyecto es una aplicación web interactiva que simula el movimiento de un dragón siguiendo el puntero del usuario en la pantalla. Utiliza SVG para representar gráficamente las partes del dragón y JavaScript para manejar la lógica de movimiento y animación.

## Estructura del Proyecto

- **src/main.js**: Contiene la lógica principal del proyecto, incluyendo la inicialización de elementos SVG y la animación del dragón.
- **src/index.html**: Define la estructura HTML de la página, incluyendo las definiciones SVG para las partes del dragón.
- **src/styles.css**: Archivo de estilos para la presentación visual de la aplicación.

## Instalación

1. Clona el repositorio en tu máquina local.

2. Navega al directorio del proyecto.

## Uso

1. Abre el archivo index.html en tu navegador web.

2. Mueve el puntero del ratón por la pantalla para ver cómo el dragón sigue el movimiento.

## Detalles Técnicos

- JavaScript: Utiliza eventos de pointermove para capturar la posición del puntero y actualizar la posición del dragón.
- SVG: Se utilizan elementos <use> para replicar partes del dragón, como la cabeza, las aletas y las espinas.
- Animación: La función run se ejecuta en un bucle de animación utilizando requestAnimationFrame para actualizar continuamente la posición y transformación de los elementos SVG.

## Créditos

Referencia: https://github.com/TheTvink001/Interactive-Dragon

## Test

Puedes probarlo desde este enlace: https://interactivedragon.netlify.app/
