# React Hook Multipart

> Not ready for production 🚧

Is a fast and efficient hook for upload big files with multipart streams in a SSR React environment.

I'm currently working on implementing Web Streams 🚬👷🏼

Install it like so:

```js
npm i git+https://github.com/blissito/react-hook-multipart.git
```

WIP: Not yet ready with dits bundlers...

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

## How to use it

### Use the handler in your React Router Framework server action

```js
import { createAsset } from "~/.server/db";
import { handler } from "react-hook-multipart";
import { getUserOrRedirect } from "~/.server/getters";
import type { Route } from "./+types/experiment";

export const action = async ({ request }: Route.ActionArgs) =>
  await handler(request, async (complete) => {
    const user = await getUserOrRedirect(request);
    // create on DB
    createAsset({
      fileMetadata: {
        ...complete.metadata,
        originalName: complete.metadata.name,
      },
      size: complete.size,
      storageKey: complete.key,
      userId: user.id,
      contentType: complete.contentType,
      status: "uploaded",
    });
    return new Response(JSON.stringify(complete));
  });
```

### Use the hook in your React Component

```js
import { useUploadMultipart } from "react-hook-multipart/react";
// ...
const { upload } = useUploadMultipart({
  onUploadProgress: ({ percentage }) => {},
});
// ...
// this handler should be conected to a <input type="file" onChange={handleChange} />
const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.currentTarget.files?.[0];
  if (!file) return;

  try {
    const { access, completedData, key, metadata, uploadId, url } =
      await upload(file?.name, file);
  } catch (erro) {
    // do whatever with the error
  }
};
```

## Underneath

This package uses `@aws-sdk/s3-request-presigner` and `@aws-sdk/client-s3` underneath.

> Made with 🚬🫁 by [Fixter.org](http://fixter.org)
