<!DOCTYPE HTML> 
<html>
<head>
<style>
.error {color: #FF0000;}
</style>
</head>
<body> 

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
		echo "Connected successfully";
		echo "<br>";
		$stmt = $conn->prepare("SELECT morning, afternoon, night FROM rorrimDB.test_table WHERE name = :name");
		$stmt->execute(array(':name' => $name));
		$userprofile = $stmt->fetch(PDO::FETCH_ASSOC);
		$morning = $userprofile['morning'];
		$afternoon = $userprofile['afternoon'];
		$night = $userprofile['night'];
		$email = $userprofile['email'];
} catch(PDOEXCEPTION $e) {
		echo "Connection failed: " . $e->getMessage();
		echo "<br>";
}

// define variables and set to empty values
$nameErr = $emailErr = "";

$morningErr = $afternoonErr = $nightErr = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$FLAG = FALSE;
		$st = "nothing happened";
		if (empty($_POST["name"])) {
				$nameErr = "Name is required";
		} else {
				$name = test_input($_POST["name"]);
				// check if name only contains letters and whitespace
				if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
						$nameErr = "Only letters and white space allowed"; 
				}
		}

		if (empty($_POST["email"])) {
				$emailErr = "Email is required";
		} else {
				$email = test_input($_POST["email"]);
				// check if e-mail address is well-formed
				if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
						$emailErr = "Invalid email format"; 
				}
		}

		if (empty($_POST["morning"])) {
				$morning = "";
		} else {
				$comp = strcmp($morning, $_POST["morning"]);
				if ($comp) {
						$morning = $_POST["morning"];
						$FLAG = TRUE;
				}
		}

		if (empty($_POST["afternoon"])) {
				$afternoon = "";
		} else {
				$comp = strcmp($afternoon, $_POST["afternoon"]);
				if ($comp) {
						$afternoon = $_POST["afternoon"];
						$FLAG = TRUE;
				}
		}

		if (empty($_POST["night"])) {
				$night = "";
		} else {
				$comp = strcmp($night, $_POST["night"]);
				if ($comp) {
						$night = $_POST["night"];
						$FLAG = TRUE;
				}
		}

		if ($FLAG == TRUE) {
				// this is where we'll update the userprofile
				$st = "something happened";
				try {
						$sql = "UPDATE rorrimDB.test_table SET morning = :morning, afternoon = :afternoon WHERE name = :name";
						// Prepare statement
						$stmt = $conn->prepare($sql);

						//Execute query
						$stmt->execute(array(':name' => $name, ':morning' => $morning, ':afternoon' => $afternoon));

						//Echo success
						$st = $stmt->rowCount() . " records updated successfully";
				} catch (PDOException $e) {
						$st = $sql . "<br>" . $e->getMessage();
				}

		}
}

function test_input($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
}
?>

<h2>Initializing</h2>
<p><span class="error">* required field.</span></p>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"> 
   Name: <input type="text" name="name" value="<?php echo $name;?>">
   <span class="error">* <?php echo $nameErr;?></span>
   <br><br>
   E-mail: <input type="text" name="email" value="<?php echo $email;?>">
   <span class="error">* <?php echo $emailErr;?></span>
   <br><br>
   Morning: <br> <textarea name="morning" rows="5" cols="40"><?php echo $morning;?></textarea>
   <br><br>
   Afternoon:<br> <textarea name="afternoon" rows="5" cols="40"><?php echo $afternoon;?></textarea>
   <br><br>
   Night:<br> <textarea name="night" rows="5" cols="40"><?php echo $night;?></textarea>
   <br><br>
   <input type="submit" name="submit" value="Submit"> 
</form>

<?php
echo "<h2>Your Input:</h2>";
echo $name;
echo "<br>";
echo $email;
echo "<br>";
echo $morning;
echo "<br>";
echo $st;

?>

</body>
</html>
