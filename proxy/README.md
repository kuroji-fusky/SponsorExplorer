# SponsorExplorer Proxy API

To alleviate the issues of quota limits and repetitive, redundant requests, an API proxy is necessary to handle caching, load balancing, and handling optimistic updates for new submitted segments and metadata from videos and channels. Combining APIs from:

- SponsorBlock
- YouTube Data API
- Filmot: retriving cached YouTube videos/channels that are either private or deleted
- sb.ltn.fi: only for accessing VIP users

## Endpoints

### Maintenance/Server uptime

- [x] `/status`
- [x] `/ping`
- [ ] `/cache`

### Segments

### Users

- [ ] `/sb/vip_users`
- [ ] `/sb/user/:username_uuid`
- [ ] `/sb/user/:username_uuid/analysis{?bypass_cache}`

### Common

- [x] `/channel/:id{?bypass_cache}`
- [ ] `/channel/:id/analysis{?bypass_cache,sample_size}`
- [x] `/video/:id{?bypass_cache}`
- [ ] `/video/:id/segments{?bypass_cache,update}`

## Development

1. Run Redis instance via `docker-compose.yml`:

    ```bash
    cd ..
    docker-compose up -d
    ```

2. Install `air`:

    ```bash
    cd -
    go install github.com/air-verse/air@latest
    ```

3. Run the server with just:

    ```console
    air
    ```

