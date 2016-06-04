/*
  Please add all Javascript code to this file.
*/
// $.ajax({
//     type: 'GET',
//     url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
//     success: function(response) {
//         console.log(response)
//         response.data.feed.forEach(function(data) {
// 				//var imageUrl = 'url(' + data.images.standard_resolution.url + ')'
// 				//$('<div></div>').appendTo('.images').css('background-image', imageUrl).addClass('image')
// 				var imageUrl = data.content.media.images[0].url //in handlebars, you will not use bracket notation
// 				console.log(imageUrl)
// 				$('#image1').attr('src', imageUrl)
// 			})
//     },
//     error: function() {
//         alert('Your request failed! Why!!?!?!?!')
//     }
// })

$.ajax({
    type: 'GET',
    url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
    success: function(response) {
    var templateSource = $('#digg-article').html();
		var compiledTemplate = Handlebars.compile(templateSource);
		var data = []
		
		for (var i = 0; i < response.data.feed.length; i = i + 1) {
			data.push({
				// Thumb: data.content.media.images[0].url,
				Score: response.data.feed[i].digg_score
			})
		}
		var generatedHtml = compiledTemplate(data);
		$('#main').append(generatedHtml);
		console.log(response)
	},
    error: function() {
        alert('Your request failed! Why!!?!?!?!')
    }
})