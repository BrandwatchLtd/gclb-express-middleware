# gclb-express-middleware

For node applications behind a Google Cloud Load Balancer. Sometimes you want them to be aware of the GCLB in-front.

## API

### `redirectToHttps`

Redirect (301 status code) any non-HTTPS requests to the HTTPS equivalent.

```
var gclb = require('gclb-express-middleware');
express.use(gclb.redirectToHttps())

```

### `blockNonHttps`

Block any non-HTTPS requests by just returning a 404 HTTP status.

```
var gclb = require('gclb-express-middleware');
express.use(gclb.blockNonHttps())

```
