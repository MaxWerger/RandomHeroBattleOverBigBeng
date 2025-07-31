<?php
require_once("models/HeroModel.php");
class ApiHeroes
{
    /// кеш для json с героями
    private $apiHeroes;

    /// перевод атрибутов
    private $localizationAttr = ["agi" => "Ловкость", "str" => "Сила", "int" => "Интеллект", "all" => "Универсал"];

    

    /**
     * отправляет запрос к API
     * @return array возвращает JSON объект
     */
    private function getHeroesFromOrderApi()
    {
        if ($this->apiHeroes !== null) {
            return $this->apiHeroes;
        }

        $jsonData = file_get_contents('https://api.opendota.com/api/heroes');
        $json = json_decode($jsonData, true);
        $this->apiHeroes = $json;
        return $json;
    }


    /**
     * получает и оборачивает JSON в модель
     * @return HeroModel[] возвращает массив моделей героев
     */
    public function getHeroes()
    {
        $heroes = $this->getHeroesFromOrderApi();
        $result = [];
        foreach ($heroes as $hero) {
            $result[] = new HeroModel(
                $hero["id"],
                $hero["localized_name"],
                $this->localizationAttr[$hero["primary_attr"]] ?? "Ошибка",
                $hero["roles"]
            );
        }
        return $result;
    }


    /**
     * получает случайного героя из сторонней API
     * @return HeroModel возвращает модель героя
     */
    public function getRandomHero()
    {
        $heroes = $this->getHeroesFromOrderApi();
        $randIndex = rand(0, count($heroes) - 1);
        $randHero = $heroes[$randIndex];
        return new HeroModel(
            $randHero["id"],
            $randHero["localized_name"],
            $this->localizationAttr[$randHero["primary_attr"]] ?? "Ошибка",
            $randHero["roles"]
        );
    }
}
