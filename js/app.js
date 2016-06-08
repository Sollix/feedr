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
				var articleHtml = processHandlebarsTemplate('reddit-article', article) //look this up
				var $articleContainer = $(articleHtml).appendTo('#main')

				$articleContainer.on('click', 'a.title', function(event) {
					$("#popUp").removeClass("hidden")
					$("#fullart").attr("src", article.URL)
					$(".popUpAction").attr("href", article.URL)
					$("#popUp").removeClass("loader")
				})
			})

			$("#loadingmessage").attr("style","display: none")
		},
		error: function() {
			alert('Your request failed! Why!!?!?!?!')
		}
	})
})

$("#digg").on("click", function(){
	$('#source').text("Digg")
	$("#main").empty()
	$("#loadingmessage").removeAttr("style")
	$.ajax({
		type: 'GET',
		url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
		success: function(response) {
			var templateSource = $('#digg-article').html();
			var compiledTemplate = Handlebars.compile(templateSource);
			var articles = []

			for (var i = 0; i < response.data.feed.length; i = i + 1) {
				articles.push({
					Title: response.data.feed[i].content.description,
					Score: response.data.feed[i].digg_score,
					Tag: response.data.feed[i].content.tags[0].display,
					Thumb: response.data.feed[i].content.media.images[0].url,
					URL: response.data.feed[i].content.original_url
				})
			}

			articles.forEach(function(article) {
				var articleHtml = processHandlebarsTemplate('digg-article', article) //look this up
				var $articleContainer = $(articleHtml).appendTo('#main')

				$articleContainer.on('click', 'a.title', function(event) {
					$("#popUp").removeClass("hidden")
					$("#fullart").attr("src", article.URL) //find a graceful way to handle this
					// $("#fullart").attr("src", article.URL).error(function(){
					// 	$("#fullart").addClass("hidden")
					// 	$("#fullart").text("Iframes are not supported")
					// })
					$(".popUpAction").attr("href", article.URL)
					$("#popUp").removeClass("loader") //find a way to make this appear until article loads
				})
			})

			$("#loadingmessage").attr("style","display: none")
		},
		error: function() {
			console.log('Your request failed! Why!!?!?!?!')
		}
	})
})

$("#google").on("click", function(){
	$('#source').text("Google")
	$("#main").empty()
	$("#loadingmessage").removeAttr("style")
	$.ajax({
		type: 'GET',
		url: 'https://accesscontrolalloworiginall.herokuapp.com/http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss',
		success: function(response) {
			var articles = []

			for (var i = 0; i < response.responseData.feed.entries.length; i = i + 1) {
				articles.push({
					Title: response.responseData.feed.entries[i].title,
					Tag: response.responseData.feed.entries[i].categories[0],
					URL: response.responseData.feed.entries[i].link
				})
			}

			articles.forEach(function(article) {
				var articleHtml = processHandlebarsTemplate('google-article', article) //look this up
				var $articleContainer = $(articleHtml).appendTo('#main')

				$articleContainer.on('click', 'a.title', function(event) {
					$("#popUp").removeClass("hidden")
					$("#fullart").attr("src", article.URL)
					$(".popUpAction").attr("href", article.URL)
					$("#popUp").removeClass("loader")
				})
			})

			$("#loadingmessage").attr("style","display: none")
		},
		error: function() {
			alert('Your request failed! Why!!?!?!?!')
		}
	})
})

$(".closePopUp").on("click", function() {
	$("#popUp").addClass("hidden")
	$("#fullart").attr("src", "")
	$(".popUpAction").attr("href", "")
})