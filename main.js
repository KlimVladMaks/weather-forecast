/* // API-ключ для получения прогноза погоды
const apiKey = "a94e6b40c8304ad09cf214421231005"

// Стандартный запрос погоды с использованием API-ключа
const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`

// Отправляем запрос и обрабатываем ответ (response)
fetch(query).then((response) => {

    // Возвращаем ответ, преобразуя его в формат JSON
    return response.json();

// Обрабатываем полученные в формате JSON данные (data)
}).then((data) => {

    // Выводим данные в консоль
    console.log(data);
}) */

// Получаем форму из HTML-документа
const form = document.querySelector("#form");

// Получаем поле ввода, используемое для ввода названия города
const input = document.querySelector("#inputCity");

// Добавляем к форме функцию, которая будет срабатывать при отправке формы
// (e - это событие, возникшее при отправке формы)
form.onsubmit = function(e) {

    // Отменяем событие по-умолчанию при отправке формы
    e.preventDefault();

    // Извлекаем название города из поля ввода, удаляя начальные и конечные пробелы
    city = input.value.trim();
}



