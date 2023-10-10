const calculateButton = document.getElementById("calculate-button");
const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");
const dayInput = document.getElementById("day");
const resultParagraph = document.getElementById("result");

calculateButton.addEventListener("click", calculateDayOfWeek);

function calculateDayOfWeek() {
    const year = parseInt(yearInput.value);
    const month = parseInt(monthInput.value);
    const day = parseInt(dayInput.value);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        resultParagraph.textContent = "Будь ласка, введіть коректну дату.";
        return;
    }

    const a = Math.floor((14 - month) / 12);
    const y = year - a;
    const m = month + 12 * a - 2;
    const dayOfWeekIndex = (day + y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + Math.floor((31 * m) / 12)) % 7;

    const daysOfWeek = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];

    resultParagraph.textContent = `Ваш день народження випав на ${dayOfWeek}.`;
}
