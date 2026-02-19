<?php
header("Content-Type: application/json");
include 'db_config.php';

$m_id = $_GET['market_id'];

$sql = "SELECT location_name, base_logistical_cost FROM markets WHERE id = $m_id";
$result = $conn->query($sql);
$data = $result->fetch_assoc();

echo json_encode($data); 
?>