# SponsorExplorer

A modern rewrite of Lanrza's [SBBrowser][sbb] with more features and a more fancy and intuitive UI for
browsing [SponsorBlock][sb] segments and chapters!

![SponsorExplorer Segment View Example](https://github.com/kurojifusky/SponsorExplorer/assets/165645282/05b2ca27-c89a-4a00-830d-93a324882268)
![SponsorExplorer LTT Example](https://github.com/kurojifusky/SponsorExplorer/assets/165645282/32a03560-232a-48cd-8c47-49ceabfcbee7)

## Feature Roadmap

- ✅ Display submitted segments
- ✅ View submitted from username/UUID via [sb.ltn.fi][sbb-prod]
- 🚧 Play and filter segments
- 🚧 Realtime changes for segments for one or more videos
- 🚧 Watchlist for YT videos, playlist, as well as usernames/userIDs
- 🚧 In-depth stats about submitted segments in videos, channels, and from usernames/userIDs
- ✅ Browse segments on YouTube channels
- 🚧 **[NEW!]** Timeline view of all submitted segments, including downvoted and shadowhidden
  segments except hidden segments from duration change

## Inspiration

While I was in the middle of writing a userscript for [sb.ltn.fi][sbb-prod] to append titles and thumbnails using the YouTube API, along with other enhancements, I had this idea to remake SBbrowser but with an approach to a modern redesign and all the different features such as segment playback, a watchlist, etc.

### Differences

|                          | SBbrowser                | SponsorExplorer                                   |
| :----------------------- | :----------------------- | :------------------------------------------------ |
| Filter and sort segments | ✅                       | Has added functionality to filter locked segments |
| Playback videos          | Directly uses `<iframe>` | Mounts `<iframe>` client-side                     |

If SponsorBlock API returns a `5xx` response, it automatically falls back and crawls [sb.ltn.fi][sbb-prod] for cached data via [SBbrowser-API-Wrapper](https://github.com/kuroji-fusky/SBbrowser-API-Wrapper).

### Caveats with the YouTube player

The YouTube embed player has a feature on when, if copyrighted content is present, the player will return a vague "Video unavailable" error and block playback.[^1] This issue isn't present when mounting the player client-side via `new YT.Player` since it adds necessary headers that will allow playback of copyrighted content; except when the video is either private, taken down, age-restricted, members only, or when the uploader chooses to forbid their content from being embedded from other websites.[^2]

[^1]: <https://help.myfitapp.de/en/articles/5450810-youtube-videos-showing-video-unavailable>

[^2]: <https://stackoverflow.com/questions/51424578/embed-youtube-code-is-not-working-in-html/55661292#55661292>

## Installation and Setup

Requires Node.js v20 or higher and the PNPM package manager

Clone the repo and the SBbrowser API submodule

```console
git clone --recurse-submodules https://github.com/kuroji-fusky/SponsorExplorer
```

Install root dependencies

```console
cd ..
pnpm install
pnpm run dev
```

Then install the submodule's dependencies then run the dev server

```console
cd sbbrowser-api
pnpm install
```

Copy the .env.local.example file

```console
cp .env.local.example .env.local
```

### Getting the YouTube API key

1. Create a project on <https://console.cloud.google.com>, skip this step if you already have a project on Google Cloud Platform
1. Look for "APIs & Services" or type "api and services" in the search bar
1. Click on "Enable APIs and Services", just below the search bar; that will take you to the API Library page
1. Search for "youtube data api", and you'll see a result for "YouTube Data API v3", then enable it
   - If you're lazy or you're in a pinch, [click on this link](https://console.cloud.google.com/apis/library/youtube.googleapis.com)
1. Once enabled, click on Manage; on the left side, go to Credentials, click "Create Credientals" and choose "API key"
1. Copy the API key provided and add it as an environment variable as `YT_API_KEY`

> [!WARNING]
>
> The YouTube Data API has a default quota limit of 10,000 cost per day and it can impact the core functionality of SponsorExplorer, so its search function has a limit of 20 search queries to mitigate the quota limit. You can increase the 10,000 cap within GCP, but it's a tedious process.
>
> **Breakdown of costs used for SponsorExplorer**[^3]
>
> | Method               | Cost |
> | :------------------- | ---- |
> | `videos.list`        | 1    |
> | `playlistItems.list` | 1    |
> | `channels.list`      | 1    |
> | `search.list`        | 100  |

[^3]: <https://developers.google.com/youtube/v3/determine_quota_cost>

### (Optional) Securing your API key

Optionally, as an added security layer, you can restrict the API key you've created, since they're unrestricted. By clicking on "Edit API key" on the dialog box or by clicking on the three dots on the right and clicking "Edit API key"

1. Under "Set an application restriction", choose "Websites"
1. On "Website restrictions", add an item with the field `localhost:3000`, then click Done
1. Choose "Restrict key" under "API restrictions". On the dropdown menu, choose the YouTube API by filtering the results and click on the checkmark
1. Save your changes

## License

[MIT](/LICENSE)

[sbb]: https://github.com/Lartza/SBbrowser
[sbb-prod]: https://sb.ltn.fi/
[sb]: https://github.com/ajayyy/SponsorBlock
