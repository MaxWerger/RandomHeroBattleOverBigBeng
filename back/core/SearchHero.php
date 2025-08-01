<?php
require_once 'ApiHeroes.php';


class SearchHero

{
    function searchHero()
    {
        $apiHeroes = new ApiHeroes();
        $heroes = $apiHeroes->getHeroes();

        $nameCount = [count($heroes)];

        return json_encode($nameCount);
    }
}

$search = new SearchHero();
echo $search->searchHero();