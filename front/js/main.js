fetch('/back/test.php')
    .then(response => {
        // проверка состояния ответа (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // преобразовать ответ из json в обьект js
        return response.json();
    })
    .then(data => {
        // Обработка полученных данных
        console.log("Данные получены:", data);
        const container = document.querySelector('.result');
        container.innerHTML = ''; // Очищаем контейнер

        data.forEach(hero => {
            const heroElement = document.createElement('div');
            heroElement.textContent = `${hero.id}: ${hero.name}`;
            heroElement.classList.add('hero-item');
            container.appendChild(heroElement);
        });
    })


    .catch(error => {
        // Выводит сообщение об ошибке
        console.error('Ошибка:', error);
    });


const evtSource = new EventSource("/back/session.php");
evtSource.onmessage = function (event) {
    document.querySelector(".session").textContent = event.data;
};