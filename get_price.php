<?php
header("Content-Type: application/json");
include 'db_config.php';

// Uses $_GET to filter by specific IDs from the URL 
$p_id = $_GET['produce_id'];
$m_id = $_GET['market_id'];

$sql = "SELECT price_per_kg, updated_at FROM prices WHERE produce_id = $p_id AND market_id = $m_id";
$result = $conn->query($sql);
$data = $result->fetch_assoc();

// If data exists, return it; otherwise, return an error message
echo $data ? json_encode($data) : json_encode(["error" => "No data found"]);
?>