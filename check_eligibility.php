<?php
header("Content-Type: application/json");
include 'db_config.php';

$f_id = $_GET['farmer_id'];

// Check if farmer exists and is eligible (1 = true)
$sql = "SELECT id as farmer_id, CASE WHEN is_eligible = 1 THEN 'true' ELSE 'false' END as is_eligible FROM farmers WHERE id = $f_id";
$result = $conn->query($sql);
$data = $result->fetch_assoc();

echo json_encode($data);
?>