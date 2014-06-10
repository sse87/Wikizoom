
console.log('wikipedia.js here!');

var endsWith = function (str, arrEnds) {
	
	// TODO: check the end of the str variable if any of the ends matches
	
	return false;
};

var imageSrc = '';

$(document).ready(function () {
	console.log('document ready!');
	
	$('a').hover(function() {
		//console.log('hover in!');
		
		var href = $(this).attr('href');
		console.log('href: ' + href);
		
		// if href is not an image...
		if (endsWith(href, ['.jpg','.png'])) {
			imageSrc = href;
		}
		else {
			
			// TODO: use ajax to get page src and find the first image source, set it with value of imageSrc
			// If not leave imageSrc var empty
		}
		
		// TODO: delay for 500 ms if hover out is not activated
		
		// temp image src
		var imageSrc = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bryan_Singer_by_Gage_Skidmore.jpg/220px-Bryan_Singer_by_Gage_Skidmore.jpg';
		
		showImage(this, imageSrc);
		
	}, function() {
		//console.log('hover out!');
		
		$('.hoverImg').remove();
		
	});
});

var showImage = function (el, imageSrc) {
	if (imageSrc !== '') {
		var hoverImg = $('<img class="hoverImg" src="' + imageSrc + '" alt="" />')
		hoverImg.css({
			"position": "absolute"
		});
		$(el).append(hoverImg);
	}
};
