// Получаем хэдер сайта
const header = document.querySelector(".header");

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
    let city = input.value.trim();

    // API-ключ для получения прогноза погоды
    const apiKey = "a94e6b40c8304ad09cf214421231005"

    // Стандартный запрос погоды с использованием API-ключа для заданного города
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

    // Отправляем запрос и обрабатываем ответ (response)
    fetch(url).then((response) => {

        // Возвращаем ответ, преобразуя его в формат JSON
        return response.json();

    // Обрабатываем полученные в формате JSON данные (data)
    }).then((data) => {

        // Выводим в консоль полученные данные
        console.log(data);

        // Если в данных указана ошибка
        if (data.error) {

            // Находим и удаляем предыдущую карточку с погодой (если она не равна null)
            const prevCard = document.querySelector(".card");
            if (prevCard) prevCard.remove();

            // Формируем карточку с текстом ошибки
            const html = `<div class="card">${data.error.message}</div>`

            // Вставляем карточку с ошибкой после хэдера
            header.insertAdjacentHTML("afterend", html);
        }

        // Иначе
        else {

            // Находим и удаляем предыдущую карточку с погодой (если она не равна null)
            const prevCard = document.querySelector(".card");
            if (prevCard) prevCard.remove();

            // HTML-код карточки с погодой, заполненной в соответствии с полученными данными
            const html = `
            <div class="card">
                <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
                <div class="card-weather">
                    <div class="card-value">${data.current.temp_c}<sup>°C</sup></div>
                    <img class="card-img" src="./img/example.png" alt="Weather">
                </div>
                <div class="card-description">${data.current.condition.text}</div>
            </div>
            `;

            // Вставляем созданный HTML-код после хэдера
            header.insertAdjacentHTML("afterend", html);
        }
    })
}





