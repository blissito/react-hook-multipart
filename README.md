# React Hook Multipart

> Not for production yet 🚧 Tests & Type definitions missing

Is a fast and efficient hook for upload big files with multipart streams in a SSR React environment.

> 👀 It will split the file into multiple parts, upload them in parallel and retry failed parts.

I'm currently working on implementing Web Streams 🚬👷🏼 Al final, creo que no implementaré streams. Lo que estoy haciendo con el `slice()` del blob es suficientemente compatible.
Mejor me concentro en el abort signal...

Install it like so:

```js
npm i react-hook-multipart
```

## Create ENV vars

You need to set all these five env variables, either by exporting them or write'em down in your .env file

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
// app/routes/api/experiment.ts

import type { Route } from "./+types/experiment";
import { createAsset } from "~/.server/db";
import { getUserOrRedirect } from "~/.server/getters";
// import the handdler
import { handler } from "react-hook-multipart";

export const action = async ({ request }: Route.ActionArgs) => {
  const user = await getUserOrRedirect(request);
  // your cb is called only on complete
  return await handler(
    request,
    async ({ metadata, size, key, contentType }) => {
      // create on DB
      createAsset({
        metadata: metadata,
        size: size,
        storageKey: key,
        contentType: contentType,

        status: "uploaded",
        userId: user.id,
      });
      return new Response(JSON.stringify({ ok: true }));
    }
  );
};
```

### Use the hook in your React Component

```js
// any react component

import { useUploadMultipart } from "react-hook-multipart/react";

const { upload } = useUploadMultipart({
  onUploadProgress({ percentage }) {
    setProgress(percentage); // your own state ✅
  },
  access: "public-read", // or private
  handler: "/api/upload", // your own resource route ㊮
  signal: new AbortController(), // @todo about to implement... 👷🏼‍♂️
});

const handleUpload = async (event) => {
  const file = event.currentTarget.files?.[0];
  const { key, url } = await upload(file.name, file);
};
```

You can use `try{}catch(){}` blocks to capture any error.

```ts
// ...
const [progress, setProgress] = useState(0);

const putFile = async (file: File) => {
  await upload(file.name, file, ({ percentage }) => setProgress(percentage));
  //                                     ^ you can pass any function to update the progress
};
// ...
```

You can also pass the progress handler as the third paramether to the upload function.

## Underneath

This package uses `@aws-sdk/s3-request-presigner` and `@aws-sdk/client-s3` underneath.

> Made with 🚬🫁 by [Fixter.org](http://fixter.org)
