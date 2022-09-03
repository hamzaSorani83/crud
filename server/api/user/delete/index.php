<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

error_reporting(E_ALL);
ini_set("display_errors", 1);

include "../../DbConnect.php";
$objDb = new DbConnect();
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
  case "POST":
    $user = json_decode(file_get_contents('php://input'));
    
    $sql = 'DELETE FROM users WHERE id=:id';
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":id", $user->id);
    if($stmt->execute()) {
      $response = ['status' => 1, 'message' => 'Record deleted successfully'];
    } else {
      $response = ['status' => 0, 'message' => 'Failed to delete record'];
    }
    echo json_encode($response);
    break;
}