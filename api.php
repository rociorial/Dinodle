<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'dinodle';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Procesar la solicitud
$action = $_GET['action'] ?? null;

if ($action === 'random') {
    // Obtener un dinosaurio aleatorio
    $stmt = $pdo->query("SELECT * FROM dinosaurs ORDER BY RAND() LIMIT 1");
    $dino = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($dino);
} elseif ($action === 'guess') {
    // Buscar dinosaurio por nombre
    $name = $_GET['name'] ?? '';
    $stmt = $pdo->prepare("SELECT * FROM dinosaurs WHERE name = :name");
    $stmt->execute(['name' => $name]);
    $dino = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($dino);
} else {
    echo json_encode(["error" => "Acción no válida"]);
}
?>