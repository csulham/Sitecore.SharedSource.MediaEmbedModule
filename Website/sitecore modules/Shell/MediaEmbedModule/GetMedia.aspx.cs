using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FlickrNet;
using Sitecore.Mvc.Extensions;

namespace Website.sitecore_modules.Shell.MediaEmbedModule
{
	public partial class GetMedia : System.Web.UI.Page
	{
        private FlickrForm tags = new FlickrForm();
		protected void Page_Load(object sender, EventArgs e)
		{
            var flickr = new Flickr(ConfigurationManager.AppSettings["FlickrApiKey"], ConfigurationManager.AppSettings["FlickrSecret"]);

            //flickr.

            var options = new PhotoSearchOptions();
            options.PerPage = 9;
            options.Tags = tags.TagList = SearchBox.Text;
            options.SafeSearch = SafetyLevel.Moderate;
            options.Page = tags.Page;

			if (string.IsNullOrEmpty(SearchBox.Text))
			{
				options.Tags = "Trees";
			}
            tags.Results = flickr.PhotosSearch(options);

			MediaEmbedRepeater.DataSource = tags.Results;
			MediaEmbedRepeater.DataBind();
		}

		//protected void BindRepeater(object sender, RepeaterItemEventArgs e)
		//{
		//	throw new NotImplementedException();
		//}
	}


    public class FlickrForm
    {
        public string TagList { get; set; }
        public PhotoCollection Results { get; set; }
        public int Page { get; set; }
    }
}