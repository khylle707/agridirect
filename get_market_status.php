<?php
header("Content-Type: application/json");
include 'db_config.php';

$p_id = $_GET['produce_id'];

$sql = "SELECT demand_level, stock_quantity FROM prices WHERE produce_id = $p_id";
$result = $conn->query($sql);

$status = [];
while($row = $result->fetch_assoc()) {
    $status[] = $row;
}

echo json_encode($status);
?>