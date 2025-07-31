<?php

class HeroModel{
    public int $id;
    public string $name;
    public string $attribute;
    public array $roles;

    public function __construct(int $id, string $name, string $attribute, array $roles){
        $this->id = $id;
        $this->name = $name;
        $this->attribute = $attribute;
        $this->roles = $roles;
    }
}

