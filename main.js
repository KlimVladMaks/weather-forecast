// Получаем хэдер сайта
const header = document.querySelector(".header");

// Получаем форму из HTML-документа
const form = document.querySelector("#form");

// Получаем поле ввода, используемое для ввода названия города
const input = document.querySelector("#inputCity");

// Функция для удаления текущей карточки на странице
function removeCard() {

    // Находим и удаляем предыдущую карточку с погодой (если она не равна null)
    const prevCard = document.querySelector(".card");
    if (prevCard) prevCard.remove();
}

// Функция для отображения карточки с текстом ошибки
function showError(errorMessage) {

    // Формируем карточку с текстом ошибки
    const html = `<div class="card">${errorMessage}</div>`

    // Вставляем карточку с ошибкой после хэдера
    header.insertAdjacentHTML("afterend", html);
}

// Функция для отображения карточки с погодой
// (Функция получает на вход объект с данными и погоде и извлекает из него необходимые данные)
function showCard({name, country, temp, condition}) {

    // HTML-код карточки с погодой, заполненной в соответствии с полученными данными
    const html = `
    <div class="card">
        <h2 class="card-city">${name} <span>${country}</span></h2>
        <div class="card-weather">
            <div class="card-value">${temp}<sup>°C</sup></div>
            <img class="card-img" src="./img/example.png" alt="Weather">
        </div>
        <div class="card-description">${condition}</div>
    </div>
    `;

    // Вставляем созданный HTML-код после хэдера
    header.insertAdjacentHTML("afterend", html);
}

// Асинхронная функция для получения погоды для заданного города
async function getWeather(city) {

    // API-ключ для получения прогноза погоды
    const apiKey = "a94e6b40c8304ad09cf214421231005"

    // Стандартный запрос погоды с использованием API-ключа для заданного города
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    // Отправляем запрос и получаем ответ
    const response = await fetch(url);

    // Преобразуем ответ в формат JSON
    const data = await response.json();

    // Выводим в консоль полученные данные
    console.log(data);

    // Возвращаем полученные данные
    return data;
}

// Добавляем к форме функцию, которая будет срабатывать при отправке формы
// (e - это событие, возникшее при отправке формы)
form.onsubmit = async function(e) {

    // Отменяем событие по-умолчанию при отправке формы
    e.preventDefault();

    // Извлекаем название города из поля ввода, удаляя начальные и конечные пробелы
    let city = input.value.trim();

    // Получаем погодные данные для заданного города
    const data = await getWeather(city);

    // Если в данных указана ошибка
    if (data.error) {

        // Удаляем предыдущую карточку
        removeCard();

        // Отображаем карточку с сообщением об ошибке
        showError(data.error.message);
    }

    // Иначе
    else {

        // Удаляем предыдущую карточку
        removeCard();

        // Создаём объект для хранения данных о погоде
        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.text
        }

        // Отображаем карточку с погодой, передавая ей данные о погоде
        showCard(weatherData);
    }
}





