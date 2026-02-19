<?php
header("Content-Type: application/json"); 
include 'db_config.php';

// Fetches all crops to show what the system tracks
$sql = "SELECT id, name, type FROM produce";
$result = $conn->query($sql);

$produce = [];
while($row = $result->fetch_assoc()) {
    $produce[] = $row;
}

echo json_encode($produce); // Returns list of crops
?>