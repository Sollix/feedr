function processHandlebarsTemplate(templateId, data) {
	var templateSource = $('#' + templateId).html();
	var compiledTemplate = Handlebars.compile(templateSource);

	return compiledTemplate(data);
}

$("#reddit").on("click", function(){
	$('#source').text("Reddit")
	$("#main").empty()
	$("#loadingmessage").removeAttr("style")
	$.ajax({
		type: 'GET',
		url: 'https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/r/nottheonion.json',
		success: function(response) {
			var articles = []

			for (var i = 0; i < response.data.children.length; i = i + 1) {
				articles.push({
					Title: response.data.children[i].data.title,
					Score: response.data.children[i].data.score,
					Subreddit: response.data.children[i].data.subreddit,
					Thumb: response.data.children[i].data.thumbnail,
					URL: response.data.children[i].data.url
				})
			}

			articles.forEach(function(article) {
				var articleHtml = processHandlebarsTemplate('reddit-article', articles) //look this up
				var $articleContainer = $(articleHtml).appendTo('#main')

				$articleContainer.on('click', 'a.title', function(event) {
					console.log('You clicked on the following article:')
					console.log(article)
				})
			})
			
			$("#loadingmessage").attr("style","display: none")
		},
		error: function() {
			alert('Your request failed! Why!!?!?!?!')
		}
	})
})

// $("#digg").on("click", function(){
// 	$("#main").empty()
// 	$("#loadingmessage").removeAttr("style")
// 	$.ajax({
// 		type: 'GET',
// 		url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
// 		success: function(response) {
// 			var templateSource = $('#digg-article').html();
// 			var compiledTemplate = Handlebars.compile(templateSource);
// 			var articles = []

// 			for (var i = 0; i < response.data.feed.length; i = i + 1) {
// 				articles.push({
// 					Title: response.data.feed[i].content.description,
// 					Score: response.data.feed[i].digg_score,
// 					Tag: response.data.feed[i].content.tags[0].display,
// 					Thumb: response.data.feed[i].content.media.images[0].url,
// 					URL: response.data.feed[i].content.original_url
// 				})
// 			}

// 			var generatedHtml = compiledTemplate(articles);
// 			$('#main').append(generatedHtml);
// 			$('#source').text("Digg")
// 			$("#loadingmessage").attr("style","display: none")
// 		},
// 		error: function() {
// 			console.log('Your request failed! Why!!?!?!?!')
// 		}
// 	})
// })