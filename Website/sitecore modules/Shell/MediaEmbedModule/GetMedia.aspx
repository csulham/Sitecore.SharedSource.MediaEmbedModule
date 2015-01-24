<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GetMedia.aspx.cs" Inherits="Website.sitecore_modules.Shell.MediaEmbedModule.GetMedia" %>

<!DOCTYPE html>
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
</head>
<body>
		<form id="form1" runat="server">
	<div class="sitecore-shared-source-media-embed-module">
		<div class="media-embed-module-front">
			<div class="media-embed-module-search-container">
				<asp:TextBox ID="SearchBox" runat="server" CssClass="media-embed-module-search-field"></asp:TextBox>
			</div>
			<div class="media-embed-module-media-container">
				<ul class="media-embed-module-results">
	<asp:Repeater runat="server" ID="MediaEmbedRepeater" ItemType="FlickrNet.Photo" >
		<HeaderTemplate>
			<%--Flickr Photos<br />--%>
		</HeaderTemplate>

		<ItemTemplate>
			<li class="media-embed-module-result medium-button"><a href="#" onclick="insertLink('<%#: Item.Small320Url %>');"><img src="<%#: Item.Small320Url %>" /></a>
				<ul class="media-embed-buttons"><li class="small-button">Small</li><li class="medium-button">Medium</li><li class="large-button">Large</li></ul>
			</li>
		</ItemTemplate>
		<FooterTemplate>
		
		</FooterTemplate>

	</asp:Repeater>
					</ul>
			</div>
		</div>
		<div class="media-embed-module-back">
		</div>
	</div>

		<div>
			<input type="button" value="Close" onclick="getRadWindow().close();" />	
			
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
