const gridContainer = document.createElement('div');
const gridSize = 100;
let defaultColor = 'black';
let isDragging = false;

document.body.appendChild(gridContainer);
gridContainer.style.display = 'grid';
gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
gridContainer.style.height = '100vh';
gridContainer.style.width = '100vw';
gridContainer.style.position = 'relative';

const createGrid = () => {
    gridContainer.innerHTML = ''; // Limpia la cuadrícula existente
    const cellSize = window.innerWidth / gridSize; // Calcula el tamaño dinámico de las celdas
    const rows = Math.floor(window.innerHeight / cellSize); // Calcula el número de filas que caben en la ventana

    for (let i = 0; i < gridSize * rows; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.border = '1px solid #ccc';
        cell.style.boxSizing = 'border-box';
        cell.style.height = `${cellSize}px`;
        cell.style.backgroundColor = 'white';
        
        // Modificación aquí: Verificar que no sea click derecho (button === 2)
        cell.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Solo para botón izquierdo (0)
                isDragging = true;
                toggleCell(cell);
            }
        });
        
        cell.addEventListener('mouseover', () => {
            if (isDragging) {
                toggleCell(cell);
            }
        });
        
        gridContainer.appendChild(cell);
    }
};

// Recalibrar la cuadrícula al cambiar el tamaño de la ventana
window.addEventListener('resize', createGrid);

createGrid();

const toggleCell = (cell) => {
    cell.style.backgroundColor = cell.style.backgroundColor === 'white' ? defaultColor : 'white';
};

// Menú contextual
const contextMenu = document.createElement('div');
contextMenu.id = 'context-menu';
contextMenu.style.display = 'none';
contextMenu.style.position = 'absolute';
contextMenu.style.backgroundColor = 'white';
contextMenu.style.border = '1px solid #ccc';
contextMenu.style.padding = '10px';
contextMenu.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
contextMenu.classList.add('hidden');

// Añadir opciones de color
const colors = ['black', 'red', 'blue', 'green', 'yellow'];
colors.forEach(color => {
    const colorOption = document.createElement('div');
    colorOption.classList.add('color-option');
    colorOption.style.width = '30px';
    colorOption.style.height = '30px';
    colorOption.style.backgroundColor = color;
    colorOption.style.margin = '5px';
    colorOption.style.cursor = 'pointer';
    contextMenu.appendChild(colorOption);
});

document.body.appendChild(contextMenu);

// Mostrar el menú contextual
document.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Evita el menú contextual predeterminado del navegador
    if (e.target.classList.contains('cell')) {
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.display = 'block';
        setTimeout(() => contextMenu.classList.remove('hidden'), 10);
    }
});

// Ocultar el menú contextual
document.addEventListener('click', (e) => {
    // Oculta el menú contextual si está visible
    if (!contextMenu.classList.contains('hidden')) {
        contextMenu.classList.add('hidden');
        setTimeout(() => (contextMenu.style.display = 'none'), 200);
    }
});

// Cambiar el color por defecto
contextMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-option')) {
        defaultColor = e.target.style.backgroundColor;
        contextMenu.classList.add('hidden');
        setTimeout(() => (contextMenu.style.display = 'none'), 200);
    }
});

// Ocultar menú contextual cuando el mouse sale de él
contextMenu.addEventListener('mouseleave', () => {
    contextMenu.classList.add('hidden');
    setTimeout(() => (contextMenu.style.display = 'none'), 200);
});

// Finalizar el modo de arrastre
document.addEventListener('mouseup', () => {
    isDragging = false;
});