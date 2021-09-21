<?php

class Restaurant {

    //здесь будет хранится подключение, которое мы получаем методом getConnection()
    private $conn;

    //свойства объекта (столбцы таблицы)
    public $id;
    public $name;
    public $img_link;
    public $delivery_time;
    public $delivery_price;


    //метод-конструктор нужен для получения подключения к БД
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //метод получения ресторанов
    function read() {

        //запрос на получение всех ресторанов
        $query = "SELECT * FROM rests";

        //подготавливаем запрос
        $stmt = $this->conn->prepare($query);

        //выполняем запрос
        $stmt->execute();

        return $stmt;
    }
}