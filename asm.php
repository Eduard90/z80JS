<?php
$outFile = './tmp.bin';
$text = $_POST['text'];
file_put_contents('./tmp.asm', $text);
system('z80asm tmp.asm -o '.$outFile);

$resp = '';
if (file_exists($outFile)) {
	$resp = file_get_contents($outFile);
} else {
	$resp = 'ERROR!';
}

echo base64_encode($resp);
?>
