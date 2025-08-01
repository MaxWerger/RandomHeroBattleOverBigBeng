

// получаем список героев
sendReqest('/back/get-all-heroes.php', data => {

    // Обработка полученных данных
    console.log("Данные получены:", data);

    // Находим в HTML контейнер для вывода результатов
    const container = document.querySelector('.result');
    // Очищаем контейнер
    container.innerHTML = '';

    // создаем элемент для каждого героя
    data.forEach(hero => {
        const heroElement = document.createElement('div');

        // формируем HTML структуру элемента героя
        heroElement.innerHTML = `<div>${hero.name}</div><div class="hero-attr">${hero.attribute}</div><div>${hero.roles}</div>`;
        // Добавляем CSS-класс элементу
        heroElement.classList.add('hero-item');
        // Добавляем элемент в контейнер
        container.appendChild(heroElement);
    });
})


//================================================================================================================

// Хранилище данных (внешняя область видимости для того, чтобы input видел данные)
let heroesData = []; 
// Получаю данные с сервера
sendReqest('/back/get-all-heroes.php', data => {
    console.log('Данные получены:', data);

    // Сохраняю данные во внешнюю область видимости
    heroesData = data; 
});

// Нахожу input для запроса по id
const inputNumber = document.querySelector('.inputNumber');
// Нахожу div с результатом
const resultContainer = document.querySelector('.inputResult');

// Обработчик ввода
inputNumber.addEventListener('input', function() {

    // this - ссылается на input, value - возвращает значение input
    const searchId = this.value;
    
    // Очищаю контейнер при пустом вводе (!searchId инвертирует значение массива из false в true)
    if (!searchId) {
        resultContainer.innerHTML = '';
        return;
    }
    
    // Ищу героя по id
    const foundHero = heroesData.find(hero => hero.id == searchId);
    
    // Обновляю контейнер
    resultContainer.innerHTML = `${foundHero.name}`;
});


//================================================================================================================


// счетчик количества героев в API
sendReqest('back/core/SearchHero.php', data => {
    // Обработка полученных данных
    console.log("Данные получены:", data);
    // Находим в HTML контейнер для вывода результатов
    const container = document.querySelector('.searchHeroResult');
    // Очищаем контейнер
    container.innerHTML = '';

    // Создаем элемент для отображения количества
    const countElement = document.createElement('div');
    countElement.textContent = `Всего героев: ${data[0]}`;
    // вставка элемента в HTML
    container.appendChild(countElement);
});

//================================================================================================================

// генерируем случайных игроков 
sendReqest('/back/random-gamers.php', data => {

    // Обработка полученных данных
    console.log("Данные получены:", data);

    // Находим в HTML контейнер для вывода результатов
    const container = document.querySelector('.session');

    // Очищаем контейнер
    container.innerHTML = '';

    // создаем элемент для каждого игрока
    data.forEach(hero => {
        const heroElement = document.createElement('div');
        heroElement.textContent = `${hero.name} ${hero.hero.name}`;

        // добавлен класс для HTML элемента
        heroElement.classList.add('hero-item');

        // вставка элемента в HTML 
        container.appendChild(heroElement);
    });
}, {
    // Настройки POST-запроса
    method: "POST",

    // Указываем тип отправляемых данных
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },

    // Отправляем JSON-строку с массивом имен
    body: JSON.stringify(['Макс', 'Дима', 'Магамеджан'])
})



// функция отправки запроса
function sendReqest(url, callback, options) {
    fetch(url, options)

        //обработка запроса
        .then(response => {

            // проверка состояния ответа (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // формат возвращаемого ответа
            return response.json();
        })

        // обработка ответа
        .then(callback)

        // Выводит сообщение об ошибке
        .catch(error => {
            console.error('Ошибка:', error);
        });
}
