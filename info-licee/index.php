<!-- https://mdbootstrap.com/legacy/4.3.2/?page=javascript/charts -->
<!DOCTYPE html>
<html lang="en">

<head>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
	<!-- Primary Meta Tags -->
    <meta name="description" content="Descoperă statistici privind rezultatele la BAC la nivel de liceu.">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Bac Plus" />
    <meta property="og:description" content="Descoperă statistici privind rezultatele la BAC la nivel de liceu." />
    <meta property="og:image" content="https://bacplus.ro/assets/img/sm-image.jpg" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:description" content="Descoperă statistici privind rezultatele la BAC la nivel de liceu.">
    <meta property="twitter:image" content="https://bacplus.ro/assets/img/sm-image.jpg">

	<title><?php echo 'BAC Plus — ' . str_replace("_", " ", htmlspecialchars($_GET["name"])) ; ?></title>

	<!-- Bootstrap core CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

	<!-- Data Tables -->
	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css">

	<!-- Icon -->
	<link rel="icon" href="../assets/img/logo.svg">
	
	<!-- Share links -->
	<script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=606c5232f6067000116b0a96&product=inline-share-buttons" async="async"></script>
</head>

<body>

    <!-- Miselanious functions -->
    <script src="../assets/js/misc.js"></script>
    
	<!-- Navigation -->
	<nav class="navbar navbar-expand-lg navbar-light static-top shadow" style="background-color:#EEE;">
		<div class="container">
			<a class="navbar-brand" href="../">
				<img class="mt-0" src="../assets/img/logo-text.svg" alt="Logo" style="width:80px;">
			</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarResponsive">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item">
						<a class="nav-link" href="../licee">Licee</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="../judete">Județe</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="../national">Național</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="../download">Download</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="../contact">Contact</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="../blog">Blog</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<!-- Page Content -->
	<div class="container">
		<div class="row">
			<div class="col">
				<h1 class="nume mt-5">Pagina se încarcă</h1>
				<hr>
			</div>
		</div>
		<!--
		<div class="alert alert-success"><strong>Știai că avem un blog?</strong> Te invităm să citești articolul <a href="https://bacplus.ro/blog/index.php/2022/02/09/cum-ar-putea-arata-sistemul-educational-in-secolul-21/"><i>“Cum ar putea arăta sistemul educațional în secolul 21?”</i></a></div>
		-->
		<div class="row mt-3">
			<div class="col">
				<p>Mai jos puteți vizualiza evoluția rezultatelor la examenul de bacalaureat din <b class="nume"></b>.</p>
			</div>
		</div>
		<div class="row text-center">
			<div class="col-sm-12 col-md-6 mt-3"><b>Medie</b><br><canvas id="chart-med"></canvas></div>
			<div class="col-sm-12 col-md-6 mt-3"><b>Procent de reușită (%)</b><br><canvas id="chart-reu"></canvas></div>
			<div class="col-sm-12 col-md-6 mt-3"><b>Număr de candidați</b><br><canvas id="chart-prez"></canvas></div>
			<div class="col-sm-12 col-md-6 mt-3"><b>Procentul elevilor care au mai susținut examenul (%)</b><br><canvas id="chart-pa"></canvas></div>
		</div>
		<hr>
		<div class="sharethis-inline-share-buttons"></div>
		<hr>
		<div class="row mt-3">
			<div class="col">
				<p>Mai jos puteți vizualiza distribuția elevilor din <b class="nume"></b> în funcție de materia la alegere, materiile obligatorii, specializare, limba modernă și limba maternă.</p>
			</div>
		</div>
		<div class="form-row mt-3">
			<div class="form-group col-md-6">
				<label for="inputAn">Anul</label>
				<select id="inputAn" class="form-control">
                    <script>document.write(yformat("", "<option>__an__</option>", ""))</script>
				</select>
			</div>
			<div class="form-group col-md-6">
				<label for="inputTableType">Selecție</label>
				<select id="inputTableType" class="form-control">
					<option value="0" selected> Materie la alegere</option>
					<option value="4"> Materii obligatorii</option>
					<option value="1">Specializare</option>
					<option value="2">Limba modernă</option>
					<option value="3">Limba maternă</option>
				</select>
			</div>
		</div>
		<div class="row">
		<div class="col-sm-12"><table id="table" class="display" style="width:100%"></table></div>
		</div>
	</div>

	<div class="mt-auto">
		<div class="text-center p-3 mt-5" style="background-color: rgba(220, 220, 220)">
			© <script>document.write(new Date().getFullYear())</script> Copyright:
			<a class="text-dark" href="https://bacplus.ro/">BacPlus.ro</a>
		</div>
	</div>

	<!-- jQuery library -->
	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>-->
	<script src="../assets/js/charts.js"></script>

	<!-- Bootstrap core JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

	<!-- Popper JS -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

	<!-- Data Tables -->
	<script src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"></script>

	<!-- DT Plugins -->
	<script src="https://cdn.datatables.net/plug-ins/1.10.22/filtering/type-based/accent-neutralise.js"></script>
	<script src="../assets/js/percentageBars.js"></script>


	<!-- Info Loader -->
	<script src="../assets/js/loadInfo.js" dataset="info_licee"></script>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-HVWNGQ3WKV"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-HVWNGQ3WKV');
	</script>

</body>

</html>

