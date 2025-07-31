

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
