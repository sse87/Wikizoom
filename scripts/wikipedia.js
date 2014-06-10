
console.log('wikipedia.js here!');

String.prototype.endsWith = function (pattern) {
	var d = this.length - pattern.length;
	return d >= 0 && this.lastIndexOf(pattern) === d;
};

var t;

$(document).ready(function () {
	console.log('document ready!');
	
	$('a').hover(function() {
		
		// TODO: prevent loading href of it self
		var href = $(this).attr('href');
		console.log('href: ' + href);
		
		var that = this;
		t = setTimeout(function () {
			getImage(that, href);
		}, 500);
		
	}, function() {
		
		clearTimeout(t);
		removeHover();
		
	});
});

var getImage = function (el, wikiUrl) {
	showHover(el);
	// if wikiUrl is not an image...
	var imgSrc = '';
	if (wikiUrl.endsWith('.jpg') || wikiUrl.endsWith('.png')) {
		imgSrc = $(el).find('img:not(.wikizoom img)').attr('src');
		updateImage(imgSrc);
	}
	else {
		$.ajax({
			type: "GET",
			url: wikiUrl
		}).done(function(html) {
			
			var findEverything = true;
			
			var seachIndex = html.indexOf('id="mw-content-text"');
			if (seachIndex === -1) findEverything = false;
			//console.log('seachIndex: ' + seachIndex + ' [id="mw-content-text"] - ' + findEverything);
			
			seachIndex = html.indexOf('infobox', seachIndex);
			if (seachIndex === -1) findEverything = false;
			//console.log('seachIndex: ' + seachIndex + ' [infobox] - ' + findEverything);
			
			seachIndex = html.indexOf('class="image"', seachIndex);
			if (seachIndex === -1) findEverything = false;
			//console.log('seachIndex: ' + seachIndex + ' [class="image"] - ' + findEverything);
			
			seachIndex = html.indexOf('<img ', seachIndex);
			if (seachIndex === -1) findEverything = false;
			//console.log('seachIndex: ' + seachIndex + ' [<img ] - ' + findEverything);
			
			seachIndex = html.indexOf('src="', seachIndex);
			if (seachIndex === -1) findEverything = false;
			//console.log('seachIndex: ' + seachIndex + ' [src="] - ' + findEverything);
			
			if (findEverything) {
				// Offset for the length of 'src="'
				seachIndex += 5;
				// Get the end index of the src
				var endSrc = html.indexOf('"', seachIndex);
				
				// Get the image source
				imgSrc = html.substring(seachIndex, endSrc);
				//console.log('imgSrc(' + seachIndex + ', ' + endSrc + '): ' + imgSrc);
				// And show it
				updateImage(imgSrc);
			}
			else {
				removeHover();
			}
		});
	}
};

var showHover = function (el) {
	
	var wikizoom = $('<div class="wikizoom">');
	wikizoom.css({
		"background-color": "#FFFFFF",
		"border": "1px solid #000000",
		"padding": "5px",
		"position": "absolute"
	});
	wikizoom.append('<img src="' + chrome.extension.getURL('images/loading.gif') + '" alt="" /></div>');
	$(el).prepend(wikizoom);
};
var updateImage = function (imgSrc) {
	console.log('updateImage(' + imgSrc + '): ' + $('.wikizoom').length);
	if (imgSrc !== '') {
		$('.wikizoom').html('<img src="' + imgSrc + '" alt="" />');
	}
};
var removeHover = function () {
	$('.wikizoom').remove();
};
