let maze = []; //Хранилище лабиринта
let path = []; //Хранилище пути
//Создание нового лабиринта
function makeMaze(r,c){
    let m =[]; //Новый лабиринт
    //Заполнение стенами
    for(let i=0;i<r;i++){
       let row = [];
       for (let j = 0; j < c; j++) {
        row.push(1); // Ставим стену
        }
        m.push(row); // Добавляем строку в лабиринт
    }
    
    function makePath(x,y){
        let dirs = shuffle([[0, -2], [0, 2], [-2, 0], [2, 0]]); // Случайные направления
        for (let i = 0; i < dirs.length; i++) {
            let dx = dirs[i][0]; // Изменение по x
            let dy = dirs[i][1]; // Изменение по y
            let nx = x + dx; // Новая координата x
            let ny = y + dy; // Новая координата y
            // Если в пределах поля и ещё не вырезано
            if (nx > 0 && ny > 0 && nx < r - 1 && ny < c - 1 && maze[nx][ny] === 1) {
                maze[nx - dx / 2][ny - dy / 2] = 0; // Убираем стену 
                maze[nx][ny] = 0; // Ставим путь
                makePaths(nx, ny);
            }
        }
    }
    maze[1][1] = 0; // Старт
    makePaths(1, 1); // Запуск создания проходов
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
    mazeDiv.innerHTML = ''; // Обнуляем старое, если оно было
    mazeDiv.style.gridTemplateColumns = `repeat(${cols}, 20px)`; //Сетка
    // Цикл для стилизации строк и колонок
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('div'); // Ячейка
            cell.classList.add('cell'); 
            if (maze[i][j] === 0) cell.classList.add('path'); // Путь
            if (i === 1 && j === 1) cell.classList.add('start'); // Старт
            if (i === rows - 2 && j === cols - 2) cell.classList.add('end'); // Крнец
            cell.id = `cell-${i}-${j}`; // Уникальный ID
            mazeDiv.appendChild(cell); // Добавляем в контейнер
        }
    }
}
