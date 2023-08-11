<?php
	require 'includes/app.php';
	addTemplate('header');

	if(isset($_POST['data'])){
		$articles = $_POST['data'];
	}
	if(isset($_POST['keywordsPages'])){
		$keywords = $_POST['keywordsPages'];
?>
		<script>let keywordsPages =<?php echo $keywords; ?> </script>
<?php
	}
?>
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
					<a class="btn btn-success px-5 py-3 fs-3 text-uppercase fw-bold rounded-0 d-block d-md-inline-block" onClick="sendData()">Get News</a>
					<a class="text-dark text-decoration-none" href="#charts">Trends and Key words</a>
					<a class="text-dark text-decoration-none" href="#news">Todays News</a>
				</nav>
			</div>
		</div>
	</div>
	<main class="container-xl py-5" id="charts">
		<h2 class="text-center my-5">Charts</h2>

		<div class="row">
			<div class="col-md-6 mb-4">
				<div class="card">
					<div class="card-body text-center bg-primary p-5">
						<h3>Trends</h3>
							<canvas id="barChart" style="max-width: 500px;"></canvas>
					</div>
				</div>
			</div>
			
			<div class="col-md-6 mb-4">
				<div class="card">
					<div class="card-body text-center bg-primary p-5">
						<h3>key Words</h3>
						<canvas id="pieChart" style="max-width: 500px;"></canvas>
					</div>
				</div>
			</div>
		</div>
	</main>

	<section id="news" class="container-xl">
		<h2 class="text-center py-5">Todays News</h2>
		<div class="row mt-5">
			<?php
				if(isset($articles)):
					for($i=1; $i<count($articles); $i++ ): ?>
						<div class="col-md-4">
							<!-- <div class="overflow-hidden">
								<img class="img-fluid" src="<?php echo $articles[$i]['image']; ?>" alt="news">
							</div> -->
							<h3  class="mb-4"><?php echo $articles[$i]['headLine']; ?></h4>
							<p class="text-dark fs-2 text-center d-block py-3"><?php echo $articles[$i]['articleSummary']; ?></p>
						</div>
			<?php   endfor;
				endif; ?>
		</div>
	</section>

	<?php
	addTemplate('footer');
	?>