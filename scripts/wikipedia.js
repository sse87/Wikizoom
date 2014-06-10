
console.log('wikipedia.js here!');

String.prototype.endsWith = function (pattern) {
	var d = this.length - pattern.length;
	return d >= 0 && this.lastIndexOf(pattern) === d;
};

var imageSrc = '';
var t;

$(document).ready(function () {
	console.log('document ready!');
	
	$('a').hover(function() {
		//console.log('hover in!');
		
		var href = $(this).attr('href');
		console.log('href: ' + href);
		
		// if href is not an image...
		if (href.endsWith('.jpg') || href.endsWith('.png')) {
			//imageSrc = href;
			imageSrc = $(this).find('img').attr('src');
		}
		else {
			
			// TODO: use ajax to get page src and find the first image source, set it with value of imageSrc
			// If not leave imageSrc var empty
			//imageSrc = '';
			// Mock the source
			imageSrc = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bryan_Singer_by_Gage_Skidmore.jpg/220px-Bryan_Singer_by_Gage_Skidmore.jpg';
		}
		
		// Show image
		var that = this;
		t = setTimeout(function () {
			showImage(that, imageSrc);
		}, 500);
		
		// temp image src
		
	}, function() {
		//console.log('hover out!');
		
		clearTimeout(t);
		$('.hoverImg').remove();
		
	});
});

var showImage = function (el, imageSrc) {
	if (imageSrc !== '') {
		var hoverImg = $('<img class="hoverImg" src="' + imageSrc + '" alt="" />')
		hoverImg.css({
			"position": "absolute"
		});
		$(el).prepend(hoverImg);
	}
};
