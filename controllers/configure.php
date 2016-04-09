<?php
//Setup connection to MySQL Server
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "rorrimDB";
$name = 'Peter';

echo "connecting";
//create a connection
try {
		$conn = new PDO("mysql:host=$servername;dbname=$rorrimDB", $username, $password);
		// set the PDO error mode to exception
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$stmt = $conn->prepare("SELECT morning, afternoon, night FROM rorrimDB.test_table WHERE name = :name");
		$stmt->execute(array(':name' => $name));
		$userprofile = $stmt->fetch(PDO::FETCH_ASSOC);
		$morning = $userprofile['morning'];
		$afternoon = $userprofile['afternoon'];
		$night = $userprofile['night'];
		echo $userprofile;
} catch(PDOEXCEPTION $e) {
		echo "Connection failed: " . $e->getMessage();
		echo "<br>";
}

?>
