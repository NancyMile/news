<?php
define('TEMPLATES_URL',__DIR__.'/templates');
define('FUNCTIONS_URL',__DIR__.'functions.php');

function addTemplate(string $name){
    include TEMPLATES_URL."/$name.php";
}