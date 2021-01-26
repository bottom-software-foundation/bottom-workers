# Bottom Workers

## Technologies Usd

- bottomify
- wasm-pack
- cloudflare workers


## Deployment

Cloudflare workers tto allow encoding and decoding of bottom.

To deploy you need the `wrangler` cli that can be downloaded using

```shell
npm i -g @cloudflare/wrangler
```

Login using `wrangler login` and set the account_id variable in the wrangler.toml file.
(Account id can be found after login using `wrangler whoami`)

Then simpy run 
`wrangler publish` and your worker should be running on cloudflare