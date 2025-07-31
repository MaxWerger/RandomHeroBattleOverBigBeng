<?php

// подключаю класс (получение данных с api)
require_once 'core/ApiHeroes.php';

// создаю объект класса
$apiHeroes = new ApiHeroes();

// вызываю метод getHeroes() для получения героев
echo json_encode($apiHeroes ->getHeroes());


