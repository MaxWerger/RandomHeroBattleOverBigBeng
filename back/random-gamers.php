<?php
// подключаю класс (получение данных с api)
require_once 'core/ApiHeroes.php';


// получаю POST параметры игроков
$data = json_decode(file_get_contents("php://input"), true);

// создаю объект класса ApiHeroes
$apiHeroes = new ApiHeroes();

// массив для записи результата
$gamers = [];

// проход циклом по пользователям ($gamers)
foreach ($data as $gamer) {
    
    // добавляем в массив $gamers[] ассоциативный массив с игроками
    // и рандомными героями для каждого игрока
    $gamers[] = ['name' => $gamer, 'hero' => $apiHeroes->getRandomHero()];
}

// возвращаем результат в массив "" $gamers = []; ""
echo json_encode($gamers);