<?php
header("Content-Type: application/json"); 
include 'db_config.php';

$sql = "SELECT id, name, type FROM produce";
$result = $conn->query($sql);

$produce = [];
while($row = $result->fetch_assoc()) {
    $produce[] = $row;
}

echo json_encode($produce); 