# Contributing

Requires [Node.js v20 or higher](https://nodejs.org) and the PNPM package manager

## Cloning submodules

Clone the repo and its submodules

```console
git clone --recurse-submodules https://github.com/kuroji-fusky/SponsorExplorer
```

If you already cloned the repoistory _without_ any of the submodules, you can pull it with:

```console
git submodule update --init --recursive
```

## Installing dependencies

1. Install dependencies with `pnpm`

   ```console
   pnpm install
   ```

1. Copy the `.env.example` file as `.env`

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
> **Breakdown of costs used for SponsorExplorer**[^1]
>
> | Method               | Cost |
> | :------------------- | ---- |
> | `videos.list`        | 1    |
> | `playlistItems.list` | 1    |
> | `channels.list`      | 1    |
> | `search.list`        | 100  |

[^1]: <https://developers.google.com/youtube/v3/determine_quota_cost>

#### (Optional) Securing your API key

As an added security layer, you can restrict the API key you've created, since they're unrestricted. By clicking on "Edit API key" on the dialog box or by clicking on the three dots on the right and clicking "Edit API key"

1. Under "Set an application restriction", choose "Websites"
1. On "Website restrictions", add an item with the field `localhost:3000`, then click Done
1. Choose "Restrict key" under "API restrictions". On the dropdown menu, choose the YouTube API by filtering the results and click on the checkmark
1. Save your changes

## Self-hosting with Docker

WIP
