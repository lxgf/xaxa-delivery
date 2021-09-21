<?php

class Product {

    //здесь будет хранится подключение, которое мы получаем методом getConnection()
    private $conn;

    //свойства объекта (столбцы таблицы)
    public $id;
    public $name;
    public $price;
    public $img_link;
    public $rest_id;


    //метод-конструктор нужен для получения подключения к БД
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //метод получения товаров ресторана
    function readFromRest() {

        //запрос на получение товаров одного ресторана
        $query = "SELECT * FROM products WHERE rest_id = ?";

        //подготавливаем запрос
        $stmt = $this->conn->prepare($query);

        //подставляем перменную вместо вопроса, подставить в нее можно только целое число
        $stmt->bindParam(1, $this->rest_id, PDO::PARAM_INT);

        //выполняем запрос
        $stmt->execute();

        return $stmt;
    }
}