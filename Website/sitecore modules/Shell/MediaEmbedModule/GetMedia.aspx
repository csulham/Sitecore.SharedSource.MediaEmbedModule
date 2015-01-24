<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GetMedia.aspx.cs" Inherits="Website.sitecore_modules.Shell.MediaEmbedModule.GetMedia" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>
	<script language="javascript" type="text/javascript">
		var selected = "";
	</script>
</head>
<body>
	<asp:Repeater runat="server" ID="MediaEmbedRepeater" ItemType="FlickrNet.Photo" >
		<HeaderTemplate>
			Flickr Photos<br />
		</HeaderTemplate>

		<ItemTemplate>
			<a href="#" onclick="insertLink('<%#: Item.Small320Url %>');"><img src="<%#: Item.Small320Url %>" /></a><br />
		</ItemTemplate>

		<FooterTemplate>
			...
		</FooterTemplate>

	</asp:Repeater>
	<form id="form1" runat="server">
		<div>
			<input type="button" value="Close" onclick="insertLink(selected);" />	
			
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
