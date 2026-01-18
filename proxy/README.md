# SponsorExplorer Proxy API

To alleviate the issues of quota limits and repetitive, redundant requests, an API proxy is necessary to handle caching, load balancing, and handling optimistic updates for new submitted segments and metadata from videos and channels. Combining APIs from:

- SponsorBlock
- YouTube Data API
- Filmot: retriving cached YouTube videos/channels that are either private or deleted
- sb.ltn.fi: only for accessing VIP users

## Endpoints

- `/status`
- `/ping`
- `/cache`
- `/sb/vip_users`
- `/sb/user/:username_uuid`
- `/sb/user/:username_uuid/analysis{?bypass_cache}`
- `/sb/uuid/:uuid{?bypass_cache}`
- `/sb/skipSegments{?id,bypass_cache,passive_update}`
- `/sb/searchSegments/:id{?bypass_cache,continue_fragment}`
- `/yt/channel/:id{?bypass_cache}`
- `/yt/channel/:id/analysis{?bypass_cache,sample_size}`
- `/yt/video/:id{?bypass_cache}`

## Development

Install `air`:

```console
go install github.com/air-verse/air@latest
```

and run the server with just:

```console
air
```
