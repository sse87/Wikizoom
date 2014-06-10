
console.log('wikipedia.js here!');

String.prototype.endsWith = function (pattern) {
	var d = this.length - pattern.length;
	return d >= 0 && this.lastIndexOf(pattern) === d;
};

var t;

$(document).ready(function () {
	console.log('document ready!');
	
	$('a').hover(function() {
		//console.log('hover in!');
		
		var href = $(this).attr('href');
		console.log('href: ' + href);
		
		// if href is not an image...
		var imageSrc = '';
		if (href.endsWith('.jpg') || href.endsWith('.png')) {
			//imageSrc = href;
			imageSrc = $(this).find('img').attr('src');
		}
		else {
			
			// TODO: use ajax to get page src and find the first image source, set it with value of imageSrc
			// If not leave imageSrc var empty
			//imageSrc = '';
		}
		
		// Show image
		var that = this;
		t = setTimeout(function () {
			getImage(that, imageSrc, href);
		}, 500);
		
		// temp image src
		
	}, function() {
		//console.log('hover out!');
		
		clearTimeout(t);
		$('.hoverImg').remove();
		
	});
});

var getImage = function (el, imgSrc, wikiUrl) {
	if (imgSrc === '') {
		$.ajax({
			type: "GET",
			url: wikiUrl
		}).done(function(html) {
			
			var seachIndex = html.indexOf('id="mw-content-text"');
			console.log('seachIndex: ' + seachIndex + ' [id="mw-content-text"]');
			seachIndex = html.indexOf('class="image"', seachIndex);
			console.log('seachIndex: ' + seachIndex + ' [class="image"]');
			seachIndex = html.indexOf('<img ', seachIndex);
			console.log('seachIndex: ' + seachIndex + ' [<img ]');
			seachIndex = html.indexOf('src="', seachIndex);
			console.log('seachIndex: ' + seachIndex + ' [src="]');
			
			seachIndex += 5;
			
			var endSrc = html.indexOf('"', seachIndex);
			
			imgSrc = html.substring(seachIndex, endSrc);
			console.log('imgSrc(' + seachIndex + ', ' + endSrc + '): ' + imgSrc);
			showImage(el, imgSrc);
		});
	}
	else {
		showImage(el, imgSrc);
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
