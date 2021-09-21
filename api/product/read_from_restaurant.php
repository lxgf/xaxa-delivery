<?php

//http загаловки
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

//подключаем файлы классов базы данных и ресторана
include_once '../config/database.php';
include_once '../objects/Product.php';

//получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

//создаем объект класса ресторана, передаем туда подключение к БД
$product = new Product($db);

//устанавливаем id продукту из адрессной строки (если оно есть)
$product->rest_id = isset($_GET['rest_id']) ? $_GET['rest_id'] : http_response_code(404);

//чтение товаров из БД
//запрашиваем товары
$stmt = $product->readFromRest();

$num = $stmt->rowCount();

//проверяем наличие строк
if ($num > 0) {

    //объявляем массив для результатов
    $product_arr = array();
    $product_arr["records"] = array();

    //перебираем все строки
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        //извлекаем строку
        extract($row);

        //записываем все данные из строки в массив-запись
        $product_item = array(
            "id" => $id,
            "name" => $name,
            "price" => $price,
            "img_link" => $img_link,
            "rest_id" => $rest_id
        );

        //заносим запись в массив записей
        array_push($product_arr["records"], $product_item);
    }

    //возвращаем http-код 200 (ОК)
    http_response_code(200);

    //кодируем массив в JSON
    echo json_encode($product_arr, JSON_UNESCAPED_UNICODE);
} else {

    //0 или меньше записей в БД, возвращаем код 404 (не найдено)
    http_response_code(404);

    //сообщаем пользователь что товаров нет в JSON
    echo json_encode(array("message" => "Товары не найдены."), JSON_UNESCAPED_UNICODE);
}
