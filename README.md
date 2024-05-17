# SponsorExplorer

A modern rewrite of Lanrza's [SBBrowser][sbb] and with more features and an intuitive UI!

## Installation and Setup

Requires Node.js v20 and the Yarn package manager - install dependencies with
Yarn and start local dev server:

```console
yarn
yarn dev
```

### Getting the YouTube API key

1. Create a project on <https://console.cloud.google.com>, skip this step if you already have a project on Google Cloud Platform
1. Look for "APIs & Services" or type "api and services" in the search bar
1. Click on "Enable APIs and Services", just below the search bar; that will take you to the API Library page
1. Search for "youtube data api", and you'll see a result for "YouTube Data API v3" and enable it
   - If you're lazy or you're in a pinch, [click on this link](https://console.cloud.google.com/apis/library/youtube.googleapis.com)
1. Once in enabled, click on Manage; on the left side, go to Credentials, click "Create Credientals" and choose "API key"
1. Copy the API key provided and add it as an environment variable as `SECRET_YT_DATA_API_KEY`

### (Optional) Securing your API key

Optionally, as an added layer of security, you can add restrict the API key you just created, since they're unrestricted. By clicking on "Edit API key" on the dialog box or by clicking on the three dots on the right and clicking "Edit API key"

1. Under "Set an application restriction", choose "Websites"
1. On "Website restrictions", add an item with the field `localhost:5173`, then click Done
1. Choose "Restrict key" under "API restrictions". On the dropdown menu, choose the YouTube API by filtering the results and click on the checkmark
1. Save your changes

## License

[MIT](/LICENSE)

[sbb]: https://github.com/Lartza/SBbrowser
