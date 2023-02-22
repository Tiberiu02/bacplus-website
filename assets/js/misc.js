if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

function sort_object(obj) {
	items = Object.keys(obj).map(function(key) {
		return [key, obj[key]];
	});
	items.sort(function(first, second) {
		return second[1] - first[1];
	});
	sorted_obj={};
	$.each(items, function(k, v) {
		use_key = v[0];
		use_value = v[1];
		sorted_obj[use_key] = use_value;
	})
	return(sorted_obj);
} 

function removeDiacritics( str ){
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getParam( param ){
	var url = new URL(window.location.href);
	return url.searchParams.get(param);
}

var years = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

// exemplu: yformat("anii:", " {an}", "!") ---> "anii: 2019, 2020!"
function yformat(start, format, end){
  var retval = start;
  
  for( y in years ){
    retval += format.replace(/__an__/g, years[y]);
  }
  
  return retval + end;
}

let params = new URLSearchParams(window.location.href);
if (params.get('name'))
	document.title = "BAC Plus — " + params.get('name');