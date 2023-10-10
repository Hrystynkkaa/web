// Функція для обчислення периметру
function calculatePerimeter(length, width) {
    return 2 * (length + width);
}

// Функція для обчислення площі
function calculateArea(length, width) {
    return length * width;
}

// Функція для обчислення довжини діагоналі
function calculateDiagonal(length, width) {
    return Math.sqrt(Math.pow(length, 2) + Math.pow(width, 2));
}

// Отримуємо елементи форми та встановлюємо обробники подій
const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
const perimeterOutput = document.getElementById("perimeter");
const areaOutput = document.getElementById("area");
const diagonalOutput = document.getElementById("diagonal");

lengthInput.addEventListener("input", updateResults);
widthInput.addEventListener("input", updateResults);

function updateResults() {
    const length = parseFloat(lengthInput.value);
    const width = parseFloat(widthInput.value);

    if (!isNaN(length) && !isNaN(width)) {
        perimeterOutput.textContent = calculatePerimeter(length, width);
        areaOutput.textContent = calculateArea(length, width);
        diagonalOutput.textContent = calculateDiagonal(length, width);
    } else {
        perimeterOutput.textContent = "";
        areaOutput.textContent = "";
        diagonalOutput.textContent = "";
    }
}
