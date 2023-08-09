<?php
	require 'includes/app.php';
	addTemplate('header');
?>
<script>
	alert(articles)
</script>
	<div class="border-top py-4">
		<div class="navbar navbar-expand-lg container navbar-light ">
			<a class="navbar-brand nombre-sitio d-lg-none fs-2 fw-bold text-uppercase" href="index.html">
				Latest News
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navegacion">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div id="navegacion" class="collapse navbar-collapse">
				<nav class="navbar-nav container d-flex flex-md-row justify-content-md-between text-center">
					<a class="text-dark text-decoration-none" href="#">Trends and Key words</a>
					<a class="text-dark text-decoration-none" href="#">Todays News</a>
				</nav>
			</div>
		</div>
	</div>
	<main class="container-xl py-5">
		<h2 class="text-center my-5">Charts</h2>
		<div class="row">
			<div class="col-md-6 mb-4">
				<div class="card">
					<div class="card-body text-center bg-primary text-white p-5">
						<h3>Trends</h3>
						<p>	Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam deleniti sed recusandae vitae architecto molestiae, eos corrupti</p>
					</div>
				</div>
			</div>
			
			<div class="col-md-6 mb-4">
				<div class="card">
					<div class="card-body text-center bg-primary text-white p-5">
						<h3>key Words</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam deleniti sed recusandae vitae architecto molestiae, eos corrupti</p>
					</div>
				</div>
			</div>
		</div>
	</main>

	<section class="container-xl">
		<h2 class="text-center py-5">Todays News</h2>
		<div class="row mt-5">
			<div class="col-md-4">
				<p class="text-dark fs-2 text-center d-block py-3">News 1</p>
			</div>
			<div class="col-md-4">
				<p class="text-dark fs-2 text-center d-block py-3">O</p>
			</div>
			<div class="col-md-4">
				<p class="text-dark fs-2 text-center d-block py-3">O</p>
			</div>
		</div>
	</section>

	<?php
	addTemplate('footer');
	?>

	 