<?php

class Database {

    //данные для подключения к базе данных
    private $host = "localhost";
    private $db_name = "xaxadelivery";
    private $username = "root";
    private $password = "test";
    public $conn;


    //метод для того чтобы создать подключение к базе данных
    public function getConnection() {

        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $e) {
            echo "Connection error: " . $e->getMessage();
        }

        return $this->conn;
    }
}