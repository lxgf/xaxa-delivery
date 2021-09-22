<?php

class Product {

    //здесь будет хранится подключение, которое мы получаем методом getConnection()
    private $conn;

    //свойства объекта (столбцы таблицы)
    public $rest_name;
    public $delivery_time;
    public $delivery_price;
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
        $query = "SELECT rests.name AS rest_name, rests.delivery_time, rests.delivery_price, 
                    products.id, products.name, products.price, products.img_link, products.rest_id 
                    FROM products 
                    INNER JOIN rests ON products.rest_id=rests.id 
                    WHERE products.rest_id=?";

        //подготавливаем запрос
        $stmt = $this->conn->prepare($query);

        //подставляем перменную вместо вопроса, подставить в нее можно только целое число
        $stmt->bindParam(1, $this->rest_id, PDO::PARAM_INT);

        //выполняем запрос
        $stmt->execute();

        return $stmt;
    }
}