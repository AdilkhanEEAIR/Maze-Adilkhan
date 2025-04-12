let maze = [];
let path = []; 
function start() {
    let rows = parseInt(document.getElementById('rows').value);
    let cols = parseInt(document.getElementById('cols').value);
    if (rows % 2 === 0) rows++;
    if (cols % 2 === 0) cols++;
    maze = makeMaze(rows, cols); 
    drawMaze(rows, cols);
    path = [];                
    go(1, 1, rows, cols); 
    show(0);            
}

function makeMaze(r,c){
    let m =[];
    //Заполнение стенами
    for(let i=0;i<r;i++){
       let row = [];
       for (let j = 0; j < c; j++) {
        row.push(1); // Ставим стену
        }
        m.push(row); // Добавляем строку в лабиринт
    }
    maze = m;

    //Рекурсия для создания лабиринта
    function makePaths(x,y){
        let dirs = shuffle([[0, -2], [0, 2], [-2, 0], [2, 0]]); // Случайные направления
        for (let i = 0; i < dirs.length; i++) {
            let dx = dirs[i][0]; 
            let dy = dirs[i][1]; 
            let nx = x + dx; // Новая координата x
            let ny = y + dy; // Новая координата y
            if (nx > 0 && ny > 0 && nx < r - 1 && ny < c - 1 && maze[nx][ny] === 1) {
                maze[nx - dx / 2][ny - dy / 2] = 0; // Убираем стену 
                maze[nx][ny] = 0; // Ставим путь
                makePaths(nx, ny); // ЗДесь сама рекурсия
            }
        }
    }
    maze[1][1] = 0; // Старт
    makePaths(1, 1); 
    maze[r - 2][c - 2] = 0; // Финиш
    return maze; 
}

//Функция для перемешки направлений массива
function shuffle(array) {
    for(let i = array.length - 1; i>0; i--){
        let j = Math.floor(Math.random() * (i + 1)); // Случайный индекс
        let tmp = array[i]; // Меняем местами
        array[i] = array[j];
        array[j] = tmp;
    }
    return array;
}

// Функция рисования лабиринта
function drawMaze(rows, cols) {
    let mazeDiv = document.getElementById('maze'); 
    mazeDiv.innerHTML = ''; 
    mazeDiv.style.gridTemplateColumns = `repeat(${cols}, 20px)`; 
    // Цикл для стилизации строк и колонок
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('div'); // Ячейка
            cell.classList.add('cell'); 
            if (maze[i][j] === 0) cell.classList.add('path'); 
            if (i === 1 && j === 1) cell.classList.add('start'); 
            if (i === rows - 2 && j === cols - 2) cell.classList.add('end'); 
            cell.id = `cell-${i}-${j}`; 
            mazeDiv.appendChild(cell); 
        }
    }
}

// Функция самой рекурсии для поиска правильного выхода
function go(x, y, rows, cols, visited = {}) {
    if (x < 0 || y < 0 || x >= rows || y >= cols) return false; // Чтобы не выйти за пределы
    if (maze[x][y] === 1) return false; // стена
    let key = `${x},${y}`; // ключ для каждой клетки
    if (visited[key]) return false; 
    visited[key] = true; 
    path.push([x, y]); // Добавляем в путь
    if (x === rows - 2 && y === cols - 2) return true; // Финиш
    // Пробуем двигаться по сторонам
    let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (let i = 0; i < dirs.length; i++) {
        let dx = dirs[i][0];
        let dy = dirs[i][1];
        if (go(x + dx, y + dy, rows, cols, visited)) return true; // Рекурсивное движение
    }
    path.pop(); // Если не получилось, то обнуляем путь
    return false;
}
// Функция для анимирования движения
function show(i) {
    if (i >= path.length) {
        alert("Лабиринт пройден!"); 
        return;
    }
    let [x, y] = path[i]; // Координаты
    let cell = document.getElementById(`cell-${x}-${y}`); 
    if (cell) {
        cell.classList.add('player'); 
        setTimeout(() => {
            cell.classList.remove('player'); 
            show(i + 1); 
        }, 100);
    }
}