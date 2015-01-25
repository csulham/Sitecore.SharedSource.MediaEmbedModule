<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GetMedia.aspx.cs" Inherits="Website.sitecore_modules.Shell.MediaEmbedModule.GetMedia" %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="css/style.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/masonry/3.2.2/masonry.pkgd.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/sharing_module.js" type="text/javascript" charset="utf-8" async></script>
	<script src="js/imagesloaded.js" type="text/javascript" charset="utf-8" async></script>
</head>
<body>
<form id="form1" runat="server">
    <div class="sitecore-shared-source-media-embed-module">
        <div class="media-embed-module-front">
            <div class="media-embed-module-search-container">
                <input class="media-embed-module-search-field" type="text" placeholder="Search By Tag, title or user">
            </div>
            <div class="media-embed-module-media-container">
                <ul class="media-embed-module-results">


                </ul>
            </div>
        </div>
        <div class="media-embed-module-back">
            <div class="media-embed-module-options-container">
                <div class="media-embed-module-preview">
                </div>
                <div class="media-embed-module-options">
                    <h1>Image Embed Settings </h1>
                    <fieldset class="media-embed-module-sizes">
                        <legend>Image Size</legend>
                        <input type="radio" name="media-embed-module-size" id="media-embed-module-size-small" value="small" checked>
                        <label for="media-embed-module-size-small">Small</label>

                        <input type="radio" name="media-embed-module-size" value="medium" id="media-embed-module-size-medium">
                        <label for="media-embed-module-size-medium">Medium</label>

                        <input type="radio" name="media-embed-module-size" value="large" id="media-embed-module-size-large">
                        <label for="media-embed-module-size-large">Large</label>

                    </fieldset>
                    <fieldset>
                        <legend>Image Properties</legend>

                        <labeL>Add Classes to image</labeL>
                        <input class="media-embed-module-image-classes" type="text" placeholder="large, profile-view">

                        <labeL>Alt Text</labeL>
                        <input type="text" placeholder="Text to display when hovered">
                    </fieldset>

                    <fieldset class="media-embed-module-link">
                        <legend>Link (optional)</legend>

                        <labeL>Link Location</labeL>
                        <input class="media-embed-module-link-location" type="text" placeholder="http://sitecore.com">
                        <input type="radio" name="media-embed-module-tab" value="same-tab" id="media-embed-module-same-tab" checked>
                        <label for="media-embed-module-same-tab">Same Tab</label>

                        <input type="radio" name="media-embed-module-tab" value="new-tab" id="media-embed-module-new-tab">
                        <label for="media-embed-module-new-tab">New tab</label>
                    </fieldset>
                    <div class="media-embed-module-options-controls">
                        <button class="media-embed-module-backbutton">Back to Image Results</button>
                        <button class="media-embed-module-publish">Embed Image</button>
						<a href="#" class="submit-link" style="display: none;" onclick="insertLink(embedLink);"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
		<script language="javascript" type="text/javascript">

			if (window.attachEvent) {
				window.attachEvent("onload", initDialog);
			}
			else if (window.addEventListener) {
				window.addEventListener("load", initDialog, false);
			}


			function getRadWindow() {
				if (window.radWindow) {
					return window.radWindow;
				}
				if (window.frameElement && window.frameElement.radWindow) {
					return window.frameElement.radWindow;
				}
				return null;
			}

			function initDialog() {
				var clientParameters = getRadWindow().ClientParameters; //return the arguments supplied from the parent page

				// can pass stuff in via client parameters

				// put other initialization logic here
			}

			function insertLink(link) //fires when the Insert Link button is clicked
			{


				getRadWindow().close(link);
				//use the close function of the getRadWindow to close the dialog and 
				//pass the arguments from the dialog to the callback function on the main page.
			}
		</script>
	</form>
	
</body>
</html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
	
</head>
<body>
	
</body>
</html>
