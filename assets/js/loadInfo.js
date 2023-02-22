var dataset = document.currentScript.getAttribute('dataset');
var datafile = document.currentScript.getAttribute('datafile');
var name = getParam("name");

data = {};

function getAllData(yrs, cb){
	if( yrs.length == 0 ){
		cb();
		return;
	}

	var src = "../assets/data/" + yrs[0] + "/";
	if (datafile)
		src += datafile;
	else if (yrs[0] < 2021)
		src += dataset + "/" + name.toUpperCase() + ".json";
	else
		src += dataset + "/" + name.toUpperCase().replaceAll('"', '_') + ".json";


	$.ajax({
		url: src,
		type: 'GET',
		success: function(newjson) {
			console.log(newjson);
			data[yrs[0]] = newjson;
			yrs.shift();
			getAllData(yrs, cb);
		},
		error: function(data) {
			yrs.shift();
			getAllData(yrs, cb);
		},
		datatype: "text"
	});
}

function getChartData(y, tabtype, cb) {
	var info = data[y];
	var tab_data = [], tab_obj, tab_head;

	if (tabtype == "0" || tabtype == "4") {
		for( key in info["materii"] )
			if( (key.includes("MATEMATIC") || key.includes("LIMBA") || key == "ISTORIE" || key == "GENERAL") == (tabtype == "4") && key != "GENERAL" )
				tab_data.push(["", key, info["materii"][key]["medie"], info["materii"][key]["reusita"], info["materii"][key]["cnt"], info["materii"][key]["cnt"] * 100 / info["materii"]["GENERAL"]["cnt"]]);

		tab_obj = {
			"lengthMenu": [[15, 30, 100], [15, 30, 100]],
			"columnDefs": [ {
				"searchable": false,
				"orderable": false,
				"targets": 0
			}, {
				"orderable": false,
				"targets": 1
			}, {
				"className": "dt-center",
				"targets": "_all"
			}, {
				targets: 2,
				render: $.fn.dataTable.render.number(" ", ",", 2)
			 }, {
				targets: 3,
				render: $.fn.dataTable.render.percentBar( 'round',null,null,'scale',null, 1, 'solid' )
			 }, {
				targets: 4,
				render: $.fn.dataTable.render.number(" ", ",", 0)
			 }, {
				targets: 5,
				render: $.fn.dataTable.render.percentBar( 'round','#FFF', '#269ABC', '#31B0D5', '#286090', 1, 'solid' )
			 }],
			"data": tab_data,
			"order": [[ 2, 'desc' ]],
			"language": {
				"decimal": ",",
				"thousands": ".",
				"url": "../assets/lang/Romanian.json",
			},
			"aoColumns": [
				null,
				null,
				{ "orderSequence": [ "desc", "asc" ] },
				{ "orderSequence": [ "desc", "asc" ] },
				{ "orderSequence": [ "desc", "asc" ] },
				{ "orderSequence": [ "desc", "asc" ] },
			],
			"scrollX": true
		};

		tab_head = "<thead><tr><th>Nr.</th><th>Materie " + ["Aleasă", "Obligatorie"][tabtype == "4" ? 1 : 0] + "</th><th>Medie</th><th>Procent Reusită</th><th>Număr candidați</th><th>Procent din total</th></tr></thead>"
	} else {
		switch(tabtype) {
		case "1":
			for( key in info["specializari"] )
				tab_data.push(["", key, info["specializari"][key], info["specializari"][key] * 100 / info["materii"]["GENERAL"]["cnt"]]);
			tab_head = "<thead><tr><th>Nr.</th><th>Specializare</th><th>Număr candidați</th><th>Procent din total</th></tr></thead>"
			break;

		case "2":
			for( key in info["limba_moderna"] )
				tab_data.push(["", key, info["limba_moderna"][key], info["limba_moderna"][key] * 100 / info["materii"]["GENERAL"]["cnt"]]);

			tab_head = "<thead><tr><th>Nr.</th><th>Limba Modernă</th><th>Număr candidați</th><th>Procent din total</th></tr></thead>"
			break;

		case "3":
			for( key in info["limba_materna"] )
				tab_data.push(["", key, info["limba_materna"][key], info["limba_materna"][key] * 100 / info["materii"]["GENERAL"]["cnt"]]);
			tab_head = "<thead><tr><th>Nr.</th><th>Limba Maternă</th><th>Număr candidați</th><th>Procent din total</th></tr></thead>"
			break;
		}


		tab_obj = {
			"lengthMenu": [[15, 30, 100], [15, 30, 100]],
			"columnDefs": [ {
				"searchable": false,
				"orderable": false,
				"targets": 0
			}, {
				"orderable": false,
				"targets": 1
			}, {
				"className": "dt-center",
				"targets": "_all"
			}, {
				targets: 2,
				render: $.fn.dataTable.render.number(" ", ",", 0)
			 }, {
				targets: 3,
				render: $.fn.dataTable.render.percentBar( 'round','#FFF', '#269ABC', '#31B0D5', '#286090', 1, 'solid' )
			 }],
			"data": tab_data,
			"order": [[ 2, 'desc' ]],
			"language": {
				"decimal": ",",
				"thousands": ".",
				"url": "../assets/lang/Romanian.json",
			},
			"aoColumns": [
				null,
				null,
				{ "orderSequence": [ "desc", "asc" ] },
				{ "orderSequence": [ "desc", "asc" ] },
			],
			"scrollX": true,
		};
	}

	var med_data;
	var reu_data;
	var prez_data;
	var pa_data;
	var years = Object.keys(data).sort();
	var default_obj;

	default_obj = {
		labels: [],
		datasets: [{
			label: "",
			fillColor: "rgba(255,0,0,0.2)",
			strokeColor: "rgba(255,0,0,1)",
			pointColor: "rgba(255,0,0,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(255,0,0,1)",
			data: []
		}]
	};

	med_data = JSON.parse(JSON.stringify(default_obj));// so that the objects do not
	reu_data = JSON.parse(JSON.stringify(default_obj));// point to the same thing
	prez_data = JSON.parse(JSON.stringify(default_obj));
	pa_data = JSON.parse(JSON.stringify(default_obj));

	for( year in years ){
		if (years[year].length > 4) // Skip year sets from the graph
			continue;
		console.log(years[year]);
		
		reu_data.labels.push(years[year]);
		prez_data.labels.push(years[year]);
		pa_data.labels.push(years[year]);
		
		const m = data[years[year]]["materii"]["GENERAL"]["medie"];
		if (m != '-') {
			med_data.labels.push(years[year]);
			med_data.datasets[0].data.push(m.toFixed(2));
		}
		reu_data.datasets[0].data.push(data[years[year]]["materii"]["GENERAL"]["reusita"].toFixed(2));
		prez_data.datasets[0].data.push(data[years[year]]["materii"]["GENERAL"]["cnt"].toFixed(0));
		if (data[years[year]]["promotie_anterioara"]["DA"] != undefined)
			pa_data.datasets[0].data.push((data[years[year]]["promotie_anterioara"]["DA"]/data[years[year]]["materii"]["GENERAL"]["cnt"] * 100).toFixed(2));
		else
			pa_data.datasets[0].data.push(0);
	}

	cb(tab_obj, tab_head, med_data, reu_data, prez_data, pa_data);
}

