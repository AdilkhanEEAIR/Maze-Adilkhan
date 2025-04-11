let maze = []; //Хранилище лабиринта
let path = []; //Хранилище пути
//Создание нового лабиринта
function makeMaze(r,c){
    let m =[]; //Новый лабиринт
    for(let i=0;i<r;i++){
       let row = [];
       for (let j = 0; j < c; j++) {
        row.push(1); // Ставим стену
        }
        m.push(row); // Добавляем строку в лабиринт
    }
    
}