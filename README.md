# React Hook Multipart

Is a fast and efficient hook for upload big files with multipart streams in a SSR React environment.

I'm currently working on implementing Web Streams 🚬👷🏼

Install it like so:

```js
npm install @blissito/react-hook-multipart
```

## Create ENV vars

You need to set all these five env variables, either by exporting them or writem down in your .env file

```js
AWS_REGION = "auto";
AWS_ENDPOINT_URL_S3 = "https://fly.storage.tigris.dev";
BUCKET_NAME = "blissmo-bucket";
AWS_ACCESS_KEY_ID = "Tu access key";
AWS_SECRET_ACCESS_KEY = "Tu secret";
```

## Underneath

This package uses `@aws-sdk/s3-request-presigner` and `@aws-sdk/client-s3` underneath.

> Made with 🚬🫁 by [Fixter.org](http://fixter.org)
