<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

error_reporting(E_ALL);
ini_set("display_errors", 1);

include "../DbConnect.php";
$objDb = new DbConnect();
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
  case "GET":
    $last_id = $_GET['page'] ? intval($_GET['page']) : 0;
    $sql = 'SELECT * FROM users limit '.  $last_id+1 . ' offset ' . 0;
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
    break;
}