// node_modules/@aws-sdk/nested-clients/package.json
var package_default = {
  name: "@aws-sdk/nested-clients",
  version: "3.730.0",
  description: "Nested clients for AWS SDK packages.",
  main: "./dist-cjs/index.js",
  module: "./dist-es/index.js",
  types: "./dist-types/index.d.ts",
  scripts: {
    build: "yarn lint && concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
    "build:cjs": "node ../../scripts/compilation/inline nested-clients",
    "build:es": "tsc -p tsconfig.es.json",
    "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
    "build:types": "tsc -p tsconfig.types.json",
    "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
    clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
    lint: "node ../../scripts/validation/submodules-linter.js --pkg nested-clients",
    test: "yarn g:vitest run",
    "test:watch": "yarn g:vitest watch"
  },
  engines: {
    node: ">=18.0.0"
  },
  author: {
    name: "AWS SDK for JavaScript Team",
    url: "https://aws.amazon.com/javascript/"
  },
  license: "Apache-2.0",
  dependencies: {
    "@aws-crypto/sha256-browser": "5.2.0",
    "@aws-crypto/sha256-js": "5.2.0",
    "@aws-sdk/core": "3.730.0",
    "@aws-sdk/middleware-host-header": "3.723.0",
    "@aws-sdk/middleware-logger": "3.723.0",
    "@aws-sdk/middleware-recursion-detection": "3.723.0",
    "@aws-sdk/middleware-user-agent": "3.730.0",
    "@aws-sdk/region-config-resolver": "3.723.0",
    "@aws-sdk/types": "3.723.0",
    "@aws-sdk/util-endpoints": "3.730.0",
    "@aws-sdk/util-user-agent-browser": "3.723.0",
    "@aws-sdk/util-user-agent-node": "3.730.0",
    "@smithy/config-resolver": "^4.0.0",
    "@smithy/core": "^3.0.0",
    "@smithy/fetch-http-handler": "^5.0.0",
    "@smithy/hash-node": "^4.0.0",
    "@smithy/invalid-dependency": "^4.0.0",
    "@smithy/middleware-content-length": "^4.0.0",
    "@smithy/middleware-endpoint": "^4.0.0",
    "@smithy/middleware-retry": "^4.0.0",
    "@smithy/middleware-serde": "^4.0.0",
    "@smithy/middleware-stack": "^4.0.0",
    "@smithy/node-config-provider": "^4.0.0",
    "@smithy/node-http-handler": "^4.0.0",
    "@smithy/protocol-http": "^5.0.0",
    "@smithy/smithy-client": "^4.0.0",
    "@smithy/types": "^4.0.0",
    "@smithy/url-parser": "^4.0.0",
    "@smithy/util-base64": "^4.0.0",
    "@smithy/util-body-length-browser": "^4.0.0",
    "@smithy/util-body-length-node": "^4.0.0",
    "@smithy/util-defaults-mode-browser": "^4.0.0",
    "@smithy/util-defaults-mode-node": "^4.0.0",
    "@smithy/util-endpoints": "^3.0.0",
    "@smithy/util-middleware": "^4.0.0",
    "@smithy/util-retry": "^4.0.0",
    "@smithy/util-utf8": "^4.0.0",
    tslib: "^2.6.2"
  },
  devDependencies: {
    concurrently: "7.0.0",
    "downlevel-dts": "0.10.1",
    rimraf: "3.0.2",
    typescript: "~5.2.2"
  },
  typesVersions: {
    "<4.0": {
      "dist-types/*": [
        "dist-types/ts3.4/*"
      ]
    }
  },
  files: [
    "./sso-oidc.d.ts",
    "./sso-oidc.js",
    "./sts.d.ts",
    "./sts.js",
    "dist-*/**"
  ],
  browser: {
    "./dist-es/nested-sso-oidc/runtimeConfig": "./dist-es/nested-sso-oidc/runtimeConfig.browser",
    "./dist-es/nested-sts/runtimeConfig": "./dist-es/nested-sts/runtimeConfig.browser"
  },
  "react-native": {},
  homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients",
  repository: {
    type: "git",
    url: "https://github.com/aws/aws-sdk-js-v3.git",
    directory: "packages/nested-clients"
  },
  exports: {
    "./sso-oidc": {
      module: "./dist-es/submodules/sso-oidc/index.js",
      node: "./dist-cjs/submodules/sso-oidc/index.js",
      import: "./dist-es/submodules/sso-oidc/index.js",
      require: "./dist-cjs/submodules/sso-oidc/index.js",
      types: "./dist-types/submodules/sso-oidc/index.d.ts"
    },
    "./sts": {
      module: "./dist-es/submodules/sts/index.js",
      node: "./dist-cjs/submodules/sts/index.js",
      import: "./dist-es/submodules/sts/index.js",
      require: "./dist-cjs/submodules/sts/index.js",
      types: "./dist-types/submodules/sts/index.d.ts"
    }
  }
};

export {
  package_default
};
