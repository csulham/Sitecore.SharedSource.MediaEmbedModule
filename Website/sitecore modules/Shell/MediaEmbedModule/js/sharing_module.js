var embedLink = "";
var mediaEmbedModule = mediaEmbedModule || {};

	mediaEmbedModule.populate = (function($){
		'use strict ';
		var servicePath = 'GetMedia.aspx/GetMore',
			$module = $('.sitecore-shared-source-media-embed-module'),
			$resultList = $('.media-embed-module-results'),
			$previewContainer = $('.media-embed-module-preview'),
			$searchField = $('.media-embed-module-search-field'),
			$listView = $('.media-embed-module-backbutton'),
			$searchContainer = $('.media-embed-module-media-container'),
			$publishButton = $('.media-embed-module-publish'),
			$imageTitle = $(".media-embed-module-image-title"),
			$imageClass = $(".media-embed-module-image-classes"),
			$currentImage,
			linkValue,
			imgUrl,
			imgTitle,
			target,
			linkOpenLocation,
			imgSize,
			htmlToPublish,
			moduleHeight = $module.outerHeight(),
			resultListHeight,
			searchQuery = $searchField.val(),
			embedOptionsClass = 'js-selected-media',
			selectedImage,
			contentLoaded = false,
			currentResult = '',
			searchTop,
			scrollOffset = 600,
			resultItem = "media-embed-module-result",
			results = {},
			debug = {},
			page = 1;

		//Debug Object Block.
		debug.on = true;
		if (debug.on){
			//Set Debug Styles.
			debug.theme1 = "background-color: #78AE32;color: #FFFFFF; font-weight: 100; line-height: 2em; padding: .5em; font-family: Helvetica;";
			debug.theme2 = "color: #FFFFFF; background-color: #777777; font-weight: 100; line-height: 2em; padding: .5em; font-family: Helvetica;";
			debug.theme3 = "color: #777777; background-color: #FFFFFF; font-weight: 100; line-height: 2em; padding: .5em; font-family: Helvetica;";
			debug.theme4 = "color: #FFFFFF; background-color: #c62223; font-weight: 100; line-height: 2em; padding: .5em; font-family: Helvetica;";
		}

		//Debug Function Call
		var debugData = function(){
			if (debug.on){
				console.log("%c" + 'Debug On', debug.theme3);	
			}
		}
		//JSON call to the api
		var serviceCall = function (search, page) {
			$searchContainer.off('scroll');
			$.ajax({
				url: "GetMedia.aspx/GetMore",
				type: "POST",
				dataType: "json",
				data: "{'search': '" + search + "', 'page': " + page + "}",
				contentType: "application/json; charset=utf-8"
			})
			.done(function(data) {
				console.log("%c" + 'Success', debug.theme1);
				contentLoaded = true;

				results = data.d;
				populateView();
					infiniteScrollInit();
				})
			.fail(function(data) {
				console.log("%c" + 'Error', debug.theme4);
			})
			.always(function() {
				console.log("%c" + 'Complete', debug.theme2);
				resultListHeight = $resultList.outerHeight();
			});	
		};

		//Update the Result list with photos from the API.
		var populateView = function(){
			$.each(results, function(index, image) {
				console.log();
					currentResult = $('<li>', {
						'class' : resultItem,
						'html' : $('<img/>', {
		    				title: image.title,
		    				rel: 'external',
		    				src: image.MediumUrl
						}).attr({"data-smallurl": image.SmallUrl, 
								"data-largeurl": image.LargeUrl,
								"data-mediumurl" : image.MediumUrl,
								"data-title" : image.Title
							})

					});
					$resultList.masonry().append(currentResult).masonry('appended', currentResult);
			});
			//Call The Masonry plugin
			$resultList.masonry({
				columnWidth: "." + resultItem,
  				itemSelector: "." + resultItem
			})
		};

		//Trigger a new API call on scroll at a certain threshold
		var infiniteScrollInit = function(){
			$searchContainer.scroll(function() {
    			if ( contentLoaded && (Math.abs($resultList.offset().top) + moduleHeight + scrollOffset > resultListHeight)){
    				serviceCall($searchField.val(), page++);
    			}  
			});
		};

		//Bind the event handlers
		var setBindings = function(){
			$resultList.on('click', '.' + resultItem, function(event) {
				event.preventDefault();
				selectedImage = $(this).children('img').clone(true, true);
				showEmbedOptions(selectedImage);
			});
			$listView.on('click', function(event){
				event.preventDefault();
				showListView();
			});
			$searchField.on('keypress', function(event) {
				if( event.keyCode == 13){
					event.preventDefault();
					$resultList.html('');
					page = 1;
					serviceCall($searchField.val(), page);
				}
				else{
					//maybe do something else
				};
			});
			$publishButton.on('click', function (event) {
				event.preventDefault();
				htmlToPublish = '';
				imgUrl = '';
				imgTitle = $imageTitle.val();
				imgSize = $('input[name=media-embed-module-size]:checked', '.media-embed-module-sizes').val();
				switch (imgSize) {
					case 'small':
						imgUrl = $currentImage.data('smallurl');
						break;
					case 'medium':
						imgUrl = $currentImage.data('mediumurl');
						break;
					case 'large':
						imgUrl = $currentImage.data('largeurl');
						break;
				}

				linkOpenLocation = $('input[name=media-embed-module-tab]:checked').val();

				switch (linkOpenLocation) {
					case 'same-tab':
						target = "_self";
						break;
					case 'new-tab':
						target = "_blank";
						break;
				}


				linkValue = $('.media-embed-module-link-location').val();

				if (linkValue.length > 5) {
					htmlToPublish = "<a target='" + target + "'' href='" + linkValue + "'><img alt='" + imgTitle + "' class='" + $imageClass.val() + "'src='" + imgUrl + "'</a>";
				} else {
					htmlToPublish = "<img alt='" + imgTitle + "' class='" + $imageClass.val() + "' src='" + imgUrl + "'>";
				}
				if (debug.on) {
					console.log(htmlToPublish);
				}
				embedLink = htmlToPublish;
				$('.submit-link').click();
			});
		};

		//Show the backside of the embed module.
		var showEmbedOptions = function(image){
			$currentImage = image;
			$previewContainer.html(image);
			$imageTitle.val(image.data('title'));
			console.log(image.data('title'));
			$module.addClass(embedOptionsClass);
		};

		//Show the front size of the embed module
		var showListView = function(image){
			$module.removeClass(embedOptionsClass);
		};

		//Set the functions to be called on initialize.
		var init = function(){
			if (debug.on){
				debugData();
			}
			setBindings();
			infiniteScrollInit();
			window.setTimeout(serviceCall($searchField.val(), page),500);
		};
		//Return only the init function, keeping all others private.
		return{
			init : init
		}

	})(jQuery);

//Call The init function
mediaEmbedModule.populate.init();