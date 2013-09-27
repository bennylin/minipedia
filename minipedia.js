function onFormSubmit(){
	apiUrl = "http://id.wikipedia.org/w/api.php?";
	extract = 'action=query&prop=extracts&exintro&grnnamespace=0&indexpageids=true&format=json';
	random = '&generator=random';
	titles = '&titles=';
	var str = $_GET['path'];
		$("#inp_txt").html("Paragraf pembuka artikel " + str);
	if (str != "") {
		theURL = apiURL + extract + titles + str;
	} else {
		theURL = apiURL + extract + random;
	}
	// API request to load non-random page:
	// action=parse&page=Concise_Wikipedia&section=0&prop=text&format=txtfm&disablepp
	// first section of a random article. API query devised by http://stackoverflow.com/q/13517901/266309
	// action=query&prop=revisions&rvprop=content&rvparse=&rvsection=0&generator=random&grnnamespace=0&indexpageids=true&format=json
	$.ajax({
		// https://www.mediawiki.org/wiki/Extension:MobileFrontend#prop.3Dextracts
		url: theUrl,
		data: {
		    format: 'json'
		},
		dataType: 'jsonp',
		success: function(jsonObject) {
			var pageid = jsonObject.query.pageids[0];
			var article = jsonObject.query.pages[pageid];
			article.url = "http://id.wikipedia.org/wiki/" + encodeURIComponent(article.title);
			article.link = "<a href='" + article.url + "'>" + article.title + "</a>";
			var editlink = "<a href='" + article.url + "?action=edit&section=0' class='edit-link'>edit</a>";
			$("#content").html("<h2>" + article.link + editlink + "</h2>");
			$("#content").append( article.extract );
		}
	});
}
