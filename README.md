# SponsorExplorer

A modern rewrite of Lanrza's [SBBrowser][sbb] with more features and a more fancy and intuitive UI!

![SponsorExplorer Segment View Example](https://github.com/kurojifusky/SponsorExplorer/assets/165645282/05b2ca27-c89a-4a00-830d-93a324882268)
![SponsorExplorer LTT Example](https://github.com/kurojifusky/SponsorExplorer/assets/165645282/32a03560-232a-48cd-8c47-49ceabfcbee7)

## Features

- ✅ Display submitted segments
- 🚧 Play and filter segments
- 🚧 Realtime changes for segments for one or more videos
- 🚧 Group skip/mute segments and full video labels
- 🚧 Watchlist for YT videos, playlist, as well as usernames/userIDs
- 🚧 In-depth stats about submitted segments in videos, channels, and from usernames/userIDs
- 🚧 Browse segments on YouTube channels

## Inspiration

While I was in the middle of writing a [Tampermonkey script for sb.ltn.fi][tm-script] to append titles and thumbnails using the YouTube API, along with other enhancements, I had this idea to remake SBbrowser but with an approach to a modern redesign and all the different features such as segment playback, a watchlist, etc.

## Installation and Setup

Requires Node.js v20 and the Yarn package manager - install dependencies with
Yarn and start local dev server:

```console
yarn
yarn dev
```

### Getting the YouTube API key

1. Create a project on <https://console.cloud.google.com>, skip this step if you already have a project on the Google Cloud Platform
1. Look for "APIs & Services" or type "api and services" in the search bar
1. Click on "Enable APIs and Services", just below the search bar; that will take you to the API Library page
1. Search for "youtube data api", and you'll see a result for "YouTube Data API v3" and enable it
   - If you're lazy or you're in a pinch, [click on this link](https://console.cloud.google.com/apis/library/youtube.googleapis.com)
1. Once enabled, click on Manage; on the left side, go to Credentials, click "Create Credientals" and choose "API key"
1. Copy the API key provided and add it as an environment variable as `SECRET_YT_DATA_API_KEY`

### (Optional) Securing your API key

Optionally, as an added security layer, you can restrict the API key you've created, since they're unrestricted. By clicking on "Edit API key" on the dialog box or by clicking on the three dots on the right and clicking "Edit API key"

1. Under "Set an application restriction", choose "Websites"
1. On "Website restrictions", add an item with the field `localhost:5173`, then click Done
1. Choose "Restrict key" under "API restrictions". On the dropdown menu, choose the YouTube API by filtering the results and click on the checkmark
1. Save your changes

## License

[MIT](/LICENSE)

[sbb]: https://github.com/Lartza/SBbrowser
[tm-script]: https://gist.github.com/kurojifusky/fa875e94799a6d9f1d40c76c1f6c20ec
