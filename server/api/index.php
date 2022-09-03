<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: *");
// header("Access-Control-Allow-Methods: *");

// error_reporting(E_ALL);
// ini_set("display_errors", 1);

// include "../DbConnect.php";
// $objDb = new DbConnect();
// $conn = $objDb->connect();

// $method = $_SERVER['REQUEST_METHOD'];

// switch($method) {
//   case "GET":
//     $sql = 'SELECT * FROM users WHERE id = :id';
//     $id = $_GET['id'];
//     $stmt = $conn->prepare($sql);
//     $stmt->bindParam(':id', $id);
//     $stmt->execute();
//     $user = $stmt->fetch(PDO::FETCH_ASSOC);
//     echo json_encode($user);
//     break;
//   case "PUT":
//     $user = json_decode(file_get_contents('php://input'));
//     $sql = 'UPDATE users SET name= :name, email= :email, mobile= :mobile, updated_at= :updated_at WHERE id= :id';
//     $stmt = $conn->prepare($sql);
//     $updated_at = date('Y-m-d');
//     $stmt->bindParam(":id", $user->id);
//     $stmt->bindParam(':name', $user->name);
//     $stmt->bindParam(':email', $user->email);
//     $stmt->bindParam(':mobile', $user->mobile);
//     $stmt->bindParam(':updated_at', $updated_at);
//     if($stmt->execute()) {
//       $response = ['status' => 1, 'message' => 'Record updated successfully'];
//     } else {
//       $response = ['status' => 0, 'message' => 'Failed to update record'];
//     }
//     echo json_encode($response);
//     break;
//     case "POST": 
//       $user = json_decode(file_get_contents('php://input'));
//       $sql = 'INSERT INTO users(id, name, email, mobile, created_at) VALUES(null, :name, :email, :mobile, :created_at)';
//       $stmt = $conn->prepare($sql);
//       $created_at = date('Y-m-d');
//       $stmt->bindParam(':name', $user->name);
//       $stmt->bindParam(':email', $user->email);
//       $stmt->bindParam(':mobile', $user->mobile);
//       $stmt->bindParam(':created_at', $created_at);
//       if($stmt->execute()) {
//         $response = ['status' => 1, 'message' => 'Record created successfully'];
//       } else {
//         $response = ['status' => 0, 'message' => 'Failed to create record'];
//       }
//       echo json_encode($response);
//       break;
// }