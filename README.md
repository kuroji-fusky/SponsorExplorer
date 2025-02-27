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

See [CONTRIBUTING.md](/CONTRIBUTING.md).

## License

[MIT](/LICENSE)

[sbb]: https://github.com/Lartza/SBbrowser
[sbb-prod]: https://sb.ltn.fi/
[sb]: https://github.com/ajayyy/SponsorBlock
