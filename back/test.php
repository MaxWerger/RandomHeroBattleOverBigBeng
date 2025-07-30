<?php
// $peremenaya = [["id" => 1, "name" => 'Anti-Mage'], ["id" => 2, "name" => 'Axe'], ["id" => 3, "name" => 'Дима']];

$localizationAttr = ["agi" => "Ловкость", "str" => "Сила", "int" => "Интеллект", "all" => "Универсал"];





// Читаем данные
$jsonData = file_get_contents('https://api.opendota.com/api/heroes');

// Переделываем JSON в ассоциативный массив
$data = json_decode($jsonData, true);

// Ответ
$heroes = [];
foreach ($data as $hero) {
    $heroes[] = [
        "id" => $hero["id"],
        "name" => $hero["localized_name"],
        "attribut" => $localizationAttr[$hero["primary_attr"]]??"Ошибка",
        "roles" => $hero["roles"]
    ];
}
echo json_encode($heroes);


