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
		var article = []
		
		for (var i = 0; i < response.data.feed.length; i = i + 1) {
			console.log(response.data.feed[i].digg_score);
			article.push({
				Title: response.data.feed[i].content.description,
				Score: response.data.feed[i].digg_score,
				Tag1: response.data.feed[i].content.tags[0],
				Tag2: response.data.feed[i].content.tags[1],
				Tag3: response.data.feed[i].content.tags[2]
			})
		}
		var generatedHtml = compiledTemplate(article);
		$('#main').append(generatedHtml);
		console.log(response)
		console.log(response.data.feed.length)
	},
    error: function() {
        alert('Your request failed! Why!!?!?!?!')
    }
})