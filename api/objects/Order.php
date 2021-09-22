<?php

class Product {

    //здесь будет хранится подключение, которое мы получаем методом getConnection()
    private $conn;

    //свойства объекта (столбцы таблицы)
    public $id;
    public $adress;
    public $price;
    public $img_link;
    public $rest_id;


    //метод-конструктор нужен для получения подключения к БД
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //метод создания заказа
    
}