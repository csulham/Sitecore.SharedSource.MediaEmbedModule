var mediaEmbedModule = mediaEmbedModule || {};

	mediaEmbedModule.populate = (function($){
		'use strict ';
		var servicePath = 'data/api.json',
		$resultList = $('.media-embed-module-results'),
		currentResult = '',
		searchTop,
		$searchContainer = $('.media-embed-module-media-container'),
		resultItem = "media-embed-module-result"
		results = {},
		debug = {};
		//Debug Object Block.
		debug.on = true;
		if (debug.on){
			debug.theme1 = "background-color: #78AE32;color: #FFFFFF; font-weight: 100; line-height: 2em; padding: .5em; font-family: Helvetica;";
			debug.theme2 = "color: #FFFFFF; background-color: #777777; font-weight: 100; line-height: 2em; padding: .5em; font-family: Helvetica;";
			debug.theme3 = "color: #777777; background-color: #FFFFFF; font-weight: 100; line-height: 2em; padding: .5em; font-family: Helvetica;";
		}
		//Debug Function Call
		var debugData = function(){
			if (debug.on){
				console.log("%c" + 'Debug On', debug.theme3);	
			}
		}
		//JSON call to the api
		var serviceCall = function(){
			$.ajax({
				url: servicePath,
				type: 'GET',
				dataType: 'json',
			})
			.done(function(data) {
				console.log("%c" + 'Success', debug.theme1);
				results = data;
			})
			.fail(function(data) {
				console.log("error");
			})
			.always(function() {
				console.log("%c" + 'Complete', debug.theme2);
				populateView();
			});	
		};

		var populateView = function(){
			$.each(results, function(index, image) {
					currentResult = $('<li>', {
						'class' : resultItem,
						'html' : $('<img/>', {
		    				title: image.tags,
		    				rel: 'external',
		    				src: image.picture
						}).add($('<ul class="media-embed-buttons">' +' <li class="small-button">Small</li>' + '<li class="medium-button">Medium</li>' + '<li class="large-button">Large</li>' + '</ul>'))

					});
					$resultList.masonry().append(currentResult).masonry('appended', currentResult);
			});
			$resultList.masonry({
				columnWidth: "." + resultItem,
  				itemSelector: "." + resultItem
			})
		}
			
		var infiniteScrollInit = function(){

			$(window).scroll(function() {
    			if ( $(document).scrollTop() + 2000 >= document.body.offsetHeight) { 
    				serviceCall();
    			}  
			});
		}



		var init = function(){
			if (debug.on){
				debugData();
			}
			serviceCall();
			infiniteScrollInit();
		}


		return{
			init : init
		}

	})(jQuery);

mediaEmbedModule.populate.init();