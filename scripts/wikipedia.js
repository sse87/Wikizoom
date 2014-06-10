
console.log('wikipedia.js here!');

String.prototype.endsWith = function (pattern) {
	var d = this.length - pattern.length;
	return d >= 0 && this.lastIndexOf(pattern) === d;
};

var t;

$(document).ready(function () {
	console.log('document ready!');
	
	$('a').hover(function() {
		
		var href = $(this).attr('href');
		console.log('href: ' + href);
		
		var that = this;
		t = setTimeout(function () {
			getImage(that, href);
		}, 500);
		
	}, function() {
		
		clearTimeout(t);
		$('.hoverImg').remove();
		
	});
});

var getImage = function (el, wikiUrl) {
	// if wikiUrl is not an image...
	var imgSrc = '';
	if (wikiUrl.endsWith('.jpg') || wikiUrl.endsWith('.png')) {
		imgSrc = $(el).find('img').attr('src');
		showImage(el, imgSrc);
	}
	else {
		$.ajax({
			type: "GET",
			url: wikiUrl
		}).done(function(html) {
			
			var findEverything = true;
			
			var seachIndex = html.indexOf('id="mw-content-text"');
			if (seachIndex === -1) findEverything = false;
			console.log('seachIndex: ' + seachIndex + ' [id="mw-content-text"] - ' + findEverything);
			
			seachIndex = html.indexOf('infobox', seachIndex);
			if (seachIndex === -1) findEverything = false;
			console.log('seachIndex: ' + seachIndex + ' [infobox] - ' + findEverything);
			
			seachIndex = html.indexOf('class="image"', seachIndex);
			if (seachIndex === -1) findEverything = false;
			console.log('seachIndex: ' + seachIndex + ' [class="image"] - ' + findEverything);
			
			seachIndex = html.indexOf('<img ', seachIndex);
			if (seachIndex === -1) findEverything = false;
			console.log('seachIndex: ' + seachIndex + ' [<img ] - ' + findEverything);
			
			seachIndex = html.indexOf('src="', seachIndex);
			if (seachIndex === -1) findEverything = false;
			console.log('seachIndex: ' + seachIndex + ' [src="] - ' + findEverything);
			
			if (findEverything) {
				// Offset for the length of 'src="'
				seachIndex += 5;
				// Get the end index of the src
				var endSrc = html.indexOf('"', seachIndex);
				
				// Get the image source
				imgSrc = html.substring(seachIndex, endSrc);
				console.log('imgSrc(' + seachIndex + ', ' + endSrc + '): ' + imgSrc);
				// And show it
				showImage(el, imgSrc);
			}
		});
	}
};

var showImage = function (el, imgSrc) {
	if (imgSrc !== '') {
		var hoverImg = $('<img class="hoverImg" src="' + imgSrc + '" alt="" />')
		hoverImg.css({
			"position": "absolute"
		});
		$(el).prepend(hoverImg);
	}
};
