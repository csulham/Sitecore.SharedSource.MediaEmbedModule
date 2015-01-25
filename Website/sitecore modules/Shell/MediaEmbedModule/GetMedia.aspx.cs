using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

using FlickrNet;

using Sitecore.Mvc.Extensions;

namespace Website.sitecore_modules.Shell.MediaEmbedModule
{
	using Sitecore.Configuration;
	using Sitecore.Data;
	using Sitecore.Data.Items;
	using Sitecore.Diagnostics;

	public partial class GetMedia : System.Web.UI.Page
	{
		private FlickrForm tags = new FlickrForm();

		protected void Page_Load(object sender, EventArgs e)
		{
			//var flickr = new Flickr(ConfigurationManager.AppSettings["FlickrApiKey"], ConfigurationManager.AppSettings["FlickrSecret"]);
			//var options = new PhotoSearchOptions();			
			//options.Tags = tags.TagList = SearchBox.Text;
			//options.SafeSearch = SafetyLevel.Moderate;
			//int page;
			//int.TryParse(PageNumber.Text, out page);
			//options.Page = page;
			//options.PerPage = 9;

			//PageNumber.Text = page.ToString();

			//if (string.IsNullOrEmpty(SearchBox.Text))
			//{
			//	options.Tags = "Trees";
			//}
			//tags.Results = flickr.PhotosSearch(options);

			//MediaEmbedRepeater.DataSource = tags.Results;
			//MediaEmbedRepeater.DataBind();

			//PageNumber.Text = "1";
		}

		//protected void BindRepeater(object sender, RepeaterItemEventArgs e)
		//{
		//	throw new NotImplementedException();
		//}
		protected void NextPage(object sender, EventArgs e)
		{
			var s = "";
		}

		[WebMethod()]
		public static PhotoCollection GetMore(string search, int page)
		{
			var flickrSettings = GetFlickrSettings();
			if (flickrSettings == null)
			{
				Log.Error("Flickr API settings not found, reinstall Media Embed Module.", typeof(GetMedia));
				return new PhotoCollection();
			}

			var flickr = new Flickr(flickrSettings.Fields["API Key"].Value, flickrSettings.Fields["API Secret"].Value);
			flickr.InstanceCacheDisabled = true;
			
			var options = new PhotoSearchOptions();
			int perPage = 9;
			Int32.TryParse(flickrSettings.Fields["Results Per Page"].Value, out perPage);
			options.PerPage = perPage;
			if (string.IsNullOrEmpty(search))
				search = flickrSettings.Fields["Defaults Tags"].Value;
			if (string.IsNullOrEmpty(search))
				return new PhotoCollection();
			options.Tags = search;
			options.SafeSearch = SafetyLevel.Moderate;
			options.Page = page;

			return flickr.PhotosSearch(options);
		}

		protected static Item GetFlickrSettings()
		{
			using (new DatabaseSwitcher(Factory.GetDatabase("master")))
			{
				return Sitecore.Context.Database.GetItem("{0743F83B-6D09-472C-97AB-4D4E4F3F16D1}");
			}
		}
	}

	public class FlickrForm
	{
		public string TagList { get; set; }

		public PhotoCollection Results { get; set; }

		public int Page { get; set; }
	}
}