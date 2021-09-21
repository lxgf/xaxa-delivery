<?php

//http заголовки
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//подключаем файлы классов базы данных и ресторана
include_once '../config/database.php';
include_once '../objects/Restaurant.php';

//получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();

//создаем объект класса ресторана, передаем туда подключение к БД
$rest = new Restaurant($db);

//чтение ресторанов из БД
//запрашиваем товары
$stmt = $rest->read();
//считаем кол-во строк
$num = $stmt->rowCount();


//проверяем наличие строк
if ($num > 0) {

    //объявляем массив для результатов
    $rest_arr = array();
    $rest_arr["records"] = array();

    //перебираем все строки
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        //извлекаем строку
        extract($row);

        //записываем все данные из строки в массив-запись
        $rest_item = array(
            "id" => $id,
            "name" => $name,
            "img_link" => $img_link,
            "delivery_time" => $delivery_time,
            "delivery_price" => $delivery_price
        );

        //заносим запись в массив записей
        array_push($rest_arr["records"], $rest_item);
    }

    //возвращаем http-код 200 (ОК)
    http_response_code(200);

    //кодируем массив в JSON
    echo json_encode($rest_arr, JSON_UNESCAPED_UNICODE);
} else {

    //0 или меньше записей в БД, возвращаем код 404 (не найдено)
    http_response_code(404);

    //сообщаем пользователь что товаров нет в JSON
    echo json_encode(array("message" => "Товары не найдены."), JSON_UNESCAPED_UNICODE);
}