var table = undefined;

var med_chart = undefined;
var reu_chart = undefined;
var prez_chart = undefined;
var pa_chart = undefined;

function updateStats() {
	getChartData($("#inputAn")[0].value, $("#inputTableType")[0].value, function(tab_obj, tab_head, med_data, reu_data, prez_data, pa_data) {
		// charts
		var med_ctx = document.getElementById("chart-med").getContext('2d');
		if( med_chart != undefined )
			med_chart.destroy();
		med_chart = new Chart(med_ctx).Line(med_data, {responsive: true, animation: false, tooltipFontSize: 12, scaleBeginAtZero: true});

		var reu_ctx = document.getElementById("chart-reu").getContext('2d');
		if( reu_chart != undefined )
			reu_chart.destroy();
		reu_chart = new Chart(reu_ctx).Line(reu_data, {responsive: true, animation: false, tooltipFontSize: 12, scaleBeginAtZero: true});

		var prez_ctx = document.getElementById("chart-prez").getContext('2d');
		if( prez_chart != undefined )
			prez_chart.destroy();
		prez_chart = new Chart(prez_ctx).Line(prez_data, {responsive: true, animation: false, tooltipFontSize: 12, scaleBeginAtZero: true});

		var pa_ctx = document.getElementById("chart-pa").getContext('2d');
		if( pa_chart != undefined )
			pa_chart.destroy();
		pa_chart = new Chart(pa_ctx).Line(pa_data, {responsive: true, animation: false, tooltipFontSize: 12, scaleBeginAtZero: true});

		//tables
		if( table != undefined )
		table.destroy();

		document.getElementById('table').innerHTML = tab_head;// add header
		table = $('#table').DataTable(tab_obj);

		table.on( 'order.dt search.dt', function () {
			table.column(0, {search:'none', order:'applied'}).nodes().each( function (cell, i) {
				cell.innerHTML = i+1;
			});
		}).draw();

		table.on('page.dt', function() {
			if ($(window).scrollTop() > $(".dataTables_scrollHead").offset().top)
				$('html, body').animate({
					scrollTop: $(".dataTables_scrollHead").offset().top
				}, 'slow');
		});
	});
}

$(document).ready(function() {
	getAllData([...years], function(){
		years = Object.keys(data);

		var replace_elem = document.getElementsByClassName("nume");
		for( i in replace_elem )
		    replace_elem[i].innerHTML = data[years[0]].nume.split('\t')[0];

		years.reverse();
		$("#inputAn").html(yformat("", "<option>__an__</option>", ""));
		years.reverse();

		updateStats();
		$("#inputAn").change(updateStats);
		$("#inputTableType").change(updateStats);
	});
} );
