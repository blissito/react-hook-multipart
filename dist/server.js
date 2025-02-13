import {
  ENV_KEY,
  ENV_SECRET,
  fromEnv
} from "./chunk-FCN3DRKA.js";
import {
  loadRestXmlErrorCode,
  parseXmlBody,
  parseXmlErrorBody
} from "./chunk-G32PDLDO.js";
import {
  AwsSdkSigV4ASigner,
  AwsSdkSigV4Signer,
  DEFAULT_RETRY_MODE,
  DefaultIdentityProviderConfig,
  EndpointCache,
  Hash,
  NODE_APP_ID_CONFIG_OPTIONS,
  NODE_MAX_ATTEMPT_CONFIG_OPTIONS,
  NODE_REGION_CONFIG_FILE_OPTIONS,
  NODE_REGION_CONFIG_OPTIONS,
  NODE_RETRY_MODE_CONFIG_OPTIONS,
  NODE_SIGV4A_CONFIG_OPTIONS,
  NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,
  NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,
  SelectorType,
  SignatureV4,
  awsEndpointFunctions,
  booleanSelector,
  calculateBodyLength,
  createDefaultUserAgentProvider,
  customEndpointFunctions,
  emitWarningIfUnsupportedVersion,
  getAwsRegionExtensionConfiguration,
  getContentLengthPlugin,
  getEndpointFromInstructions,
  getEndpointPlugin,
  getHostHeaderPlugin,
  getHttpAuthSchemeEndpointRuleSetPlugin,
  getHttpSigningPlugin,
  getLoggerPlugin,
  getRecursionDetectionPlugin,
  getRetryPlugin,
  getSerdePlugin,
  getSmithyContext,
  getUserAgentPlugin,
  httpSigningMiddlewareOptions,
  normalizeProvider,
  resolveAwsRegionExtensionConfiguration,
  resolveAwsSdkSigV4AConfig,
  resolveAwsSdkSigV4Config,
  resolveDefaultsModeConfig,
  resolveEndpoint,
  resolveEndpointConfig,
  resolveHostHeaderConfig,
  resolveParams,
  resolveRegionConfig,
  resolveRetryConfig,
  resolveUserAgentConfig,
  setFeature
} from "./chunk-T4RFJPJI.js";
import {
  loadConfig,
  parseUrl
} from "./chunk-GZGP43GC.js";
import {
  Client,
  Command,
  HttpRequest,
  HttpResponse,
  NoOpLogger,
  NodeHttpHandler,
  SENSITIVE_STRING,
  ServiceException,
  buildQueryString,
  collectBody,
  createChecksumStream,
  dateToUtcString,
  decorateServiceException,
  emitWarningIfUnsupportedVersion as emitWarningIfUnsupportedVersion2,
  expectNonNull,
  expectObject,
  expectString,
  fromBase64,
  fromHex,
  fromUtf8,
  getAwsChunkedEncodingStream,
  getDefaultExtensionConfiguration,
  getHttpHandlerExtensionConfiguration,
  headStream,
  isArrayBuffer,
  isSerializableHeaderValue,
  loadConfigsForDefaultMode,
  map,
  parseBoolean,
  parseRfc3339DateTimeWithOffset,
  parseRfc7231DateTime,
  requestBuilder,
  resolveDefaultRuntimeConfig,
  resolveHttpHandlerRuntimeConfig,
  sdkStreamMixin,
  serializeDateTime,
  splitStream,
  streamCollector,
  strictParseInt32,
  strictParseLong,
  toBase64,
  toHex,
  toUint8Array,
  toUtf8,
  withBaseException
} from "./chunk-SVASSJ7L.js";
import {
  ENV_PROFILE
} from "./chunk-AGSJSKE7.js";
import "./chunk-FZCCKB7Z.js";
import "./chunk-C3BIZR4K.js";
import {
  CredentialsProviderError,
  chain,
  memoize
} from "./chunk-YFT7YJIX.js";

// node_modules/@aws-sdk/middleware-expect-continue/dist-es/index.js
function addExpectContinueMiddleware(options) {
  return (next) => async (args) => {
    const { request } = args;
    if (HttpRequest.isInstance(request) && request.body && options.runtime === "node") {
      if (options.requestHandler?.constructor?.name !== "FetchHttpHandler") {
        request.headers = {
          ...request.headers,
          Expect: "100-continue"
        };
      }
    }
    return next({
      ...args,
      request
    });
  };
}
var addExpectContinueMiddlewareOptions = {
  step: "build",
  tags: ["SET_EXPECT_HEADER", "EXPECT_HEADER"],
  name: "addExpectContinueMiddleware",
  override: true
};
var getAddExpectContinuePlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(addExpectContinueMiddleware(options), addExpectContinueMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/constants.js
var RequestChecksumCalculation = {
  WHEN_SUPPORTED: "WHEN_SUPPORTED",
  WHEN_REQUIRED: "WHEN_REQUIRED"
};
var DEFAULT_REQUEST_CHECKSUM_CALCULATION = RequestChecksumCalculation.WHEN_SUPPORTED;
var ResponseChecksumValidation = {
  WHEN_SUPPORTED: "WHEN_SUPPORTED",
  WHEN_REQUIRED: "WHEN_REQUIRED"
};
var DEFAULT_RESPONSE_CHECKSUM_VALIDATION = RequestChecksumCalculation.WHEN_SUPPORTED;
var ChecksumAlgorithm;
(function(ChecksumAlgorithm2) {
  ChecksumAlgorithm2["MD5"] = "MD5";
  ChecksumAlgorithm2["CRC32"] = "CRC32";
  ChecksumAlgorithm2["CRC32C"] = "CRC32C";
  ChecksumAlgorithm2["CRC64NVME"] = "CRC64NVME";
  ChecksumAlgorithm2["SHA1"] = "SHA1";
  ChecksumAlgorithm2["SHA256"] = "SHA256";
})(ChecksumAlgorithm || (ChecksumAlgorithm = {}));
var ChecksumLocation;
(function(ChecksumLocation2) {
  ChecksumLocation2["HEADER"] = "header";
  ChecksumLocation2["TRAILER"] = "trailer";
})(ChecksumLocation || (ChecksumLocation = {}));
var DEFAULT_CHECKSUM_ALGORITHM = ChecksumAlgorithm.CRC32;

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/stringUnionSelector.js
var SelectorType2;
(function(SelectorType3) {
  SelectorType3["ENV"] = "env";
  SelectorType3["CONFIG"] = "shared config entry";
})(SelectorType2 || (SelectorType2 = {}));
var stringUnionSelector = (obj, key, union, type) => {
  if (!(key in obj))
    return void 0;
  const value = obj[key].toUpperCase();
  if (!Object.values(union).includes(value)) {
    throw new TypeError(`Cannot load ${type} '${key}'. Expected one of ${Object.values(union)}, got '${obj[key]}'.`);
  }
  return value;
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS.js
var ENV_REQUEST_CHECKSUM_CALCULATION = "AWS_REQUEST_CHECKSUM_CALCULATION";
var CONFIG_REQUEST_CHECKSUM_CALCULATION = "request_checksum_calculation";
var NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS = {
  environmentVariableSelector: (env) => stringUnionSelector(env, ENV_REQUEST_CHECKSUM_CALCULATION, RequestChecksumCalculation, SelectorType2.ENV),
  configFileSelector: (profile) => stringUnionSelector(profile, CONFIG_REQUEST_CHECKSUM_CALCULATION, RequestChecksumCalculation, SelectorType2.CONFIG),
  default: DEFAULT_REQUEST_CHECKSUM_CALCULATION
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS.js
var ENV_RESPONSE_CHECKSUM_VALIDATION = "AWS_RESPONSE_CHECKSUM_VALIDATION";
var CONFIG_RESPONSE_CHECKSUM_VALIDATION = "response_checksum_validation";
var NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS = {
  environmentVariableSelector: (env) => stringUnionSelector(env, ENV_RESPONSE_CHECKSUM_VALIDATION, ResponseChecksumValidation, SelectorType2.ENV),
  configFileSelector: (profile) => stringUnionSelector(profile, CONFIG_RESPONSE_CHECKSUM_VALIDATION, ResponseChecksumValidation, SelectorType2.CONFIG),
  default: DEFAULT_RESPONSE_CHECKSUM_VALIDATION
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/crc64-nvme-crt-container.js
var crc64NvmeCrtContainer = {
  CrtCrc64Nvme: null
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/types.js
var CLIENT_SUPPORTED_ALGORITHMS = [
  ChecksumAlgorithm.CRC32,
  ChecksumAlgorithm.CRC32C,
  ChecksumAlgorithm.CRC64NVME,
  ChecksumAlgorithm.SHA1,
  ChecksumAlgorithm.SHA256
];
var PRIORITY_ORDER_ALGORITHMS = [
  ChecksumAlgorithm.SHA256,
  ChecksumAlgorithm.SHA1,
  ChecksumAlgorithm.CRC32,
  ChecksumAlgorithm.CRC32C,
  ChecksumAlgorithm.CRC64NVME
];

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/getChecksumAlgorithmForRequest.js
var getChecksumAlgorithmForRequest = (input, { requestChecksumRequired, requestAlgorithmMember, requestChecksumCalculation }) => {
  if (!requestAlgorithmMember) {
    return requestChecksumCalculation === RequestChecksumCalculation.WHEN_SUPPORTED || requestChecksumRequired ? DEFAULT_CHECKSUM_ALGORITHM : void 0;
  }
  if (!input[requestAlgorithmMember]) {
    return void 0;
  }
  const checksumAlgorithm = input[requestAlgorithmMember];
  if (!CLIENT_SUPPORTED_ALGORITHMS.includes(checksumAlgorithm)) {
    throw new Error(`The checksum algorithm "${checksumAlgorithm}" is not supported by the client. Select one of ${CLIENT_SUPPORTED_ALGORITHMS}.`);
  }
  return checksumAlgorithm;
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/getChecksumLocationName.js
var getChecksumLocationName = (algorithm) => algorithm === ChecksumAlgorithm.MD5 ? "content-md5" : `x-amz-checksum-${algorithm.toLowerCase()}`;

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/hasHeader.js
var hasHeader = (header, headers) => {
  const soughtHeader = header.toLowerCase();
  for (const headerName of Object.keys(headers)) {
    if (soughtHeader === headerName.toLowerCase()) {
      return true;
    }
  }
  return false;
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/hasHeaderWithPrefix.js
var hasHeaderWithPrefix = (headerPrefix, headers) => {
  const soughtHeaderPrefix = headerPrefix.toLowerCase();
  for (const headerName of Object.keys(headers)) {
    if (headerName.toLowerCase().startsWith(soughtHeaderPrefix)) {
      return true;
    }
  }
  return false;
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/isStreaming.js
var isStreaming = (body) => body !== void 0 && typeof body !== "string" && !ArrayBuffer.isView(body) && !isArrayBuffer(body);

// node_modules/tslib/tslib.es6.mjs
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t2[0] & 1) throw t2[1];
    return t2[1];
  }, trys: [], ops: [] }, f2, y2, t2, g2 = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g2.next = verb(0), g2["throw"] = verb(1), g2["return"] = verb(2), typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2) throw new TypeError("Generator is already executing.");
    while (g2 && (g2 = 0, op[0] && (_ = 0)), _) try {
      if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done) return t2;
      if (y2 = 0, t2) op = [op[0] & 2, t2.value];
      switch (op[0]) {
        case 0:
        case 1:
          t2 = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y2 = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t2[1]) {
            _.label = t2[1];
            t2 = op;
            break;
          }
          if (t2 && _.label < t2[2]) {
            _.label = t2[2];
            _.ops.push(op);
            break;
          }
          if (t2[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e2) {
      op = [6, e2];
      y2 = 0;
    } finally {
      f2 = t2 = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o2) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m2 = s2 && o2[s2], i2 = 0;
  if (m2) return m2.call(o2);
  if (o2 && typeof o2.length === "number") return {
    next: function() {
      if (o2 && i2 >= o2.length) o2 = void 0;
      return { value: o2 && o2[i2++], done: !o2 };
    }
  };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

// node_modules/@aws-crypto/util/node_modules/@smithy/util-buffer-from/dist-es/index.js
import { Buffer as Buffer2 } from "buffer";
var fromString = (input, encoding) => {
  if (typeof input !== "string") {
    throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
  }
  return encoding ? Buffer2.from(input, encoding) : Buffer2.from(input);
};

// node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/fromUtf8.js
var fromUtf82 = (input) => {
  const buf = fromString(input, "utf8");
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
};

// node_modules/@aws-crypto/util/build/module/convertToBuffer.js
var fromUtf83 = typeof Buffer !== "undefined" && Buffer.from ? function(input) {
  return Buffer.from(input, "utf8");
} : fromUtf82;
function convertToBuffer(data) {
  if (data instanceof Uint8Array)
    return data;
  if (typeof data === "string") {
    return fromUtf83(data);
  }
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
  }
  return new Uint8Array(data);
}

// node_modules/@aws-crypto/util/build/module/isEmptyData.js
function isEmptyData(data) {
  if (typeof data === "string") {
    return data.length === 0;
  }
  return data.byteLength === 0;
}

// node_modules/@aws-crypto/util/build/module/numToUint8.js
function numToUint8(num) {
  return new Uint8Array([
    (num & 4278190080) >> 24,
    (num & 16711680) >> 16,
    (num & 65280) >> 8,
    num & 255
  ]);
}

// node_modules/@aws-crypto/util/build/module/uint32ArrayFrom.js
function uint32ArrayFrom(a_lookUpTable2) {
  if (!Uint32Array.from) {
    var return_array = new Uint32Array(a_lookUpTable2.length);
    var a_index = 0;
    while (a_index < a_lookUpTable2.length) {
      return_array[a_index] = a_lookUpTable2[a_index];
      a_index += 1;
    }
    return return_array;
  }
  return Uint32Array.from(a_lookUpTable2);
}

// node_modules/@aws-crypto/crc32c/build/module/aws_crc32c.js
var AwsCrc32c = (
  /** @class */
  function() {
    function AwsCrc32c2() {
      this.crc32c = new Crc32c();
    }
    AwsCrc32c2.prototype.update = function(toHash) {
      if (isEmptyData(toHash))
        return;
      this.crc32c.update(convertToBuffer(toHash));
    };
    AwsCrc32c2.prototype.digest = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2, numToUint8(this.crc32c.digest())];
        });
      });
    };
    AwsCrc32c2.prototype.reset = function() {
      this.crc32c = new Crc32c();
    };
    return AwsCrc32c2;
  }()
);

// node_modules/@aws-crypto/crc32c/build/module/index.js
var Crc32c = (
  /** @class */
  function() {
    function Crc32c2() {
      this.checksum = 4294967295;
    }
    Crc32c2.prototype.update = function(data) {
      var e_1, _a;
      try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
          var byte = data_1_1.value;
          this.checksum = this.checksum >>> 8 ^ lookupTable[(this.checksum ^ byte) & 255];
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return this;
    };
    Crc32c2.prototype.digest = function() {
      return (this.checksum ^ 4294967295) >>> 0;
    };
    return Crc32c2;
  }()
);
var a_lookupTable = [
  0,
  4067132163,
  3778769143,
  324072436,
  3348797215,
  904991772,
  648144872,
  3570033899,
  2329499855,
  2024987596,
  1809983544,
  2575936315,
  1296289744,
  3207089363,
  2893594407,
  1578318884,
  274646895,
  3795141740,
  4049975192,
  51262619,
  3619967088,
  632279923,
  922689671,
  3298075524,
  2592579488,
  1760304291,
  2075979607,
  2312596564,
  1562183871,
  2943781820,
  3156637768,
  1313733451,
  549293790,
  3537243613,
  3246849577,
  871202090,
  3878099393,
  357341890,
  102525238,
  4101499445,
  2858735121,
  1477399826,
  1264559846,
  3107202533,
  1845379342,
  2677391885,
  2361733625,
  2125378298,
  820201905,
  3263744690,
  3520608582,
  598981189,
  4151959214,
  85089709,
  373468761,
  3827903834,
  3124367742,
  1213305469,
  1526817161,
  2842354314,
  2107672161,
  2412447074,
  2627466902,
  1861252501,
  1098587580,
  3004210879,
  2688576843,
  1378610760,
  2262928035,
  1955203488,
  1742404180,
  2511436119,
  3416409459,
  969524848,
  714683780,
  3639785095,
  205050476,
  4266873199,
  3976438427,
  526918040,
  1361435347,
  2739821008,
  2954799652,
  1114974503,
  2529119692,
  1691668175,
  2005155131,
  2247081528,
  3690758684,
  697762079,
  986182379,
  3366744552,
  476452099,
  3993867776,
  4250756596,
  255256311,
  1640403810,
  2477592673,
  2164122517,
  1922457750,
  2791048317,
  1412925310,
  1197962378,
  3037525897,
  3944729517,
  427051182,
  170179418,
  4165941337,
  746937522,
  3740196785,
  3451792453,
  1070968646,
  1905808397,
  2213795598,
  2426610938,
  1657317369,
  3053634322,
  1147748369,
  1463399397,
  2773627110,
  4215344322,
  153784257,
  444234805,
  3893493558,
  1021025245,
  3467647198,
  3722505002,
  797665321,
  2197175160,
  1889384571,
  1674398607,
  2443626636,
  1164749927,
  3070701412,
  2757221520,
  1446797203,
  137323447,
  4198817972,
  3910406976,
  461344835,
  3484808360,
  1037989803,
  781091935,
  3705997148,
  2460548119,
  1623424788,
  1939049696,
  2180517859,
  1429367560,
  2807687179,
  3020495871,
  1180866812,
  410100952,
  3927582683,
  4182430767,
  186734380,
  3756733383,
  763408580,
  1053836080,
  3434856499,
  2722870694,
  1344288421,
  1131464017,
  2971354706,
  1708204729,
  2545590714,
  2229949006,
  1988219213,
  680717673,
  3673779818,
  3383336350,
  1002577565,
  4010310262,
  493091189,
  238226049,
  4233660802,
  2987750089,
  1082061258,
  1395524158,
  2705686845,
  1972364758,
  2279892693,
  2494862625,
  1725896226,
  952904198,
  3399985413,
  3656866545,
  731699698,
  4283874585,
  222117402,
  510512622,
  3959836397,
  3280807620,
  837199303,
  582374963,
  3504198960,
  68661723,
  4135334616,
  3844915500,
  390545967,
  1230274059,
  3141532936,
  2825850620,
  1510247935,
  2395924756,
  2091215383,
  1878366691,
  2644384480,
  3553878443,
  565732008,
  854102364,
  3229815391,
  340358836,
  3861050807,
  4117890627,
  119113024,
  1493875044,
  2875275879,
  3090270611,
  1247431312,
  2660249211,
  1828433272,
  2141937292,
  2378227087,
  3811616794,
  291187481,
  34330861,
  4032846830,
  615137029,
  3603020806,
  3314634738,
  939183345,
  1776939221,
  2609017814,
  2295496738,
  2058945313,
  2926798794,
  1545135305,
  1330124605,
  3173225534,
  4084100981,
  17165430,
  307568514,
  3762199681,
  888469610,
  3332340585,
  3587147933,
  665062302,
  2042050490,
  2346497209,
  2559330125,
  1793573966,
  3190661285,
  1279665062,
  1595330642,
  2910671697
];
var lookupTable = uint32ArrayFrom(a_lookupTable);

// node_modules/@aws-crypto/crc32/build/module/aws_crc32.js
var AwsCrc32 = (
  /** @class */
  function() {
    function AwsCrc322() {
      this.crc32 = new Crc32();
    }
    AwsCrc322.prototype.update = function(toHash) {
      if (isEmptyData(toHash))
        return;
      this.crc32.update(convertToBuffer(toHash));
    };
    AwsCrc322.prototype.digest = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2, numToUint8(this.crc32.digest())];
        });
      });
    };
    AwsCrc322.prototype.reset = function() {
      this.crc32 = new Crc32();
    };
    return AwsCrc322;
  }()
);

// node_modules/@aws-crypto/crc32/build/module/index.js
var Crc32 = (
  /** @class */
  function() {
    function Crc322() {
      this.checksum = 4294967295;
    }
    Crc322.prototype.update = function(data) {
      var e_1, _a;
      try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
          var byte = data_1_1.value;
          this.checksum = this.checksum >>> 8 ^ lookupTable2[(this.checksum ^ byte) & 255];
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return this;
    };
    Crc322.prototype.digest = function() {
      return (this.checksum ^ 4294967295) >>> 0;
    };
    return Crc322;
  }()
);
var a_lookUpTable = [
  0,
  1996959894,
  3993919788,
  2567524794,
  124634137,
  1886057615,
  3915621685,
  2657392035,
  249268274,
  2044508324,
  3772115230,
  2547177864,
  162941995,
  2125561021,
  3887607047,
  2428444049,
  498536548,
  1789927666,
  4089016648,
  2227061214,
  450548861,
  1843258603,
  4107580753,
  2211677639,
  325883990,
  1684777152,
  4251122042,
  2321926636,
  335633487,
  1661365465,
  4195302755,
  2366115317,
  997073096,
  1281953886,
  3579855332,
  2724688242,
  1006888145,
  1258607687,
  3524101629,
  2768942443,
  901097722,
  1119000684,
  3686517206,
  2898065728,
  853044451,
  1172266101,
  3705015759,
  2882616665,
  651767980,
  1373503546,
  3369554304,
  3218104598,
  565507253,
  1454621731,
  3485111705,
  3099436303,
  671266974,
  1594198024,
  3322730930,
  2970347812,
  795835527,
  1483230225,
  3244367275,
  3060149565,
  1994146192,
  31158534,
  2563907772,
  4023717930,
  1907459465,
  112637215,
  2680153253,
  3904427059,
  2013776290,
  251722036,
  2517215374,
  3775830040,
  2137656763,
  141376813,
  2439277719,
  3865271297,
  1802195444,
  476864866,
  2238001368,
  4066508878,
  1812370925,
  453092731,
  2181625025,
  4111451223,
  1706088902,
  314042704,
  2344532202,
  4240017532,
  1658658271,
  366619977,
  2362670323,
  4224994405,
  1303535960,
  984961486,
  2747007092,
  3569037538,
  1256170817,
  1037604311,
  2765210733,
  3554079995,
  1131014506,
  879679996,
  2909243462,
  3663771856,
  1141124467,
  855842277,
  2852801631,
  3708648649,
  1342533948,
  654459306,
  3188396048,
  3373015174,
  1466479909,
  544179635,
  3110523913,
  3462522015,
  1591671054,
  702138776,
  2966460450,
  3352799412,
  1504918807,
  783551873,
  3082640443,
  3233442989,
  3988292384,
  2596254646,
  62317068,
  1957810842,
  3939845945,
  2647816111,
  81470997,
  1943803523,
  3814918930,
  2489596804,
  225274430,
  2053790376,
  3826175755,
  2466906013,
  167816743,
  2097651377,
  4027552580,
  2265490386,
  503444072,
  1762050814,
  4150417245,
  2154129355,
  426522225,
  1852507879,
  4275313526,
  2312317920,
  282753626,
  1742555852,
  4189708143,
  2394877945,
  397917763,
  1622183637,
  3604390888,
  2714866558,
  953729732,
  1340076626,
  3518719985,
  2797360999,
  1068828381,
  1219638859,
  3624741850,
  2936675148,
  906185462,
  1090812512,
  3747672003,
  2825379669,
  829329135,
  1181335161,
  3412177804,
  3160834842,
  628085408,
  1382605366,
  3423369109,
  3138078467,
  570562233,
  1426400815,
  3317316542,
  2998733608,
  733239954,
  1555261956,
  3268935591,
  3050360625,
  752459403,
  1541320221,
  2607071920,
  3965973030,
  1969922972,
  40735498,
  2617837225,
  3943577151,
  1913087877,
  83908371,
  2512341634,
  3803740692,
  2075208622,
  213261112,
  2463272603,
  3855990285,
  2094854071,
  198958881,
  2262029012,
  4057260610,
  1759359992,
  534414190,
  2176718541,
  4139329115,
  1873836001,
  414664567,
  2282248934,
  4279200368,
  1711684554,
  285281116,
  2405801727,
  4167216745,
  1634467795,
  376229701,
  2685067896,
  3608007406,
  1308918612,
  956543938,
  2808555105,
  3495958263,
  1231636301,
  1047427035,
  2932959818,
  3654703836,
  1088359270,
  936918e3,
  2847714899,
  3736837829,
  1202900863,
  817233897,
  3183342108,
  3401237130,
  1404277552,
  615818150,
  3134207493,
  3453421203,
  1423857449,
  601450431,
  3009837614,
  3294710456,
  1567103746,
  711928724,
  3020668471,
  3272380065,
  1510334235,
  755167117
];
var lookupTable2 = uint32ArrayFrom(a_lookUpTable);

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/getCrc32ChecksumAlgorithmFunction.js
import * as zlib from "zlib";
var NodeCrc32 = class {
  checksum = 0;
  update(data) {
    this.checksum = zlib.crc32(data, this.checksum);
  }
  async digest() {
    return numToUint8(this.checksum);
  }
  reset() {
    this.checksum = 0;
  }
};
var getCrc32ChecksumAlgorithmFunction = () => {
  if (typeof zlib.crc32 === "undefined") {
    return AwsCrc32;
  }
  return NodeCrc32;
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/selectChecksumAlgorithmFunction.js
var selectChecksumAlgorithmFunction = (checksumAlgorithm, config) => {
  switch (checksumAlgorithm) {
    case ChecksumAlgorithm.MD5:
      return config.md5;
    case ChecksumAlgorithm.CRC32:
      return getCrc32ChecksumAlgorithmFunction();
    case ChecksumAlgorithm.CRC32C:
      return AwsCrc32c;
    case ChecksumAlgorithm.CRC64NVME:
      if (typeof crc64NvmeCrtContainer.CrtCrc64Nvme !== "function") {
        throw new Error(`Please check whether you have installed the "@aws-sdk/crc64-nvme-crt" package explicitly. 
You must also register the package by calling [require("@aws-sdk/crc64-nvme-crt");] or an ESM equivalent such as [import "@aws-sdk/crc64-nvme-crt";]. 
For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt`);
      }
      return crc64NvmeCrtContainer.CrtCrc64Nvme;
    case ChecksumAlgorithm.SHA1:
      return config.sha1;
    case ChecksumAlgorithm.SHA256:
      return config.sha256;
    default:
      throw new Error(`Unsupported checksum algorithm: ${checksumAlgorithm}`);
  }
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/stringHasher.js
var stringHasher = (checksumAlgorithmFn, body) => {
  const hash = new checksumAlgorithmFn();
  hash.update(toUint8Array(body || ""));
  return hash.digest();
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/flexibleChecksumsMiddleware.js
var flexibleChecksumsMiddlewareOptions = {
  name: "flexibleChecksumsMiddleware",
  step: "build",
  tags: ["BODY_CHECKSUM"],
  override: true
};
var flexibleChecksumsMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
  if (!HttpRequest.isInstance(args.request)) {
    return next(args);
  }
  if (hasHeaderWithPrefix("x-amz-checksum-", args.request.headers)) {
    return next(args);
  }
  const { request, input } = args;
  const { body: requestBody, headers } = request;
  const { base64Encoder, streamHasher } = config;
  const { requestChecksumRequired, requestAlgorithmMember } = middlewareConfig;
  const requestChecksumCalculation = await config.requestChecksumCalculation();
  const requestAlgorithmMemberName = requestAlgorithmMember?.name;
  const requestAlgorithmMemberHttpHeader = requestAlgorithmMember?.httpHeader;
  if (requestAlgorithmMemberName && !input[requestAlgorithmMemberName]) {
    if (requestChecksumCalculation === RequestChecksumCalculation.WHEN_SUPPORTED || requestChecksumRequired) {
      input[requestAlgorithmMemberName] = DEFAULT_CHECKSUM_ALGORITHM;
      if (requestAlgorithmMemberHttpHeader) {
        headers[requestAlgorithmMemberHttpHeader] = DEFAULT_CHECKSUM_ALGORITHM;
      }
    }
  }
  const checksumAlgorithm = getChecksumAlgorithmForRequest(input, {
    requestChecksumRequired,
    requestAlgorithmMember: requestAlgorithmMember?.name,
    requestChecksumCalculation
  });
  let updatedBody = requestBody;
  let updatedHeaders = headers;
  if (checksumAlgorithm) {
    switch (checksumAlgorithm) {
      case ChecksumAlgorithm.CRC32:
        setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_CRC32", "U");
        break;
      case ChecksumAlgorithm.CRC32C:
        setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_CRC32C", "V");
        break;
      case ChecksumAlgorithm.CRC64NVME:
        setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_CRC64", "W");
        break;
      case ChecksumAlgorithm.SHA1:
        setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_SHA1", "X");
        break;
      case ChecksumAlgorithm.SHA256:
        setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_SHA256", "Y");
        break;
    }
    const checksumLocationName = getChecksumLocationName(checksumAlgorithm);
    const checksumAlgorithmFn = selectChecksumAlgorithmFunction(checksumAlgorithm, config);
    if (isStreaming(requestBody)) {
      const { getAwsChunkedEncodingStream: getAwsChunkedEncodingStream2, bodyLengthChecker } = config;
      updatedBody = getAwsChunkedEncodingStream2(requestBody, {
        base64Encoder,
        bodyLengthChecker,
        checksumLocationName,
        checksumAlgorithmFn,
        streamHasher
      });
      updatedHeaders = {
        ...headers,
        "content-encoding": headers["content-encoding"] ? `${headers["content-encoding"]},aws-chunked` : "aws-chunked",
        "transfer-encoding": "chunked",
        "x-amz-decoded-content-length": headers["content-length"],
        "x-amz-content-sha256": "STREAMING-UNSIGNED-PAYLOAD-TRAILER",
        "x-amz-trailer": checksumLocationName
      };
      delete updatedHeaders["content-length"];
    } else if (!hasHeader(checksumLocationName, headers)) {
      const rawChecksum = await stringHasher(checksumAlgorithmFn, requestBody);
      updatedHeaders = {
        ...headers,
        [checksumLocationName]: base64Encoder(rawChecksum)
      };
    }
  }
  const result = await next({
    ...args,
    request: {
      ...request,
      headers: updatedHeaders,
      body: updatedBody
    }
  });
  return result;
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/flexibleChecksumsInputMiddleware.js
var flexibleChecksumsInputMiddlewareOptions = {
  name: "flexibleChecksumsInputMiddleware",
  toMiddleware: "serializerMiddleware",
  relation: "before",
  tags: ["BODY_CHECKSUM"],
  override: true
};
var flexibleChecksumsInputMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
  const input = args.input;
  const { requestValidationModeMember } = middlewareConfig;
  const requestChecksumCalculation = await config.requestChecksumCalculation();
  const responseChecksumValidation = await config.responseChecksumValidation();
  switch (requestChecksumCalculation) {
    case RequestChecksumCalculation.WHEN_REQUIRED:
      setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_WHEN_REQUIRED", "a");
      break;
    case RequestChecksumCalculation.WHEN_SUPPORTED:
      setFeature(context, "FLEXIBLE_CHECKSUMS_REQ_WHEN_SUPPORTED", "Z");
      break;
  }
  switch (responseChecksumValidation) {
    case ResponseChecksumValidation.WHEN_REQUIRED:
      setFeature(context, "FLEXIBLE_CHECKSUMS_RES_WHEN_REQUIRED", "c");
      break;
    case ResponseChecksumValidation.WHEN_SUPPORTED:
      setFeature(context, "FLEXIBLE_CHECKSUMS_RES_WHEN_SUPPORTED", "b");
      break;
  }
  if (requestValidationModeMember && !input[requestValidationModeMember]) {
    if (responseChecksumValidation === ResponseChecksumValidation.WHEN_SUPPORTED) {
      input[requestValidationModeMember] = "ENABLED";
    }
  }
  return next(args);
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/getChecksumAlgorithmListForResponse.js
var getChecksumAlgorithmListForResponse = (responseAlgorithms = []) => {
  const validChecksumAlgorithms = [];
  for (const algorithm of PRIORITY_ORDER_ALGORITHMS) {
    if (!responseAlgorithms.includes(algorithm) || !CLIENT_SUPPORTED_ALGORITHMS.includes(algorithm)) {
      continue;
    }
    validChecksumAlgorithms.push(algorithm);
  }
  return validChecksumAlgorithms;
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/isChecksumWithPartNumber.js
var isChecksumWithPartNumber = (checksum) => {
  const lastHyphenIndex = checksum.lastIndexOf("-");
  if (lastHyphenIndex !== -1) {
    const numberPart = checksum.slice(lastHyphenIndex + 1);
    if (!numberPart.startsWith("0")) {
      const number = parseInt(numberPart, 10);
      if (!isNaN(number) && number >= 1 && number <= 1e4) {
        return true;
      }
    }
  }
  return false;
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/streams/create-read-stream-on-buffer.js
import { Transform } from "stream";
function createReadStreamOnBuffer(buffer) {
  const stream = new Transform();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/getChecksum.js
var getChecksum = async (body, { checksumAlgorithmFn, base64Encoder }) => base64Encoder(await stringHasher(checksumAlgorithmFn, body));

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/validateChecksumFromResponse.js
var validateChecksumFromResponse = async (response, { config, responseAlgorithms }) => {
  const checksumAlgorithms = getChecksumAlgorithmListForResponse(responseAlgorithms);
  const { body: responseBody, headers: responseHeaders } = response;
  for (const algorithm of checksumAlgorithms) {
    const responseHeader = getChecksumLocationName(algorithm);
    const checksumFromResponse = responseHeaders[responseHeader];
    if (checksumFromResponse) {
      const checksumAlgorithmFn = selectChecksumAlgorithmFunction(algorithm, config);
      const { base64Encoder } = config;
      if (isStreaming(responseBody)) {
        response.body = createChecksumStream({
          expectedChecksum: checksumFromResponse,
          checksumSourceLocation: responseHeader,
          checksum: new checksumAlgorithmFn(),
          source: responseBody,
          base64Encoder
        });
        return;
      }
      const checksum = await getChecksum(responseBody, { checksumAlgorithmFn, base64Encoder });
      if (checksum === checksumFromResponse) {
        break;
      }
      throw new Error(`Checksum mismatch: expected "${checksum}" but received "${checksumFromResponse}" in response header "${responseHeader}".`);
    }
  }
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/flexibleChecksumsResponseMiddleware.js
var flexibleChecksumsResponseMiddlewareOptions = {
  name: "flexibleChecksumsResponseMiddleware",
  toMiddleware: "deserializerMiddleware",
  relation: "after",
  tags: ["BODY_CHECKSUM"],
  override: true
};
var flexibleChecksumsResponseMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
  if (!HttpRequest.isInstance(args.request)) {
    return next(args);
  }
  const input = args.input;
  const result = await next(args);
  const response = result.response;
  let collectedStream = void 0;
  const { requestValidationModeMember, responseAlgorithms } = middlewareConfig;
  if (requestValidationModeMember && input[requestValidationModeMember] === "ENABLED") {
    const { clientName, commandName } = context;
    const isS3WholeObjectMultipartGetResponseChecksum = clientName === "S3Client" && commandName === "GetObjectCommand" && getChecksumAlgorithmListForResponse(responseAlgorithms).every((algorithm) => {
      const responseHeader = getChecksumLocationName(algorithm);
      const checksumFromResponse = response.headers[responseHeader];
      return !checksumFromResponse || isChecksumWithPartNumber(checksumFromResponse);
    });
    if (isS3WholeObjectMultipartGetResponseChecksum) {
      return result;
    }
    const isStreamingBody = isStreaming(response.body);
    if (isStreamingBody) {
      collectedStream = await config.streamCollector(response.body);
      response.body = createReadStreamOnBuffer(collectedStream);
    }
    await validateChecksumFromResponse(result.response, {
      config,
      responseAlgorithms
    });
    if (isStreamingBody && collectedStream) {
      response.body = createReadStreamOnBuffer(collectedStream);
    }
  }
  return result;
};

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/getFlexibleChecksumsPlugin.js
var getFlexibleChecksumsPlugin = (config, middlewareConfig) => ({
  applyToStack: (clientStack) => {
    clientStack.add(flexibleChecksumsMiddleware(config, middlewareConfig), flexibleChecksumsMiddlewareOptions);
    clientStack.addRelativeTo(flexibleChecksumsInputMiddleware(config, middlewareConfig), flexibleChecksumsInputMiddlewareOptions);
    clientStack.addRelativeTo(flexibleChecksumsResponseMiddleware(config, middlewareConfig), flexibleChecksumsResponseMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-flexible-checksums/dist-es/resolveFlexibleChecksumsConfig.js
var resolveFlexibleChecksumsConfig = (input) => ({
  ...input,
  requestChecksumCalculation: normalizeProvider(input.requestChecksumCalculation ?? DEFAULT_REQUEST_CHECKSUM_CALCULATION),
  responseChecksumValidation: normalizeProvider(input.responseChecksumValidation ?? DEFAULT_RESPONSE_CHECKSUM_VALIDATION)
});

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/check-content-length-header.js
var CONTENT_LENGTH_HEADER = "content-length";
function checkContentLengthHeader() {
  return (next, context) => async (args) => {
    const { request } = args;
    if (HttpRequest.isInstance(request)) {
      if (!(CONTENT_LENGTH_HEADER in request.headers)) {
        const message = `Are you using a Stream of unknown length as the Body of a PutObject request? Consider using Upload instead from @aws-sdk/lib-storage.`;
        if (typeof context?.logger?.warn === "function" && !(context.logger instanceof NoOpLogger)) {
          context.logger.warn(message);
        } else {
          console.warn(message);
        }
      }
    }
    return next({ ...args });
  };
}
var checkContentLengthHeaderMiddlewareOptions = {
  step: "finalizeRequest",
  tags: ["CHECK_CONTENT_LENGTH_HEADER"],
  name: "getCheckContentLengthHeaderPlugin",
  override: true
};
var getCheckContentLengthHeaderPlugin = (unused) => ({
  applyToStack: (clientStack) => {
    clientStack.add(checkContentLengthHeader(), checkContentLengthHeaderMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/region-redirect-endpoint-middleware.js
var regionRedirectEndpointMiddleware = (config) => {
  return (next, context) => async (args) => {
    const originalRegion = await config.region();
    const regionProviderRef = config.region;
    let unlock = () => {
    };
    if (context.__s3RegionRedirect) {
      Object.defineProperty(config, "region", {
        writable: false,
        value: async () => {
          return context.__s3RegionRedirect;
        }
      });
      unlock = () => Object.defineProperty(config, "region", {
        writable: true,
        value: regionProviderRef
      });
    }
    try {
      const result = await next(args);
      if (context.__s3RegionRedirect) {
        unlock();
        const region = await config.region();
        if (originalRegion !== region) {
          throw new Error("Region was not restored following S3 region redirect.");
        }
      }
      return result;
    } catch (e2) {
      unlock();
      throw e2;
    }
  };
};
var regionRedirectEndpointMiddlewareOptions = {
  tags: ["REGION_REDIRECT", "S3"],
  name: "regionRedirectEndpointMiddleware",
  override: true,
  relation: "before",
  toMiddleware: "endpointV2Middleware"
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/region-redirect-middleware.js
function regionRedirectMiddleware(clientConfig) {
  return (next, context) => async (args) => {
    try {
      return await next(args);
    } catch (err) {
      if (clientConfig.followRegionRedirects) {
        if (err?.$metadata?.httpStatusCode === 301 || err?.$metadata?.httpStatusCode === 400 && err?.name === "IllegalLocationConstraintException") {
          try {
            const actualRegion = err.$response.headers["x-amz-bucket-region"];
            context.logger?.debug(`Redirecting from ${await clientConfig.region()} to ${actualRegion}`);
            context.__s3RegionRedirect = actualRegion;
          } catch (e2) {
            throw new Error("Region redirect failed: " + e2);
          }
          return next(args);
        }
      }
      throw err;
    }
  };
}
var regionRedirectMiddlewareOptions = {
  step: "initialize",
  tags: ["REGION_REDIRECT", "S3"],
  name: "regionRedirectMiddleware",
  override: true
};
var getRegionRedirectMiddlewarePlugin = (clientConfig) => ({
  applyToStack: (clientStack) => {
    clientStack.add(regionRedirectMiddleware(clientConfig), regionRedirectMiddlewareOptions);
    clientStack.addRelativeTo(regionRedirectEndpointMiddleware(clientConfig), regionRedirectEndpointMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/s3-expires-middleware.js
var s3ExpiresMiddleware = (config) => {
  return (next, context) => async (args) => {
    const result = await next(args);
    const { response } = result;
    if (HttpResponse.isInstance(response)) {
      if (response.headers.expires) {
        response.headers.expiresstring = response.headers.expires;
        try {
          parseRfc7231DateTime(response.headers.expires);
        } catch (e2) {
          context.logger?.warn(`AWS SDK Warning for ${context.clientName}::${context.commandName} response parsing (${response.headers.expires}): ${e2}`);
          delete response.headers.expires;
        }
      }
    }
    return result;
  };
};
var s3ExpiresMiddlewareOptions = {
  tags: ["S3"],
  name: "s3ExpiresMiddleware",
  override: true,
  relation: "after",
  toMiddleware: "deserializerMiddleware"
};
var getS3ExpiresMiddlewarePlugin = (clientConfig) => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(s3ExpiresMiddleware(clientConfig), s3ExpiresMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/s3-express/classes/S3ExpressIdentityCache.js
var S3ExpressIdentityCache = class _S3ExpressIdentityCache {
  data;
  lastPurgeTime = Date.now();
  static EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS = 3e4;
  constructor(data = {}) {
    this.data = data;
  }
  get(key) {
    const entry = this.data[key];
    if (!entry) {
      return;
    }
    return entry;
  }
  set(key, entry) {
    this.data[key] = entry;
    return entry;
  }
  delete(key) {
    delete this.data[key];
  }
  async purgeExpired() {
    const now = Date.now();
    if (this.lastPurgeTime + _S3ExpressIdentityCache.EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS > now) {
      return;
    }
    for (const key in this.data) {
      const entry = this.data[key];
      if (!entry.isRefreshing) {
        const credential = await entry.identity;
        if (credential.expiration) {
          if (credential.expiration.getTime() < now) {
            delete this.data[key];
          }
        }
      }
    }
  }
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/s3-express/classes/S3ExpressIdentityCacheEntry.js
var S3ExpressIdentityCacheEntry = class {
  _identity;
  isRefreshing;
  accessed;
  constructor(_identity, isRefreshing = false, accessed = Date.now()) {
    this._identity = _identity;
    this.isRefreshing = isRefreshing;
    this.accessed = accessed;
  }
  get identity() {
    this.accessed = Date.now();
    return this._identity;
  }
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/s3-express/classes/S3ExpressIdentityProviderImpl.js
var S3ExpressIdentityProviderImpl = class _S3ExpressIdentityProviderImpl {
  createSessionFn;
  cache;
  static REFRESH_WINDOW_MS = 6e4;
  constructor(createSessionFn, cache2 = new S3ExpressIdentityCache()) {
    this.createSessionFn = createSessionFn;
    this.cache = cache2;
  }
  async getS3ExpressIdentity(awsIdentity, identityProperties) {
    const key = identityProperties.Bucket;
    const { cache: cache2 } = this;
    const entry = cache2.get(key);
    if (entry) {
      return entry.identity.then((identity) => {
        const isExpired = (identity.expiration?.getTime() ?? 0) < Date.now();
        if (isExpired) {
          return cache2.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
        }
        const isExpiringSoon = (identity.expiration?.getTime() ?? 0) < Date.now() + _S3ExpressIdentityProviderImpl.REFRESH_WINDOW_MS;
        if (isExpiringSoon && !entry.isRefreshing) {
          entry.isRefreshing = true;
          this.getIdentity(key).then((id) => {
            cache2.set(key, new S3ExpressIdentityCacheEntry(Promise.resolve(id)));
          });
        }
        return identity;
      });
    }
    return cache2.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
  }
  async getIdentity(key) {
    await this.cache.purgeExpired().catch((error) => {
      console.warn("Error while clearing expired entries in S3ExpressIdentityCache: \n" + error);
    });
    const session = await this.createSessionFn(key);
    if (!session.Credentials?.AccessKeyId || !session.Credentials?.SecretAccessKey) {
      throw new Error("s3#createSession response credential missing AccessKeyId or SecretAccessKey.");
    }
    const identity = {
      accessKeyId: session.Credentials.AccessKeyId,
      secretAccessKey: session.Credentials.SecretAccessKey,
      sessionToken: session.Credentials.SessionToken,
      expiration: session.Credentials.Expiration ? new Date(session.Credentials.Expiration) : void 0
    };
    return identity;
  }
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/s3-express/constants.js
var S3_EXPRESS_BUCKET_TYPE = "Directory";
var S3_EXPRESS_BACKEND = "S3Express";
var S3_EXPRESS_AUTH_SCHEME = "sigv4-s3express";
var SESSION_TOKEN_QUERY_PARAM = "X-Amz-S3session-Token";
var SESSION_TOKEN_HEADER = SESSION_TOKEN_QUERY_PARAM.toLowerCase();
var NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_ENV_NAME = "AWS_S3_DISABLE_EXPRESS_SESSION_AUTH";
var NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_INI_NAME = "s3_disable_express_session_auth";
var NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS = {
  environmentVariableSelector: (env) => booleanSelector(env, NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_ENV_NAME, SelectorType.ENV),
  configFileSelector: (profile) => booleanSelector(profile, NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_INI_NAME, SelectorType.CONFIG),
  default: false
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/s3-express/classes/SignatureV4S3Express.js
var SignatureV4S3Express = class extends SignatureV4 {
  async signWithCredentials(requestToSign, credentials, options) {
    const credentialsWithoutSessionToken = getCredentialsWithoutSessionToken(credentials);
    requestToSign.headers[SESSION_TOKEN_HEADER] = credentials.sessionToken;
    const privateAccess = this;
    setSingleOverride(privateAccess, credentialsWithoutSessionToken);
    return privateAccess.signRequest(requestToSign, options ?? {});
  }
  async presignWithCredentials(requestToSign, credentials, options) {
    const credentialsWithoutSessionToken = getCredentialsWithoutSessionToken(credentials);
    delete requestToSign.headers[SESSION_TOKEN_HEADER];
    requestToSign.headers[SESSION_TOKEN_QUERY_PARAM] = credentials.sessionToken;
    requestToSign.query = requestToSign.query ?? {};
    requestToSign.query[SESSION_TOKEN_QUERY_PARAM] = credentials.sessionToken;
    const privateAccess = this;
    setSingleOverride(privateAccess, credentialsWithoutSessionToken);
    return this.presign(requestToSign, options);
  }
};
function getCredentialsWithoutSessionToken(credentials) {
  const credentialsWithoutSessionToken = {
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    expiration: credentials.expiration
  };
  return credentialsWithoutSessionToken;
}
function setSingleOverride(privateAccess, credentialsWithoutSessionToken) {
  const id = setTimeout(() => {
    throw new Error("SignatureV4S3Express credential override was created but not called.");
  }, 10);
  const currentCredentialProvider = privateAccess.credentialProvider;
  const overrideCredentialsProviderOnce = () => {
    clearTimeout(id);
    privateAccess.credentialProvider = currentCredentialProvider;
    return Promise.resolve(credentialsWithoutSessionToken);
  };
  privateAccess.credentialProvider = overrideCredentialsProviderOnce;
}

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/s3-express/functions/s3ExpressMiddleware.js
var s3ExpressMiddleware = (options) => {
  return (next, context) => async (args) => {
    if (context.endpointV2) {
      const endpoint = context.endpointV2;
      const isS3ExpressAuth = endpoint.properties?.authSchemes?.[0]?.name === S3_EXPRESS_AUTH_SCHEME;
      const isS3ExpressBucket = endpoint.properties?.backend === S3_EXPRESS_BACKEND || endpoint.properties?.bucketType === S3_EXPRESS_BUCKET_TYPE;
      if (isS3ExpressBucket) {
        setFeature(context, "S3_EXPRESS_BUCKET", "J");
        context.isS3ExpressBucket = true;
      }
      if (isS3ExpressAuth) {
        const requestBucket = args.input.Bucket;
        if (requestBucket) {
          const s3ExpressIdentity = await options.s3ExpressIdentityProvider.getS3ExpressIdentity(await options.credentials(), {
            Bucket: requestBucket
          });
          context.s3ExpressIdentity = s3ExpressIdentity;
          if (HttpRequest.isInstance(args.request) && s3ExpressIdentity.sessionToken) {
            args.request.headers[SESSION_TOKEN_HEADER] = s3ExpressIdentity.sessionToken;
          }
        }
      }
    }
    return next(args);
  };
};
var s3ExpressMiddlewareOptions = {
  name: "s3ExpressMiddleware",
  step: "build",
  tags: ["S3", "S3_EXPRESS"],
  override: true
};
var getS3ExpressPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(s3ExpressMiddleware(options), s3ExpressMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/s3-express/functions/signS3Express.js
var signS3Express = async (s3ExpressIdentity, signingOptions, request, sigV4MultiRegionSigner) => {
  const signedRequest = await sigV4MultiRegionSigner.signWithCredentials(request, s3ExpressIdentity, {});
  if (signedRequest.headers["X-Amz-Security-Token"] || signedRequest.headers["x-amz-security-token"]) {
    throw new Error("X-Amz-Security-Token must not be set for s3-express requests.");
  }
  return signedRequest;
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/s3-express/functions/s3ExpressHttpSigningMiddleware.js
var defaultErrorHandler = (signingProperties) => (error) => {
  throw error;
};
var defaultSuccessHandler = (httpResponse, signingProperties) => {
};
var s3ExpressHttpSigningMiddleware = (config) => (next, context) => async (args) => {
  if (!HttpRequest.isInstance(args.request)) {
    return next(args);
  }
  const smithyContext = getSmithyContext(context);
  const scheme = smithyContext.selectedHttpAuthScheme;
  if (!scheme) {
    throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
  }
  const { httpAuthOption: { signingProperties = {} }, identity, signer } = scheme;
  let request;
  if (context.s3ExpressIdentity) {
    request = await signS3Express(context.s3ExpressIdentity, signingProperties, args.request, await config.signer());
  } else {
    request = await signer.sign(args.request, identity, signingProperties);
  }
  const output = await next({
    ...args,
    request
  }).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
  (signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
  return output;
};
var getS3ExpressHttpSigningPlugin = (config) => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(s3ExpressHttpSigningMiddleware(config), httpSigningMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/s3Configuration.js
var resolveS3Config = (input, { session }) => {
  const [s3ClientProvider, CreateSessionCommandCtor] = session;
  return {
    ...input,
    forcePathStyle: input.forcePathStyle ?? false,
    useAccelerateEndpoint: input.useAccelerateEndpoint ?? false,
    disableMultiregionAccessPoints: input.disableMultiregionAccessPoints ?? false,
    followRegionRedirects: input.followRegionRedirects ?? false,
    s3ExpressIdentityProvider: input.s3ExpressIdentityProvider ?? new S3ExpressIdentityProviderImpl(async (key) => s3ClientProvider().send(new CreateSessionCommandCtor({
      Bucket: key,
      SessionMode: "ReadWrite"
    }))),
    bucketEndpoint: input.bucketEndpoint ?? false
  };
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/throw-200-exceptions.js
var THROW_IF_EMPTY_BODY = {
  CopyObjectCommand: true,
  UploadPartCopyCommand: true,
  CompleteMultipartUploadCommand: true
};
var MAX_BYTES_TO_INSPECT = 3e3;
var throw200ExceptionsMiddleware = (config) => (next, context) => async (args) => {
  const result = await next(args);
  const { response } = result;
  if (!HttpResponse.isInstance(response)) {
    return result;
  }
  const { statusCode, body: sourceBody } = response;
  if (statusCode < 200 || statusCode >= 300) {
    return result;
  }
  const isSplittableStream = typeof sourceBody?.stream === "function" || typeof sourceBody?.pipe === "function" || typeof sourceBody?.tee === "function";
  if (!isSplittableStream) {
    return result;
  }
  let bodyCopy = sourceBody;
  let body = sourceBody;
  if (sourceBody && typeof sourceBody === "object" && !(sourceBody instanceof Uint8Array)) {
    [bodyCopy, body] = await splitStream(sourceBody);
  }
  response.body = body;
  const bodyBytes = await collectBody2(bodyCopy, {
    streamCollector: async (stream) => {
      return headStream(stream, MAX_BYTES_TO_INSPECT);
    }
  });
  if (typeof bodyCopy?.destroy === "function") {
    bodyCopy.destroy();
  }
  const bodyStringTail = config.utf8Encoder(bodyBytes.subarray(bodyBytes.length - 16));
  if (bodyBytes.length === 0 && THROW_IF_EMPTY_BODY[context.commandName]) {
    const err = new Error("S3 aborted request");
    err.name = "InternalError";
    throw err;
  }
  if (bodyStringTail && bodyStringTail.endsWith("</Error>")) {
    response.statusCode = 400;
  }
  return result;
};
var collectBody2 = (streamBody = new Uint8Array(), context) => {
  if (streamBody instanceof Uint8Array) {
    return Promise.resolve(streamBody);
  }
  return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
var throw200ExceptionsMiddlewareOptions = {
  relation: "after",
  toMiddleware: "deserializerMiddleware",
  tags: ["THROW_200_EXCEPTIONS", "S3"],
  name: "throw200ExceptionsMiddleware",
  override: true
};
var getThrow200ExceptionsPlugin = (config) => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(throw200ExceptionsMiddleware(config), throw200ExceptionsMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/util-arn-parser/dist-es/index.js
var validate = (str) => typeof str === "string" && str.indexOf("arn:") === 0 && str.split(":").length >= 6;

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/bucket-endpoint-middleware.js
function bucketEndpointMiddleware(options) {
  return (next, context) => async (args) => {
    if (options.bucketEndpoint) {
      const endpoint = context.endpointV2;
      if (endpoint) {
        const bucket = args.input.Bucket;
        if (typeof bucket === "string") {
          try {
            const bucketEndpointUrl = new URL(bucket);
            context.endpointV2 = {
              ...endpoint,
              url: bucketEndpointUrl
            };
          } catch (e2) {
            const warning = `@aws-sdk/middleware-sdk-s3: bucketEndpoint=true was set but Bucket=${bucket} could not be parsed as URL.`;
            if (context.logger?.constructor?.name === "NoOpLogger") {
              console.warn(warning);
            } else {
              context.logger?.warn?.(warning);
            }
            throw e2;
          }
        }
      }
    }
    return next(args);
  };
}
var bucketEndpointMiddlewareOptions = {
  name: "bucketEndpointMiddleware",
  override: true,
  relation: "after",
  toMiddleware: "endpointV2Middleware"
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/validate-bucket-name.js
function validateBucketNameMiddleware({ bucketEndpoint }) {
  return (next) => async (args) => {
    const { input: { Bucket: Bucket2 } } = args;
    if (!bucketEndpoint && typeof Bucket2 === "string" && !validate(Bucket2) && Bucket2.indexOf("/") >= 0) {
      const err = new Error(`Bucket name shouldn't contain '/', received '${Bucket2}'`);
      err.name = "InvalidBucketName";
      throw err;
    }
    return next({ ...args });
  };
}
var validateBucketNameMiddlewareOptions = {
  step: "initialize",
  tags: ["VALIDATE_BUCKET_NAME"],
  name: "validateBucketNameMiddleware",
  override: true
};
var getValidateBucketNamePlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(validateBucketNameMiddleware(options), validateBucketNameMiddlewareOptions);
    clientStack.addRelativeTo(bucketEndpointMiddleware(options), bucketEndpointMiddlewareOptions);
  }
});

// node_modules/@smithy/eventstream-serde-config-resolver/dist-es/EventStreamSerdeConfig.js
var resolveEventStreamSerdeConfig = (input) => ({
  ...input,
  eventStreamMarshaller: input.eventStreamSerdeProvider(input)
});

// node_modules/@aws-sdk/signature-v4-multi-region/dist-es/signature-v4-crt-container.js
var signatureV4CrtContainer = {
  CrtSignerV4: null
};

// node_modules/@aws-sdk/signature-v4-multi-region/dist-es/SignatureV4MultiRegion.js
var SignatureV4MultiRegion = class {
  sigv4aSigner;
  sigv4Signer;
  signerOptions;
  constructor(options) {
    this.sigv4Signer = new SignatureV4S3Express(options);
    this.signerOptions = options;
  }
  async sign(requestToSign, options = {}) {
    if (options.signingRegion === "*") {
      if (this.signerOptions.runtime !== "node")
        throw new Error("This request requires signing with SigV4Asymmetric algorithm. It's only available in Node.js");
      return this.getSigv4aSigner().sign(requestToSign, options);
    }
    return this.sigv4Signer.sign(requestToSign, options);
  }
  async signWithCredentials(requestToSign, credentials, options = {}) {
    if (options.signingRegion === "*") {
      if (this.signerOptions.runtime !== "node")
        throw new Error("This request requires signing with SigV4Asymmetric algorithm. It's only available in Node.js");
      return this.getSigv4aSigner().signWithCredentials(requestToSign, credentials, options);
    }
    return this.sigv4Signer.signWithCredentials(requestToSign, credentials, options);
  }
  async presign(originalRequest, options = {}) {
    if (options.signingRegion === "*") {
      if (this.signerOptions.runtime !== "node")
        throw new Error("This request requires signing with SigV4Asymmetric algorithm. It's only available in Node.js");
      return this.getSigv4aSigner().presign(originalRequest, options);
    }
    return this.sigv4Signer.presign(originalRequest, options);
  }
  async presignWithCredentials(originalRequest, credentials, options = {}) {
    if (options.signingRegion === "*") {
      throw new Error("Method presignWithCredentials is not supported for [signingRegion=*].");
    }
    return this.sigv4Signer.presignWithCredentials(originalRequest, credentials, options);
  }
  getSigv4aSigner() {
    if (!this.sigv4aSigner) {
      let CrtSignerV4 = null;
      try {
        CrtSignerV4 = signatureV4CrtContainer.CrtSignerV4;
        if (typeof CrtSignerV4 !== "function")
          throw new Error();
      } catch (e2) {
        e2.message = `${e2.message}
Please check whether you have installed the "@aws-sdk/signature-v4-crt" package explicitly. 
You must also register the package by calling [require("@aws-sdk/signature-v4-crt");] or an ESM equivalent such as [import "@aws-sdk/signature-v4-crt";]. 
For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt`;
        throw e2;
      }
      this.sigv4aSigner = new CrtSignerV4({
        ...this.signerOptions,
        signingAlgorithm: 1
      });
    }
    return this.sigv4aSigner;
  }
};

// node_modules/@aws-sdk/client-s3/dist-es/endpoint/ruleset.js
var ci = "required";
var cj = "type";
var ck = "conditions";
var cl = "fn";
var cm = "argv";
var cn = "ref";
var co = "assign";
var cp = "url";
var cq = "properties";
var cr = "backend";
var cs = "authSchemes";
var ct = "disableDoubleEncoding";
var cu = "signingName";
var cv = "signingRegion";
var cw = "headers";
var cx = "signingRegionSet";
var a = 6;
var b = false;
var c = true;
var d = "isSet";
var e = "booleanEquals";
var f = "error";
var g = "aws.partition";
var h = "stringEquals";
var i = "getAttr";
var j = "name";
var k = "substring";
var l = "bucketSuffix";
var m = "parseURL";
var n = "{url#scheme}://{url#authority}/{uri_encoded_bucket}{url#path}";
var o = "endpoint";
var p = "tree";
var q = "aws.isVirtualHostableS3Bucket";
var r = "{url#scheme}://{Bucket}.{url#authority}{url#path}";
var s = "not";
var t = "{url#scheme}://{url#authority}{url#path}";
var u = "hardwareType";
var v = "regionPrefix";
var w = "bucketAliasSuffix";
var x = "outpostId";
var y = "isValidHostLabel";
var z = "sigv4a";
var A = "s3-outposts";
var B = "s3";
var C = "{url#scheme}://{url#authority}{url#normalizedPath}{Bucket}";
var D = "https://{Bucket}.s3-accelerate.{partitionResult#dnsSuffix}";
var E = "https://{Bucket}.s3.{partitionResult#dnsSuffix}";
var F = "aws.parseArn";
var G = "bucketArn";
var H = "arnType";
var I = "";
var J = "s3-object-lambda";
var K = "accesspoint";
var L = "accessPointName";
var M = "{url#scheme}://{accessPointName}-{bucketArn#accountId}.{url#authority}{url#path}";
var N = "mrapPartition";
var O = "outpostType";
var P = "arnPrefix";
var Q = "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}";
var R = "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}";
var S = "https://s3.{partitionResult#dnsSuffix}";
var T = { [ci]: false, [cj]: "String" };
var U = { [ci]: true, "default": false, [cj]: "Boolean" };
var V = { [ci]: false, [cj]: "Boolean" };
var W = { [cl]: e, [cm]: [{ [cn]: "Accelerate" }, true] };
var X = { [cl]: e, [cm]: [{ [cn]: "UseFIPS" }, true] };
var Y = { [cl]: e, [cm]: [{ [cn]: "UseDualStack" }, true] };
var Z = { [cl]: d, [cm]: [{ [cn]: "Endpoint" }] };
var aa = { [cl]: g, [cm]: [{ [cn]: "Region" }], [co]: "partitionResult" };
var ab = { [cl]: h, [cm]: [{ [cl]: i, [cm]: [{ [cn]: "partitionResult" }, j] }, "aws-cn"] };
var ac = { [cl]: d, [cm]: [{ [cn]: "Bucket" }] };
var ad = { [cn]: "Bucket" };
var ae = { [cl]: m, [cm]: [{ [cn]: "Endpoint" }], [co]: "url" };
var af = { [cl]: e, [cm]: [{ [cl]: i, [cm]: [{ [cn]: "url" }, "isIp"] }, true] };
var ag = { [cn]: "url" };
var ah = { [cl]: "uriEncode", [cm]: [ad], [co]: "uri_encoded_bucket" };
var ai = { [cr]: "S3Express", [cs]: [{ [ct]: true, [j]: "sigv4", [cu]: "s3express", [cv]: "{Region}" }] };
var aj = {};
var ak = { [cl]: q, [cm]: [ad, false] };
var al = { [f]: "S3Express bucket name is not a valid virtual hostable name.", [cj]: f };
var am = { [cr]: "S3Express", [cs]: [{ [ct]: true, [j]: "sigv4-s3express", [cu]: "s3express", [cv]: "{Region}" }] };
var an = { [cl]: d, [cm]: [{ [cn]: "UseS3ExpressControlEndpoint" }] };
var ao = { [cl]: e, [cm]: [{ [cn]: "UseS3ExpressControlEndpoint" }, true] };
var ap = { [cl]: s, [cm]: [Z] };
var aq = { [f]: "Unrecognized S3Express bucket name format.", [cj]: f };
var ar = { [cl]: s, [cm]: [ac] };
var as = { [cn]: u };
var at = { [ck]: [ap], [f]: "Expected a endpoint to be specified but no endpoint was found", [cj]: f };
var au = { [cs]: [{ [ct]: true, [j]: z, [cu]: A, [cx]: ["*"] }, { [ct]: true, [j]: "sigv4", [cu]: A, [cv]: "{Region}" }] };
var av = { [cl]: e, [cm]: [{ [cn]: "ForcePathStyle" }, false] };
var aw = { [cn]: "ForcePathStyle" };
var ax = { [cl]: e, [cm]: [{ [cn]: "Accelerate" }, false] };
var ay = { [cl]: h, [cm]: [{ [cn]: "Region" }, "aws-global"] };
var az = { [cs]: [{ [ct]: true, [j]: "sigv4", [cu]: B, [cv]: "us-east-1" }] };
var aA = { [cl]: s, [cm]: [ay] };
var aB = { [cl]: e, [cm]: [{ [cn]: "UseGlobalEndpoint" }, true] };
var aC = { [cp]: "https://{Bucket}.s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", [cq]: { [cs]: [{ [ct]: true, [j]: "sigv4", [cu]: B, [cv]: "{Region}" }] }, [cw]: {} };
var aD = { [cs]: [{ [ct]: true, [j]: "sigv4", [cu]: B, [cv]: "{Region}" }] };
var aE = { [cl]: e, [cm]: [{ [cn]: "UseGlobalEndpoint" }, false] };
var aF = { [cl]: e, [cm]: [{ [cn]: "UseDualStack" }, false] };
var aG = { [cp]: "https://{Bucket}.s3-fips.{Region}.{partitionResult#dnsSuffix}", [cq]: aD, [cw]: {} };
var aH = { [cl]: e, [cm]: [{ [cn]: "UseFIPS" }, false] };
var aI = { [cp]: "https://{Bucket}.s3-accelerate.dualstack.{partitionResult#dnsSuffix}", [cq]: aD, [cw]: {} };
var aJ = { [cp]: "https://{Bucket}.s3.dualstack.{Region}.{partitionResult#dnsSuffix}", [cq]: aD, [cw]: {} };
var aK = { [cl]: e, [cm]: [{ [cl]: i, [cm]: [ag, "isIp"] }, false] };
var aL = { [cp]: C, [cq]: aD, [cw]: {} };
var aM = { [cp]: r, [cq]: aD, [cw]: {} };
var aN = { [o]: aM, [cj]: o };
var aO = { [cp]: D, [cq]: aD, [cw]: {} };
var aP = { [cp]: "https://{Bucket}.s3.{Region}.{partitionResult#dnsSuffix}", [cq]: aD, [cw]: {} };
var aQ = { [f]: "Invalid region: region was not a valid DNS name.", [cj]: f };
var aR = { [cn]: G };
var aS = { [cn]: H };
var aT = { [cl]: i, [cm]: [aR, "service"] };
var aU = { [cn]: L };
var aV = { [ck]: [Y], [f]: "S3 Object Lambda does not support Dual-stack", [cj]: f };
var aW = { [ck]: [W], [f]: "S3 Object Lambda does not support S3 Accelerate", [cj]: f };
var aX = { [ck]: [{ [cl]: d, [cm]: [{ [cn]: "DisableAccessPoints" }] }, { [cl]: e, [cm]: [{ [cn]: "DisableAccessPoints" }, true] }], [f]: "Access points are not supported for this operation", [cj]: f };
var aY = { [ck]: [{ [cl]: d, [cm]: [{ [cn]: "UseArnRegion" }] }, { [cl]: e, [cm]: [{ [cn]: "UseArnRegion" }, false] }, { [cl]: s, [cm]: [{ [cl]: h, [cm]: [{ [cl]: i, [cm]: [aR, "region"] }, "{Region}"] }] }], [f]: "Invalid configuration: region from ARN `{bucketArn#region}` does not match client region `{Region}` and UseArnRegion is `false`", [cj]: f };
var aZ = { [cl]: i, [cm]: [{ [cn]: "bucketPartition" }, j] };
var ba = { [cl]: i, [cm]: [aR, "accountId"] };
var bb = { [cs]: [{ [ct]: true, [j]: "sigv4", [cu]: J, [cv]: "{bucketArn#region}" }] };
var bc = { [f]: "Invalid ARN: The access point name may only contain a-z, A-Z, 0-9 and `-`. Found: `{accessPointName}`", [cj]: f };
var bd = { [f]: "Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and `-`. Found: `{bucketArn#accountId}`", [cj]: f };
var be = { [f]: "Invalid region in ARN: `{bucketArn#region}` (invalid DNS name)", [cj]: f };
var bf = { [f]: "Client was configured for partition `{partitionResult#name}` but ARN (`{Bucket}`) has `{bucketPartition#name}`", [cj]: f };
var bg = { [f]: "Invalid ARN: The ARN may only contain a single resource component after `accesspoint`.", [cj]: f };
var bh = { [f]: "Invalid ARN: Expected a resource of the format `accesspoint:<accesspoint name>` but no name was provided", [cj]: f };
var bi = { [cs]: [{ [ct]: true, [j]: "sigv4", [cu]: B, [cv]: "{bucketArn#region}" }] };
var bj = { [cs]: [{ [ct]: true, [j]: z, [cu]: A, [cx]: ["*"] }, { [ct]: true, [j]: "sigv4", [cu]: A, [cv]: "{bucketArn#region}" }] };
var bk = { [cl]: F, [cm]: [ad] };
var bl = { [cp]: "https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [cq]: aD, [cw]: {} };
var bm = { [cp]: "https://s3-fips.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [cq]: aD, [cw]: {} };
var bn = { [cp]: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [cq]: aD, [cw]: {} };
var bo = { [cp]: Q, [cq]: aD, [cw]: {} };
var bp = { [cp]: "https://s3.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [cq]: aD, [cw]: {} };
var bq = { [cn]: "UseObjectLambdaEndpoint" };
var br = { [cs]: [{ [ct]: true, [j]: "sigv4", [cu]: J, [cv]: "{Region}" }] };
var bs = { [cp]: "https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", [cq]: aD, [cw]: {} };
var bt = { [cp]: "https://s3-fips.{Region}.{partitionResult#dnsSuffix}", [cq]: aD, [cw]: {} };
var bu = { [cp]: "https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}", [cq]: aD, [cw]: {} };
var bv = { [cp]: t, [cq]: aD, [cw]: {} };
var bw = { [cp]: "https://s3.{Region}.{partitionResult#dnsSuffix}", [cq]: aD, [cw]: {} };
var bx = [{ [cn]: "Region" }];
var by = [{ [cn]: "Endpoint" }];
var bz = [ad];
var bA = [Y];
var bB = [W];
var bC = [Z, ae];
var bD = [{ [cl]: d, [cm]: [{ [cn]: "DisableS3ExpressSessionAuth" }] }, { [cl]: e, [cm]: [{ [cn]: "DisableS3ExpressSessionAuth" }, true] }];
var bE = [af];
var bF = [ah];
var bG = [ak];
var bH = [X];
var bI = [{ [cl]: k, [cm]: [ad, 6, 14, true], [co]: "s3expressAvailabilityZoneId" }, { [cl]: k, [cm]: [ad, 14, 16, true], [co]: "s3expressAvailabilityZoneDelim" }, { [cl]: h, [cm]: [{ [cn]: "s3expressAvailabilityZoneDelim" }, "--"] }];
var bJ = [{ [ck]: [X], [o]: { [cp]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.{Region}.amazonaws.com", [cq]: ai, [cw]: {} }, [cj]: o }, { [o]: { [cp]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.{Region}.amazonaws.com", [cq]: ai, [cw]: {} }, [cj]: o }];
var bK = [{ [cl]: k, [cm]: [ad, 6, 15, true], [co]: "s3expressAvailabilityZoneId" }, { [cl]: k, [cm]: [ad, 15, 17, true], [co]: "s3expressAvailabilityZoneDelim" }, { [cl]: h, [cm]: [{ [cn]: "s3expressAvailabilityZoneDelim" }, "--"] }];
var bL = [{ [cl]: k, [cm]: [ad, 6, 19, true], [co]: "s3expressAvailabilityZoneId" }, { [cl]: k, [cm]: [ad, 19, 21, true], [co]: "s3expressAvailabilityZoneDelim" }, { [cl]: h, [cm]: [{ [cn]: "s3expressAvailabilityZoneDelim" }, "--"] }];
var bM = [{ [cl]: k, [cm]: [ad, 6, 20, true], [co]: "s3expressAvailabilityZoneId" }, { [cl]: k, [cm]: [ad, 20, 22, true], [co]: "s3expressAvailabilityZoneDelim" }, { [cl]: h, [cm]: [{ [cn]: "s3expressAvailabilityZoneDelim" }, "--"] }];
var bN = [{ [cl]: k, [cm]: [ad, 6, 26, true], [co]: "s3expressAvailabilityZoneId" }, { [cl]: k, [cm]: [ad, 26, 28, true], [co]: "s3expressAvailabilityZoneDelim" }, { [cl]: h, [cm]: [{ [cn]: "s3expressAvailabilityZoneDelim" }, "--"] }];
var bO = [{ [ck]: [X], [o]: { [cp]: "https://{Bucket}.s3express-fips-{s3expressAvailabilityZoneId}.{Region}.amazonaws.com", [cq]: am, [cw]: {} }, [cj]: o }, { [o]: { [cp]: "https://{Bucket}.s3express-{s3expressAvailabilityZoneId}.{Region}.amazonaws.com", [cq]: am, [cw]: {} }, [cj]: o }];
var bP = [ac];
var bQ = [{ [cl]: y, [cm]: [{ [cn]: x }, false] }];
var bR = [{ [cl]: h, [cm]: [{ [cn]: v }, "beta"] }];
var bS = ["*"];
var bT = [aa];
var bU = [{ [cl]: y, [cm]: [{ [cn]: "Region" }, false] }];
var bV = [{ [cl]: h, [cm]: [{ [cn]: "Region" }, "us-east-1"] }];
var bW = [{ [cl]: h, [cm]: [aS, K] }];
var bX = [{ [cl]: i, [cm]: [aR, "resourceId[1]"], [co]: L }, { [cl]: s, [cm]: [{ [cl]: h, [cm]: [aU, I] }] }];
var bY = [aR, "resourceId[1]"];
var bZ = [{ [cl]: s, [cm]: [{ [cl]: h, [cm]: [{ [cl]: i, [cm]: [aR, "region"] }, I] }] }];
var ca = [{ [cl]: s, [cm]: [{ [cl]: d, [cm]: [{ [cl]: i, [cm]: [aR, "resourceId[2]"] }] }] }];
var cb = [aR, "resourceId[2]"];
var cc = [{ [cl]: g, [cm]: [{ [cl]: i, [cm]: [aR, "region"] }], [co]: "bucketPartition" }];
var cd = [{ [cl]: h, [cm]: [aZ, { [cl]: i, [cm]: [{ [cn]: "partitionResult" }, j] }] }];
var ce = [{ [cl]: y, [cm]: [{ [cl]: i, [cm]: [aR, "region"] }, true] }];
var cf = [{ [cl]: y, [cm]: [ba, false] }];
var cg = [{ [cl]: y, [cm]: [aU, false] }];
var ch = [{ [cl]: y, [cm]: [{ [cn]: "Region" }, true] }];
var _data = { version: "1.0", parameters: { Bucket: T, Region: T, UseFIPS: U, UseDualStack: U, Endpoint: T, ForcePathStyle: U, Accelerate: U, UseGlobalEndpoint: U, UseObjectLambdaEndpoint: V, Key: T, Prefix: T, CopySource: T, DisableAccessPoints: V, DisableMultiRegionAccessPoints: U, UseArnRegion: V, UseS3ExpressControlEndpoint: V, DisableS3ExpressSessionAuth: V }, rules: [{ [ck]: [{ [cl]: d, [cm]: bx }], rules: [{ [ck]: [W, X], error: "Accelerate cannot be used with FIPS", [cj]: f }, { [ck]: [Y, Z], error: "Cannot set dual-stack in combination with a custom endpoint.", [cj]: f }, { [ck]: [Z, X], error: "A custom endpoint cannot be combined with FIPS", [cj]: f }, { [ck]: [Z, W], error: "A custom endpoint cannot be combined with S3 Accelerate", [cj]: f }, { [ck]: [X, aa, ab], error: "Partition does not support FIPS", [cj]: f }, { [ck]: [ac, { [cl]: k, [cm]: [ad, 0, a, c], [co]: l }, { [cl]: h, [cm]: [{ [cn]: l }, "--x-s3"] }], rules: [{ [ck]: bA, error: "S3Express does not support Dual-stack.", [cj]: f }, { [ck]: bB, error: "S3Express does not support S3 Accelerate.", [cj]: f }, { [ck]: bC, rules: [{ [ck]: bD, rules: [{ [ck]: bE, rules: [{ [ck]: bF, rules: [{ endpoint: { [cp]: n, [cq]: ai, [cw]: aj }, [cj]: o }], [cj]: p }], [cj]: p }, { [ck]: bG, rules: [{ endpoint: { [cp]: r, [cq]: ai, [cw]: aj }, [cj]: o }], [cj]: p }, al], [cj]: p }, { [ck]: bE, rules: [{ [ck]: bF, rules: [{ endpoint: { [cp]: n, [cq]: am, [cw]: aj }, [cj]: o }], [cj]: p }], [cj]: p }, { [ck]: bG, rules: [{ endpoint: { [cp]: r, [cq]: am, [cw]: aj }, [cj]: o }], [cj]: p }, al], [cj]: p }, { [ck]: [an, ao], rules: [{ [ck]: [ah, ap], rules: [{ [ck]: bH, endpoint: { [cp]: "https://s3express-control-fips.{Region}.amazonaws.com/{uri_encoded_bucket}", [cq]: ai, [cw]: aj }, [cj]: o }, { endpoint: { [cp]: "https://s3express-control.{Region}.amazonaws.com/{uri_encoded_bucket}", [cq]: ai, [cw]: aj }, [cj]: o }], [cj]: p }], [cj]: p }, { [ck]: bG, rules: [{ [ck]: bD, rules: [{ [ck]: bI, rules: bJ, [cj]: p }, { [ck]: bK, rules: bJ, [cj]: p }, { [ck]: bL, rules: bJ, [cj]: p }, { [ck]: bM, rules: bJ, [cj]: p }, { [ck]: bN, rules: bJ, [cj]: p }, aq], [cj]: p }, { [ck]: bI, rules: bO, [cj]: p }, { [ck]: bK, rules: bO, [cj]: p }, { [ck]: bL, rules: bO, [cj]: p }, { [ck]: bM, rules: bO, [cj]: p }, { [ck]: bN, rules: bO, [cj]: p }, aq], [cj]: p }, al], [cj]: p }, { [ck]: [ar, an, ao], rules: [{ [ck]: bC, endpoint: { [cp]: t, [cq]: ai, [cw]: aj }, [cj]: o }, { [ck]: bH, endpoint: { [cp]: "https://s3express-control-fips.{Region}.amazonaws.com", [cq]: ai, [cw]: aj }, [cj]: o }, { endpoint: { [cp]: "https://s3express-control.{Region}.amazonaws.com", [cq]: ai, [cw]: aj }, [cj]: o }], [cj]: p }, { [ck]: [ac, { [cl]: k, [cm]: [ad, 49, 50, c], [co]: u }, { [cl]: k, [cm]: [ad, 8, 12, c], [co]: v }, { [cl]: k, [cm]: [ad, 0, 7, c], [co]: w }, { [cl]: k, [cm]: [ad, 32, 49, c], [co]: x }, { [cl]: g, [cm]: bx, [co]: "regionPartition" }, { [cl]: h, [cm]: [{ [cn]: w }, "--op-s3"] }], rules: [{ [ck]: bQ, rules: [{ [ck]: [{ [cl]: h, [cm]: [as, "e"] }], rules: [{ [ck]: bR, rules: [at, { [ck]: bC, endpoint: { [cp]: "https://{Bucket}.ec2.{url#authority}", [cq]: au, [cw]: aj }, [cj]: o }], [cj]: p }, { endpoint: { [cp]: "https://{Bucket}.ec2.s3-outposts.{Region}.{regionPartition#dnsSuffix}", [cq]: au, [cw]: aj }, [cj]: o }], [cj]: p }, { [ck]: [{ [cl]: h, [cm]: [as, "o"] }], rules: [{ [ck]: bR, rules: [at, { [ck]: bC, endpoint: { [cp]: "https://{Bucket}.op-{outpostId}.{url#authority}", [cq]: au, [cw]: aj }, [cj]: o }], [cj]: p }, { endpoint: { [cp]: "https://{Bucket}.op-{outpostId}.s3-outposts.{Region}.{regionPartition#dnsSuffix}", [cq]: au, [cw]: aj }, [cj]: o }], [cj]: p }, { error: 'Unrecognized hardware type: "Expected hardware type o or e but got {hardwareType}"', [cj]: f }], [cj]: p }, { error: "Invalid ARN: The outpost Id must only contain a-z, A-Z, 0-9 and `-`.", [cj]: f }], [cj]: p }, { [ck]: bP, rules: [{ [ck]: [Z, { [cl]: s, [cm]: [{ [cl]: d, [cm]: [{ [cl]: m, [cm]: by }] }] }], error: "Custom endpoint `{Endpoint}` was not a valid URI", [cj]: f }, { [ck]: [av, ak], rules: [{ [ck]: bT, rules: [{ [ck]: bU, rules: [{ [ck]: [W, ab], error: "S3 Accelerate cannot be used in this region", [cj]: f }, { [ck]: [Y, X, ax, ap, ay], endpoint: { [cp]: "https://{Bucket}.s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}", [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [Y, X, ax, ap, aA, aB], rules: [{ endpoint: aC, [cj]: o }], [cj]: p }, { [ck]: [Y, X, ax, ap, aA, aE], endpoint: aC, [cj]: o }, { [ck]: [aF, X, ax, ap, ay], endpoint: { [cp]: "https://{Bucket}.s3-fips.us-east-1.{partitionResult#dnsSuffix}", [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [aF, X, ax, ap, aA, aB], rules: [{ endpoint: aG, [cj]: o }], [cj]: p }, { [ck]: [aF, X, ax, ap, aA, aE], endpoint: aG, [cj]: o }, { [ck]: [Y, aH, W, ap, ay], endpoint: { [cp]: "https://{Bucket}.s3-accelerate.dualstack.us-east-1.{partitionResult#dnsSuffix}", [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [Y, aH, W, ap, aA, aB], rules: [{ endpoint: aI, [cj]: o }], [cj]: p }, { [ck]: [Y, aH, W, ap, aA, aE], endpoint: aI, [cj]: o }, { [ck]: [Y, aH, ax, ap, ay], endpoint: { [cp]: "https://{Bucket}.s3.dualstack.us-east-1.{partitionResult#dnsSuffix}", [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [Y, aH, ax, ap, aA, aB], rules: [{ endpoint: aJ, [cj]: o }], [cj]: p }, { [ck]: [Y, aH, ax, ap, aA, aE], endpoint: aJ, [cj]: o }, { [ck]: [aF, aH, ax, Z, ae, af, ay], endpoint: { [cp]: C, [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [aF, aH, ax, Z, ae, aK, ay], endpoint: { [cp]: r, [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [aF, aH, ax, Z, ae, af, aA, aB], rules: [{ [ck]: bV, endpoint: aL, [cj]: o }, { endpoint: aL, [cj]: o }], [cj]: p }, { [ck]: [aF, aH, ax, Z, ae, aK, aA, aB], rules: [{ [ck]: bV, endpoint: aM, [cj]: o }, aN], [cj]: p }, { [ck]: [aF, aH, ax, Z, ae, af, aA, aE], endpoint: aL, [cj]: o }, { [ck]: [aF, aH, ax, Z, ae, aK, aA, aE], endpoint: aM, [cj]: o }, { [ck]: [aF, aH, W, ap, ay], endpoint: { [cp]: D, [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [aF, aH, W, ap, aA, aB], rules: [{ [ck]: bV, endpoint: aO, [cj]: o }, { endpoint: aO, [cj]: o }], [cj]: p }, { [ck]: [aF, aH, W, ap, aA, aE], endpoint: aO, [cj]: o }, { [ck]: [aF, aH, ax, ap, ay], endpoint: { [cp]: E, [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [aF, aH, ax, ap, aA, aB], rules: [{ [ck]: bV, endpoint: { [cp]: E, [cq]: aD, [cw]: aj }, [cj]: o }, { endpoint: aP, [cj]: o }], [cj]: p }, { [ck]: [aF, aH, ax, ap, aA, aE], endpoint: aP, [cj]: o }], [cj]: p }, aQ], [cj]: p }], [cj]: p }, { [ck]: [Z, ae, { [cl]: h, [cm]: [{ [cl]: i, [cm]: [ag, "scheme"] }, "http"] }, { [cl]: q, [cm]: [ad, c] }, av, aH, aF, ax], rules: [{ [ck]: bT, rules: [{ [ck]: bU, rules: [aN], [cj]: p }, aQ], [cj]: p }], [cj]: p }, { [ck]: [av, { [cl]: F, [cm]: bz, [co]: G }], rules: [{ [ck]: [{ [cl]: i, [cm]: [aR, "resourceId[0]"], [co]: H }, { [cl]: s, [cm]: [{ [cl]: h, [cm]: [aS, I] }] }], rules: [{ [ck]: [{ [cl]: h, [cm]: [aT, J] }], rules: [{ [ck]: bW, rules: [{ [ck]: bX, rules: [aV, aW, { [ck]: bZ, rules: [aX, { [ck]: ca, rules: [aY, { [ck]: cc, rules: [{ [ck]: bT, rules: [{ [ck]: cd, rules: [{ [ck]: ce, rules: [{ [ck]: [{ [cl]: h, [cm]: [ba, I] }], error: "Invalid ARN: Missing account id", [cj]: f }, { [ck]: cf, rules: [{ [ck]: cg, rules: [{ [ck]: bC, endpoint: { [cp]: M, [cq]: bb, [cw]: aj }, [cj]: o }, { [ck]: bH, endpoint: { [cp]: "https://{accessPointName}-{bucketArn#accountId}.s3-object-lambda-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}", [cq]: bb, [cw]: aj }, [cj]: o }, { endpoint: { [cp]: "https://{accessPointName}-{bucketArn#accountId}.s3-object-lambda.{bucketArn#region}.{bucketPartition#dnsSuffix}", [cq]: bb, [cw]: aj }, [cj]: o }], [cj]: p }, bc], [cj]: p }, bd], [cj]: p }, be], [cj]: p }, bf], [cj]: p }], [cj]: p }], [cj]: p }, bg], [cj]: p }, { error: "Invalid ARN: bucket ARN is missing a region", [cj]: f }], [cj]: p }, bh], [cj]: p }, { error: "Invalid ARN: Object Lambda ARNs only support `accesspoint` arn types, but found: `{arnType}`", [cj]: f }], [cj]: p }, { [ck]: bW, rules: [{ [ck]: bX, rules: [{ [ck]: bZ, rules: [{ [ck]: bW, rules: [{ [ck]: bZ, rules: [aX, { [ck]: ca, rules: [aY, { [ck]: cc, rules: [{ [ck]: bT, rules: [{ [ck]: [{ [cl]: h, [cm]: [aZ, "{partitionResult#name}"] }], rules: [{ [ck]: ce, rules: [{ [ck]: [{ [cl]: h, [cm]: [aT, B] }], rules: [{ [ck]: cf, rules: [{ [ck]: cg, rules: [{ [ck]: bB, error: "Access Points do not support S3 Accelerate", [cj]: f }, { [ck]: [X, Y], endpoint: { [cp]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint-fips.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}", [cq]: bi, [cw]: aj }, [cj]: o }, { [ck]: [X, aF], endpoint: { [cp]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}", [cq]: bi, [cw]: aj }, [cj]: o }, { [ck]: [aH, Y], endpoint: { [cp]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}", [cq]: bi, [cw]: aj }, [cj]: o }, { [ck]: [aH, aF, Z, ae], endpoint: { [cp]: M, [cq]: bi, [cw]: aj }, [cj]: o }, { [ck]: [aH, aF], endpoint: { [cp]: "https://{accessPointName}-{bucketArn#accountId}.s3-accesspoint.{bucketArn#region}.{bucketPartition#dnsSuffix}", [cq]: bi, [cw]: aj }, [cj]: o }], [cj]: p }, bc], [cj]: p }, bd], [cj]: p }, { error: "Invalid ARN: The ARN was not for the S3 service, found: {bucketArn#service}", [cj]: f }], [cj]: p }, be], [cj]: p }, bf], [cj]: p }], [cj]: p }], [cj]: p }, bg], [cj]: p }], [cj]: p }], [cj]: p }, { [ck]: [{ [cl]: y, [cm]: [aU, c] }], rules: [{ [ck]: bA, error: "S3 MRAP does not support dual-stack", [cj]: f }, { [ck]: bH, error: "S3 MRAP does not support FIPS", [cj]: f }, { [ck]: bB, error: "S3 MRAP does not support S3 Accelerate", [cj]: f }, { [ck]: [{ [cl]: e, [cm]: [{ [cn]: "DisableMultiRegionAccessPoints" }, c] }], error: "Invalid configuration: Multi-Region Access Point ARNs are disabled.", [cj]: f }, { [ck]: [{ [cl]: g, [cm]: bx, [co]: N }], rules: [{ [ck]: [{ [cl]: h, [cm]: [{ [cl]: i, [cm]: [{ [cn]: N }, j] }, { [cl]: i, [cm]: [aR, "partition"] }] }], rules: [{ endpoint: { [cp]: "https://{accessPointName}.accesspoint.s3-global.{mrapPartition#dnsSuffix}", [cq]: { [cs]: [{ [ct]: c, name: z, [cu]: B, [cx]: bS }] }, [cw]: aj }, [cj]: o }], [cj]: p }, { error: "Client was configured for partition `{mrapPartition#name}` but bucket referred to partition `{bucketArn#partition}`", [cj]: f }], [cj]: p }], [cj]: p }, { error: "Invalid Access Point Name", [cj]: f }], [cj]: p }, bh], [cj]: p }, { [ck]: [{ [cl]: h, [cm]: [aT, A] }], rules: [{ [ck]: bA, error: "S3 Outposts does not support Dual-stack", [cj]: f }, { [ck]: bH, error: "S3 Outposts does not support FIPS", [cj]: f }, { [ck]: bB, error: "S3 Outposts does not support S3 Accelerate", [cj]: f }, { [ck]: [{ [cl]: d, [cm]: [{ [cl]: i, [cm]: [aR, "resourceId[4]"] }] }], error: "Invalid Arn: Outpost Access Point ARN contains sub resources", [cj]: f }, { [ck]: [{ [cl]: i, [cm]: bY, [co]: x }], rules: [{ [ck]: bQ, rules: [aY, { [ck]: cc, rules: [{ [ck]: bT, rules: [{ [ck]: cd, rules: [{ [ck]: ce, rules: [{ [ck]: cf, rules: [{ [ck]: [{ [cl]: i, [cm]: cb, [co]: O }], rules: [{ [ck]: [{ [cl]: i, [cm]: [aR, "resourceId[3]"], [co]: L }], rules: [{ [ck]: [{ [cl]: h, [cm]: [{ [cn]: O }, K] }], rules: [{ [ck]: bC, endpoint: { [cp]: "https://{accessPointName}-{bucketArn#accountId}.{outpostId}.{url#authority}", [cq]: bj, [cw]: aj }, [cj]: o }, { endpoint: { [cp]: "https://{accessPointName}-{bucketArn#accountId}.{outpostId}.s3-outposts.{bucketArn#region}.{bucketPartition#dnsSuffix}", [cq]: bj, [cw]: aj }, [cj]: o }], [cj]: p }, { error: "Expected an outpost type `accesspoint`, found {outpostType}", [cj]: f }], [cj]: p }, { error: "Invalid ARN: expected an access point name", [cj]: f }], [cj]: p }, { error: "Invalid ARN: Expected a 4-component resource", [cj]: f }], [cj]: p }, bd], [cj]: p }, be], [cj]: p }, bf], [cj]: p }], [cj]: p }], [cj]: p }, { error: "Invalid ARN: The outpost Id may only contain a-z, A-Z, 0-9 and `-`. Found: `{outpostId}`", [cj]: f }], [cj]: p }, { error: "Invalid ARN: The Outpost Id was not set", [cj]: f }], [cj]: p }, { error: "Invalid ARN: Unrecognized format: {Bucket} (type: {arnType})", [cj]: f }], [cj]: p }, { error: "Invalid ARN: No ARN type specified", [cj]: f }], [cj]: p }, { [ck]: [{ [cl]: k, [cm]: [ad, 0, 4, b], [co]: P }, { [cl]: h, [cm]: [{ [cn]: P }, "arn:"] }, { [cl]: s, [cm]: [{ [cl]: d, [cm]: [bk] }] }], error: "Invalid ARN: `{Bucket}` was not a valid ARN", [cj]: f }, { [ck]: [{ [cl]: e, [cm]: [aw, c] }, bk], error: "Path-style addressing cannot be used with ARN buckets", [cj]: f }, { [ck]: bF, rules: [{ [ck]: bT, rules: [{ [ck]: [ax], rules: [{ [ck]: [Y, ap, X, ay], endpoint: { [cp]: "https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [Y, ap, X, aA, aB], rules: [{ endpoint: bl, [cj]: o }], [cj]: p }, { [ck]: [Y, ap, X, aA, aE], endpoint: bl, [cj]: o }, { [ck]: [aF, ap, X, ay], endpoint: { [cp]: "https://s3-fips.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [aF, ap, X, aA, aB], rules: [{ endpoint: bm, [cj]: o }], [cj]: p }, { [ck]: [aF, ap, X, aA, aE], endpoint: bm, [cj]: o }, { [ck]: [Y, ap, aH, ay], endpoint: { [cp]: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [Y, ap, aH, aA, aB], rules: [{ endpoint: bn, [cj]: o }], [cj]: p }, { [ck]: [Y, ap, aH, aA, aE], endpoint: bn, [cj]: o }, { [ck]: [aF, Z, ae, aH, ay], endpoint: { [cp]: Q, [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [aF, Z, ae, aH, aA, aB], rules: [{ [ck]: bV, endpoint: bo, [cj]: o }, { endpoint: bo, [cj]: o }], [cj]: p }, { [ck]: [aF, Z, ae, aH, aA, aE], endpoint: bo, [cj]: o }, { [ck]: [aF, ap, aH, ay], endpoint: { [cp]: R, [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [aF, ap, aH, aA, aB], rules: [{ [ck]: bV, endpoint: { [cp]: R, [cq]: aD, [cw]: aj }, [cj]: o }, { endpoint: bp, [cj]: o }], [cj]: p }, { [ck]: [aF, ap, aH, aA, aE], endpoint: bp, [cj]: o }], [cj]: p }, { error: "Path-style addressing cannot be used with S3 Accelerate", [cj]: f }], [cj]: p }], [cj]: p }], [cj]: p }, { [ck]: [{ [cl]: d, [cm]: [bq] }, { [cl]: e, [cm]: [bq, c] }], rules: [{ [ck]: bT, rules: [{ [ck]: ch, rules: [aV, aW, { [ck]: bC, endpoint: { [cp]: t, [cq]: br, [cw]: aj }, [cj]: o }, { [ck]: bH, endpoint: { [cp]: "https://s3-object-lambda-fips.{Region}.{partitionResult#dnsSuffix}", [cq]: br, [cw]: aj }, [cj]: o }, { endpoint: { [cp]: "https://s3-object-lambda.{Region}.{partitionResult#dnsSuffix}", [cq]: br, [cw]: aj }, [cj]: o }], [cj]: p }, aQ], [cj]: p }], [cj]: p }, { [ck]: [ar], rules: [{ [ck]: bT, rules: [{ [ck]: ch, rules: [{ [ck]: [X, Y, ap, ay], endpoint: { [cp]: "https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}", [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [X, Y, ap, aA, aB], rules: [{ endpoint: bs, [cj]: o }], [cj]: p }, { [ck]: [X, Y, ap, aA, aE], endpoint: bs, [cj]: o }, { [ck]: [X, aF, ap, ay], endpoint: { [cp]: "https://s3-fips.us-east-1.{partitionResult#dnsSuffix}", [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [X, aF, ap, aA, aB], rules: [{ endpoint: bt, [cj]: o }], [cj]: p }, { [ck]: [X, aF, ap, aA, aE], endpoint: bt, [cj]: o }, { [ck]: [aH, Y, ap, ay], endpoint: { [cp]: "https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}", [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [aH, Y, ap, aA, aB], rules: [{ endpoint: bu, [cj]: o }], [cj]: p }, { [ck]: [aH, Y, ap, aA, aE], endpoint: bu, [cj]: o }, { [ck]: [aH, aF, Z, ae, ay], endpoint: { [cp]: t, [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [aH, aF, Z, ae, aA, aB], rules: [{ [ck]: bV, endpoint: bv, [cj]: o }, { endpoint: bv, [cj]: o }], [cj]: p }, { [ck]: [aH, aF, Z, ae, aA, aE], endpoint: bv, [cj]: o }, { [ck]: [aH, aF, ap, ay], endpoint: { [cp]: S, [cq]: az, [cw]: aj }, [cj]: o }, { [ck]: [aH, aF, ap, aA, aB], rules: [{ [ck]: bV, endpoint: { [cp]: S, [cq]: aD, [cw]: aj }, [cj]: o }, { endpoint: bw, [cj]: o }], [cj]: p }, { [ck]: [aH, aF, ap, aA, aE], endpoint: bw, [cj]: o }], [cj]: p }, aQ], [cj]: p }], [cj]: p }], [cj]: p }, { error: "A region must be set when sending requests to S3.", [cj]: f }] };
var ruleSet = _data;

// node_modules/@aws-sdk/client-s3/dist-es/endpoint/endpointResolver.js
var cache = new EndpointCache({
  size: 50,
  params: [
    "Accelerate",
    "Bucket",
    "DisableAccessPoints",
    "DisableMultiRegionAccessPoints",
    "DisableS3ExpressSessionAuth",
    "Endpoint",
    "ForcePathStyle",
    "Region",
    "UseArnRegion",
    "UseDualStack",
    "UseFIPS",
    "UseGlobalEndpoint",
    "UseObjectLambdaEndpoint",
    "UseS3ExpressControlEndpoint"
  ]
});
var defaultEndpointResolver = (endpointParams, context = {}) => {
  return cache.get(endpointParams, () => resolveEndpoint(ruleSet, {
    endpointParams,
    logger: context.logger
  }));
};
customEndpointFunctions.aws = awsEndpointFunctions;

// node_modules/@aws-sdk/client-s3/dist-es/auth/httpAuthSchemeProvider.js
var createEndpointRuleSetHttpAuthSchemeParametersProvider = (defaultHttpAuthSchemeParametersProvider) => async (config, context, input) => {
  if (!input) {
    throw new Error(`Could not find \`input\` for \`defaultEndpointRuleSetHttpAuthSchemeParametersProvider\``);
  }
  const defaultParameters = await defaultHttpAuthSchemeParametersProvider(config, context, input);
  const instructionsFn = getSmithyContext(context)?.commandInstance?.constructor?.getEndpointParameterInstructions;
  if (!instructionsFn) {
    throw new Error(`getEndpointParameterInstructions() is not defined on \`${context.commandName}\``);
  }
  const endpointParameters = await resolveParams(input, { getEndpointParameterInstructions: instructionsFn }, config);
  return Object.assign(defaultParameters, endpointParameters);
};
var _defaultS3HttpAuthSchemeParametersProvider = async (config, context, input) => {
  return {
    operation: getSmithyContext(context).operation,
    region: await normalizeProvider(config.region)() || (() => {
      throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
    })()
  };
};
var defaultS3HttpAuthSchemeParametersProvider = createEndpointRuleSetHttpAuthSchemeParametersProvider(_defaultS3HttpAuthSchemeParametersProvider);
function createAwsAuthSigv4HttpAuthOption(authParameters) {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "s3",
      region: authParameters.region
    },
    propertiesExtractor: (config, context) => ({
      signingProperties: {
        config,
        context
      }
    })
  };
}
function createAwsAuthSigv4aHttpAuthOption(authParameters) {
  return {
    schemeId: "aws.auth#sigv4a",
    signingProperties: {
      name: "s3",
      region: authParameters.region
    },
    propertiesExtractor: (config, context) => ({
      signingProperties: {
        config,
        context
      }
    })
  };
}
var createEndpointRuleSetHttpAuthSchemeProvider = (defaultEndpointResolver2, defaultHttpAuthSchemeResolver, createHttpAuthOptionFunctions) => {
  const endpointRuleSetHttpAuthSchemeProvider = (authParameters) => {
    const endpoint = defaultEndpointResolver2(authParameters);
    const authSchemes = endpoint.properties?.authSchemes;
    if (!authSchemes) {
      return defaultHttpAuthSchemeResolver(authParameters);
    }
    const options = [];
    for (const scheme of authSchemes) {
      const { name: resolvedName, properties = {}, ...rest } = scheme;
      const name = resolvedName.toLowerCase();
      if (resolvedName !== name) {
        console.warn(`HttpAuthScheme has been normalized with lowercasing: \`${resolvedName}\` to \`${name}\``);
      }
      let schemeId;
      if (name === "sigv4a") {
        schemeId = "aws.auth#sigv4a";
        const sigv4Present = authSchemes.find((s2) => {
          const name2 = s2.name.toLowerCase();
          return name2 !== "sigv4a" && name2.startsWith("sigv4");
        });
        if (!signatureV4CrtContainer.CrtSignerV4 && sigv4Present) {
          continue;
        }
      } else if (name.startsWith("sigv4")) {
        schemeId = "aws.auth#sigv4";
      } else {
        throw new Error(`Unknown HttpAuthScheme found in \`@smithy.rules#endpointRuleSet\`: \`${name}\``);
      }
      const createOption = createHttpAuthOptionFunctions[schemeId];
      if (!createOption) {
        throw new Error(`Could not find HttpAuthOption create function for \`${schemeId}\``);
      }
      const option = createOption(authParameters);
      option.schemeId = schemeId;
      option.signingProperties = { ...option.signingProperties || {}, ...rest, ...properties };
      options.push(option);
    }
    return options;
  };
  return endpointRuleSetHttpAuthSchemeProvider;
};
var _defaultS3HttpAuthSchemeProvider = (authParameters) => {
  const options = [];
  switch (authParameters.operation) {
    default: {
      options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
      options.push(createAwsAuthSigv4aHttpAuthOption(authParameters));
    }
  }
  return options;
};
var defaultS3HttpAuthSchemeProvider = createEndpointRuleSetHttpAuthSchemeProvider(defaultEndpointResolver, _defaultS3HttpAuthSchemeProvider, {
  "aws.auth#sigv4": createAwsAuthSigv4HttpAuthOption,
  "aws.auth#sigv4a": createAwsAuthSigv4aHttpAuthOption
});
var resolveHttpAuthSchemeConfig = (config) => {
  const config_0 = resolveAwsSdkSigV4Config(config);
  const config_1 = resolveAwsSdkSigV4AConfig(config_0);
  return {
    ...config_1
  };
};

// node_modules/@aws-sdk/client-s3/dist-es/endpoint/EndpointParameters.js
var resolveClientEndpointParameters = (options) => {
  return {
    ...options,
    useFipsEndpoint: options.useFipsEndpoint ?? false,
    useDualstackEndpoint: options.useDualstackEndpoint ?? false,
    forcePathStyle: options.forcePathStyle ?? false,
    useAccelerateEndpoint: options.useAccelerateEndpoint ?? false,
    useGlobalEndpoint: options.useGlobalEndpoint ?? false,
    disableMultiregionAccessPoints: options.disableMultiregionAccessPoints ?? false,
    defaultSigningName: "s3"
  };
};
var commonParams = {
  ForcePathStyle: { type: "clientContextParams", name: "forcePathStyle" },
  UseArnRegion: { type: "clientContextParams", name: "useArnRegion" },
  DisableMultiRegionAccessPoints: { type: "clientContextParams", name: "disableMultiregionAccessPoints" },
  Accelerate: { type: "clientContextParams", name: "useAccelerateEndpoint" },
  DisableS3ExpressSessionAuth: { type: "clientContextParams", name: "disableS3ExpressSessionAuth" },
  UseGlobalEndpoint: { type: "builtInParams", name: "useGlobalEndpoint" },
  UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
  Endpoint: { type: "builtInParams", name: "endpoint" },
  Region: { type: "builtInParams", name: "region" },
  UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
};

// node_modules/@aws-sdk/client-s3/dist-es/models/S3ServiceException.js
var S3ServiceException = class _S3ServiceException extends ServiceException {
  constructor(options) {
    super(options);
    Object.setPrototypeOf(this, _S3ServiceException.prototype);
  }
};

// node_modules/@aws-sdk/client-s3/dist-es/models/models_0.js
var NoSuchUpload = class _NoSuchUpload extends S3ServiceException {
  name = "NoSuchUpload";
  $fault = "client";
  constructor(opts) {
    super({
      name: "NoSuchUpload",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _NoSuchUpload.prototype);
  }
};
var ObjectNotInActiveTierError = class _ObjectNotInActiveTierError extends S3ServiceException {
  name = "ObjectNotInActiveTierError";
  $fault = "client";
  constructor(opts) {
    super({
      name: "ObjectNotInActiveTierError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _ObjectNotInActiveTierError.prototype);
  }
};
var BucketAlreadyExists = class _BucketAlreadyExists extends S3ServiceException {
  name = "BucketAlreadyExists";
  $fault = "client";
  constructor(opts) {
    super({
      name: "BucketAlreadyExists",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _BucketAlreadyExists.prototype);
  }
};
var BucketAlreadyOwnedByYou = class _BucketAlreadyOwnedByYou extends S3ServiceException {
  name = "BucketAlreadyOwnedByYou";
  $fault = "client";
  constructor(opts) {
    super({
      name: "BucketAlreadyOwnedByYou",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _BucketAlreadyOwnedByYou.prototype);
  }
};
var NoSuchBucket = class _NoSuchBucket extends S3ServiceException {
  name = "NoSuchBucket";
  $fault = "client";
  constructor(opts) {
    super({
      name: "NoSuchBucket",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _NoSuchBucket.prototype);
  }
};
var AnalyticsFilter;
(function(AnalyticsFilter2) {
  AnalyticsFilter2.visit = (value, visitor) => {
    if (value.Prefix !== void 0)
      return visitor.Prefix(value.Prefix);
    if (value.Tag !== void 0)
      return visitor.Tag(value.Tag);
    if (value.And !== void 0)
      return visitor.And(value.And);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  };
})(AnalyticsFilter || (AnalyticsFilter = {}));
var MetricsFilter;
(function(MetricsFilter2) {
  MetricsFilter2.visit = (value, visitor) => {
    if (value.Prefix !== void 0)
      return visitor.Prefix(value.Prefix);
    if (value.Tag !== void 0)
      return visitor.Tag(value.Tag);
    if (value.AccessPointArn !== void 0)
      return visitor.AccessPointArn(value.AccessPointArn);
    if (value.And !== void 0)
      return visitor.And(value.And);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  };
})(MetricsFilter || (MetricsFilter = {}));
var InvalidObjectState = class _InvalidObjectState extends S3ServiceException {
  name = "InvalidObjectState";
  $fault = "client";
  StorageClass;
  AccessTier;
  constructor(opts) {
    super({
      name: "InvalidObjectState",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _InvalidObjectState.prototype);
    this.StorageClass = opts.StorageClass;
    this.AccessTier = opts.AccessTier;
  }
};
var NoSuchKey = class _NoSuchKey extends S3ServiceException {
  name = "NoSuchKey";
  $fault = "client";
  constructor(opts) {
    super({
      name: "NoSuchKey",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _NoSuchKey.prototype);
  }
};
var NotFound = class _NotFound extends S3ServiceException {
  name = "NotFound";
  $fault = "client";
  constructor(opts) {
    super({
      name: "NotFound",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _NotFound.prototype);
  }
};
var CompleteMultipartUploadOutputFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }
});
var CompleteMultipartUploadRequestFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING }
});
var CreateMultipartUploadOutputFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING },
  ...obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING }
});
var CreateMultipartUploadRequestFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING },
  ...obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING },
  ...obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING }
});
var SessionCredentialsFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SecretAccessKey && { SecretAccessKey: SENSITIVE_STRING },
  ...obj.SessionToken && { SessionToken: SENSITIVE_STRING }
});
var CreateSessionOutputFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING },
  ...obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING },
  ...obj.Credentials && { Credentials: SessionCredentialsFilterSensitiveLog(obj.Credentials) }
});
var CreateSessionRequestFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING },
  ...obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING }
});
var GetObjectOutputFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }
});
var GetObjectRequestFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING }
});
var HeadObjectOutputFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }
});
var HeadObjectRequestFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING }
});

// node_modules/@aws-sdk/xml-builder/dist-es/escape-attribute.js
function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// node_modules/@aws-sdk/xml-builder/dist-es/escape-element.js
function escapeElement(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#x0D;").replace(/\n/g, "&#x0A;").replace(/\u0085/g, "&#x85;").replace(/\u2028/, "&#x2028;");
}

// node_modules/@aws-sdk/xml-builder/dist-es/XmlText.js
var XmlText = class {
  value;
  constructor(value) {
    this.value = value;
  }
  toString() {
    return escapeElement("" + this.value);
  }
};

// node_modules/@aws-sdk/xml-builder/dist-es/XmlNode.js
var XmlNode = class _XmlNode {
  name;
  children;
  attributes = {};
  static of(name, childText, withName) {
    const node = new _XmlNode(name);
    if (childText !== void 0) {
      node.addChildNode(new XmlText(childText));
    }
    if (withName !== void 0) {
      node.withName(withName);
    }
    return node;
  }
  constructor(name, children = []) {
    this.name = name;
    this.children = children;
  }
  withName(name) {
    this.name = name;
    return this;
  }
  addAttribute(name, value) {
    this.attributes[name] = value;
    return this;
  }
  addChildNode(child) {
    this.children.push(child);
    return this;
  }
  removeAttribute(name) {
    delete this.attributes[name];
    return this;
  }
  n(name) {
    this.name = name;
    return this;
  }
  c(child) {
    this.children.push(child);
    return this;
  }
  a(name, value) {
    if (value != null) {
      this.attributes[name] = value;
    }
    return this;
  }
  cc(input, field, withName = field) {
    if (input[field] != null) {
      const node = _XmlNode.of(field, input[field]).withName(withName);
      this.c(node);
    }
  }
  l(input, listName, memberName, valueProvider) {
    if (input[listName] != null) {
      const nodes = valueProvider();
      nodes.map((node) => {
        node.withName(memberName);
        this.c(node);
      });
    }
  }
  lc(input, listName, memberName, valueProvider) {
    if (input[listName] != null) {
      const nodes = valueProvider();
      const containerNode = new _XmlNode(memberName);
      nodes.map((node) => {
        containerNode.c(node);
      });
      this.c(containerNode);
    }
  }
  toString() {
    const hasChildren = Boolean(this.children.length);
    let xmlText = `<${this.name}`;
    const attributes = this.attributes;
    for (const attributeName of Object.keys(attributes)) {
      const attribute = attributes[attributeName];
      if (attribute != null) {
        xmlText += ` ${attributeName}="${escapeAttribute("" + attribute)}"`;
      }
    }
    return xmlText += !hasChildren ? "/>" : `>${this.children.map((c2) => c2.toString()).join("")}</${this.name}>`;
  }
};

// node_modules/@aws-sdk/client-s3/dist-es/models/models_1.js
var EncryptionTypeMismatch = class _EncryptionTypeMismatch extends S3ServiceException {
  name = "EncryptionTypeMismatch";
  $fault = "client";
  constructor(opts) {
    super({
      name: "EncryptionTypeMismatch",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _EncryptionTypeMismatch.prototype);
  }
};
var InvalidRequest = class _InvalidRequest extends S3ServiceException {
  name = "InvalidRequest";
  $fault = "client";
  constructor(opts) {
    super({
      name: "InvalidRequest",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _InvalidRequest.prototype);
  }
};
var InvalidWriteOffset = class _InvalidWriteOffset extends S3ServiceException {
  name = "InvalidWriteOffset";
  $fault = "client";
  constructor(opts) {
    super({
      name: "InvalidWriteOffset",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _InvalidWriteOffset.prototype);
  }
};
var TooManyParts = class _TooManyParts extends S3ServiceException {
  name = "TooManyParts";
  $fault = "client";
  constructor(opts) {
    super({
      name: "TooManyParts",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _TooManyParts.prototype);
  }
};
var ObjectAlreadyInActiveTierError = class _ObjectAlreadyInActiveTierError extends S3ServiceException {
  name = "ObjectAlreadyInActiveTierError";
  $fault = "client";
  constructor(opts) {
    super({
      name: "ObjectAlreadyInActiveTierError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _ObjectAlreadyInActiveTierError.prototype);
  }
};
var SelectObjectContentEventStream;
(function(SelectObjectContentEventStream2) {
  SelectObjectContentEventStream2.visit = (value, visitor) => {
    if (value.Records !== void 0)
      return visitor.Records(value.Records);
    if (value.Stats !== void 0)
      return visitor.Stats(value.Stats);
    if (value.Progress !== void 0)
      return visitor.Progress(value.Progress);
    if (value.Cont !== void 0)
      return visitor.Cont(value.Cont);
    if (value.End !== void 0)
      return visitor.End(value.End);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  };
})(SelectObjectContentEventStream || (SelectObjectContentEventStream = {}));
var PutObjectOutputFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING },
  ...obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING }
});
var PutObjectRequestFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING },
  ...obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING },
  ...obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING }
});
var UploadPartOutputFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }
});
var UploadPartRequestFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING }
});

// node_modules/@aws-sdk/client-s3/dist-es/protocols/Aws_restXml.js
var se_CompleteMultipartUploadCommand = async (input, context) => {
  const b2 = requestBuilder(input, context);
  const headers = map({}, isSerializableHeaderValue, {
    "content-type": "application/xml",
    [_xacc]: input[_CCRC],
    [_xacc_]: input[_CCRCC],
    [_xacc__]: input[_CCRCNVME],
    [_xacs]: input[_CSHA],
    [_xacs_]: input[_CSHAh],
    [_xact]: input[_CT],
    [_xamos]: input[_MOS],
    [_xarp]: input[_RP],
    [_xaebo]: input[_EBO],
    [_im]: input[_IM],
    [_inm]: input[_INM],
    [_xasseca]: input[_SSECA],
    [_xasseck]: input[_SSECK],
    [_xasseckm]: input[_SSECKMD]
  });
  b2.bp("/{Key+}");
  b2.p("Bucket", () => input.Bucket, "{Bucket}", false);
  b2.p("Key", () => input.Key, "{Key+}", true);
  const query = map({
    [_uI]: [, expectNonNull(input[_UI], `UploadId`)]
  });
  let body;
  let contents;
  if (input.MultipartUpload !== void 0) {
    contents = se_CompletedMultipartUpload(input.MultipartUpload, context);
    contents = contents.n("CompleteMultipartUpload");
    body = _ve;
    contents.a("xmlns", "http://s3.amazonaws.com/doc/2006-03-01/");
    body += contents.toString();
  }
  b2.m("POST").h(headers).q(query).b(body);
  return b2.build();
};
var se_CreateMultipartUploadCommand = async (input, context) => {
  const b2 = requestBuilder(input, context);
  const headers = map({}, isSerializableHeaderValue, {
    [_xaa]: input[_ACL],
    [_cc]: input[_CC],
    [_cd]: input[_CD],
    [_ce]: input[_CE],
    [_cl]: input[_CL],
    [_ct]: input[_CTo],
    [_e]: [() => isSerializableHeaderValue(input[_E]), () => dateToUtcString(input[_E]).toString()],
    [_xagfc]: input[_GFC],
    [_xagr]: input[_GR],
    [_xagra]: input[_GRACP],
    [_xagwa]: input[_GWACP],
    [_xasse]: input[_SSE],
    [_xasc]: input[_SC],
    [_xawrl]: input[_WRL],
    [_xasseca]: input[_SSECA],
    [_xasseck]: input[_SSECK],
    [_xasseckm]: input[_SSECKMD],
    [_xasseakki]: input[_SSEKMSKI],
    [_xassec]: input[_SSEKMSEC],
    [_xassebke]: [() => isSerializableHeaderValue(input[_BKE]), () => input[_BKE].toString()],
    [_xarp]: input[_RP],
    [_xat]: input[_T],
    [_xaolm]: input[_OLM],
    [_xaolrud]: [() => isSerializableHeaderValue(input[_OLRUD]), () => serializeDateTime(input[_OLRUD]).toString()],
    [_xaollh]: input[_OLLHS],
    [_xaebo]: input[_EBO],
    [_xaca]: input[_CA],
    [_xact]: input[_CT],
    ...input.Metadata !== void 0 && Object.keys(input.Metadata).reduce((acc, suffix) => {
      acc[`x-amz-meta-${suffix.toLowerCase()}`] = input.Metadata[suffix];
      return acc;
    }, {})
  });
  b2.bp("/{Key+}");
  b2.p("Bucket", () => input.Bucket, "{Bucket}", false);
  b2.p("Key", () => input.Key, "{Key+}", true);
  const query = map({
    [_u]: [, ""]
  });
  let body;
  b2.m("POST").h(headers).q(query).b(body);
  return b2.build();
};
var se_CreateSessionCommand = async (input, context) => {
  const b2 = requestBuilder(input, context);
  const headers = map({}, isSerializableHeaderValue, {
    [_xacsm]: input[_SM],
    [_xasse]: input[_SSE],
    [_xasseakki]: input[_SSEKMSKI],
    [_xassec]: input[_SSEKMSEC],
    [_xassebke]: [() => isSerializableHeaderValue(input[_BKE]), () => input[_BKE].toString()]
  });
  b2.bp("/");
  b2.p("Bucket", () => input.Bucket, "{Bucket}", false);
  const query = map({
    [_s]: [, ""]
  });
  let body;
  b2.m("GET").h(headers).q(query).b(body);
  return b2.build();
};
var se_DeleteObjectCommand = async (input, context) => {
  const b2 = requestBuilder(input, context);
  const headers = map({}, isSerializableHeaderValue, {
    [_xam]: input[_MFA],
    [_xarp]: input[_RP],
    [_xabgr]: [() => isSerializableHeaderValue(input[_BGR]), () => input[_BGR].toString()],
    [_xaebo]: input[_EBO],
    [_im]: input[_IM],
    [_xaimlmt]: [() => isSerializableHeaderValue(input[_IMLMT]), () => dateToUtcString(input[_IMLMT]).toString()],
    [_xaims]: [() => isSerializableHeaderValue(input[_IMS]), () => input[_IMS].toString()]
  });
  b2.bp("/{Key+}");
  b2.p("Bucket", () => input.Bucket, "{Bucket}", false);
  b2.p("Key", () => input.Key, "{Key+}", true);
  const query = map({
    [_xi]: [, "DeleteObject"],
    [_vI]: [, input[_VI]]
  });
  let body;
  b2.m("DELETE").h(headers).q(query).b(body);
  return b2.build();
};
var se_GetObjectCommand = async (input, context) => {
  const b2 = requestBuilder(input, context);
  const headers = map({}, isSerializableHeaderValue, {
    [_im]: input[_IM],
    [_ims]: [() => isSerializableHeaderValue(input[_IMSf]), () => dateToUtcString(input[_IMSf]).toString()],
    [_inm]: input[_INM],
    [_ius]: [() => isSerializableHeaderValue(input[_IUS]), () => dateToUtcString(input[_IUS]).toString()],
    [_ra]: input[_R],
    [_xasseca]: input[_SSECA],
    [_xasseck]: input[_SSECK],
    [_xasseckm]: input[_SSECKMD],
    [_xarp]: input[_RP],
    [_xaebo]: input[_EBO],
    [_xacm]: input[_CM]
  });
  b2.bp("/{Key+}");
  b2.p("Bucket", () => input.Bucket, "{Bucket}", false);
  b2.p("Key", () => input.Key, "{Key+}", true);
  const query = map({
    [_xi]: [, "GetObject"],
    [_rcc]: [, input[_RCC]],
    [_rcd]: [, input[_RCD]],
    [_rce]: [, input[_RCE]],
    [_rcl]: [, input[_RCL]],
    [_rct]: [, input[_RCT]],
    [_re]: [() => input.ResponseExpires !== void 0, () => dateToUtcString(input[_RE]).toString()],
    [_vI]: [, input[_VI]],
    [_pN]: [() => input.PartNumber !== void 0, () => input[_PN].toString()]
  });
  let body;
  b2.m("GET").h(headers).q(query).b(body);
  return b2.build();
};
var se_HeadObjectCommand = async (input, context) => {
  const b2 = requestBuilder(input, context);
  const headers = map({}, isSerializableHeaderValue, {
    [_im]: input[_IM],
    [_ims]: [() => isSerializableHeaderValue(input[_IMSf]), () => dateToUtcString(input[_IMSf]).toString()],
    [_inm]: input[_INM],
    [_ius]: [() => isSerializableHeaderValue(input[_IUS]), () => dateToUtcString(input[_IUS]).toString()],
    [_ra]: input[_R],
    [_xasseca]: input[_SSECA],
    [_xasseck]: input[_SSECK],
    [_xasseckm]: input[_SSECKMD],
    [_xarp]: input[_RP],
    [_xaebo]: input[_EBO],
    [_xacm]: input[_CM]
  });
  b2.bp("/{Key+}");
  b2.p("Bucket", () => input.Bucket, "{Bucket}", false);
  b2.p("Key", () => input.Key, "{Key+}", true);
  const query = map({
    [_rcc]: [, input[_RCC]],
    [_rcd]: [, input[_RCD]],
    [_rce]: [, input[_RCE]],
    [_rcl]: [, input[_RCL]],
    [_rct]: [, input[_RCT]],
    [_re]: [() => input.ResponseExpires !== void 0, () => dateToUtcString(input[_RE]).toString()],
    [_vI]: [, input[_VI]],
    [_pN]: [() => input.PartNumber !== void 0, () => input[_PN].toString()]
  });
  let body;
  b2.m("HEAD").h(headers).q(query).b(body);
  return b2.build();
};
var se_PutObjectCommand = async (input, context) => {
  const b2 = requestBuilder(input, context);
  const headers = map({}, isSerializableHeaderValue, {
    [_ct]: input[_CTo] || "application/octet-stream",
    [_xaa]: input[_ACL],
    [_cc]: input[_CC],
    [_cd]: input[_CD],
    [_ce]: input[_CE],
    [_cl]: input[_CL],
    [_cl_]: [() => isSerializableHeaderValue(input[_CLo]), () => input[_CLo].toString()],
    [_cm]: input[_CMD],
    [_xasca]: input[_CA],
    [_xacc]: input[_CCRC],
    [_xacc_]: input[_CCRCC],
    [_xacc__]: input[_CCRCNVME],
    [_xacs]: input[_CSHA],
    [_xacs_]: input[_CSHAh],
    [_e]: [() => isSerializableHeaderValue(input[_E]), () => dateToUtcString(input[_E]).toString()],
    [_im]: input[_IM],
    [_inm]: input[_INM],
    [_xagfc]: input[_GFC],
    [_xagr]: input[_GR],
    [_xagra]: input[_GRACP],
    [_xagwa]: input[_GWACP],
    [_xawob]: [() => isSerializableHeaderValue(input[_WOB]), () => input[_WOB].toString()],
    [_xasse]: input[_SSE],
    [_xasc]: input[_SC],
    [_xawrl]: input[_WRL],
    [_xasseca]: input[_SSECA],
    [_xasseck]: input[_SSECK],
    [_xasseckm]: input[_SSECKMD],
    [_xasseakki]: input[_SSEKMSKI],
    [_xassec]: input[_SSEKMSEC],
    [_xassebke]: [() => isSerializableHeaderValue(input[_BKE]), () => input[_BKE].toString()],
    [_xarp]: input[_RP],
    [_xat]: input[_T],
    [_xaolm]: input[_OLM],
    [_xaolrud]: [() => isSerializableHeaderValue(input[_OLRUD]), () => serializeDateTime(input[_OLRUD]).toString()],
    [_xaollh]: input[_OLLHS],
    [_xaebo]: input[_EBO],
    ...input.Metadata !== void 0 && Object.keys(input.Metadata).reduce((acc, suffix) => {
      acc[`x-amz-meta-${suffix.toLowerCase()}`] = input.Metadata[suffix];
      return acc;
    }, {})
  });
  b2.bp("/{Key+}");
  b2.p("Bucket", () => input.Bucket, "{Bucket}", false);
  b2.p("Key", () => input.Key, "{Key+}", true);
  const query = map({
    [_xi]: [, "PutObject"]
  });
  let body;
  let contents;
  if (input.Body !== void 0) {
    contents = input.Body;
    body = contents;
  }
  b2.m("PUT").h(headers).q(query).b(body);
  return b2.build();
};
var se_UploadPartCommand = async (input, context) => {
  const b2 = requestBuilder(input, context);
  const headers = map({}, isSerializableHeaderValue, {
    "content-type": "application/octet-stream",
    [_cl_]: [() => isSerializableHeaderValue(input[_CLo]), () => input[_CLo].toString()],
    [_cm]: input[_CMD],
    [_xasca]: input[_CA],
    [_xacc]: input[_CCRC],
    [_xacc_]: input[_CCRCC],
    [_xacc__]: input[_CCRCNVME],
    [_xacs]: input[_CSHA],
    [_xacs_]: input[_CSHAh],
    [_xasseca]: input[_SSECA],
    [_xasseck]: input[_SSECK],
    [_xasseckm]: input[_SSECKMD],
    [_xarp]: input[_RP],
    [_xaebo]: input[_EBO]
  });
  b2.bp("/{Key+}");
  b2.p("Bucket", () => input.Bucket, "{Bucket}", false);
  b2.p("Key", () => input.Key, "{Key+}", true);
  const query = map({
    [_xi]: [, "UploadPart"],
    [_pN]: [expectNonNull(input.PartNumber, `PartNumber`) != null, () => input[_PN].toString()],
    [_uI]: [, expectNonNull(input[_UI], `UploadId`)]
  });
  let body;
  let contents;
  if (input.Body !== void 0) {
    contents = input.Body;
    body = contents;
  }
  b2.m("PUT").h(headers).q(query).b(body);
  return b2.build();
};
var de_CompleteMultipartUploadCommand = async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = map({
    $metadata: deserializeMetadata(output),
    [_Exp]: [, output.headers[_xae]],
    [_SSE]: [, output.headers[_xasse]],
    [_VI]: [, output.headers[_xavi]],
    [_SSEKMSKI]: [, output.headers[_xasseakki]],
    [_BKE]: [() => void 0 !== output.headers[_xassebke], () => parseBoolean(output.headers[_xassebke])],
    [_RC]: [, output.headers[_xarc]]
  });
  const data = expectNonNull(expectObject(await parseXmlBody(output.body, context)), "body");
  if (data[_B] != null) {
    contents[_B] = expectString(data[_B]);
  }
  if (data[_CCRC] != null) {
    contents[_CCRC] = expectString(data[_CCRC]);
  }
  if (data[_CCRCC] != null) {
    contents[_CCRCC] = expectString(data[_CCRCC]);
  }
  if (data[_CCRCNVME] != null) {
    contents[_CCRCNVME] = expectString(data[_CCRCNVME]);
  }
  if (data[_CSHA] != null) {
    contents[_CSHA] = expectString(data[_CSHA]);
  }
  if (data[_CSHAh] != null) {
    contents[_CSHAh] = expectString(data[_CSHAh]);
  }
  if (data[_CT] != null) {
    contents[_CT] = expectString(data[_CT]);
  }
  if (data[_ETa] != null) {
    contents[_ETa] = expectString(data[_ETa]);
  }
  if (data[_K] != null) {
    contents[_K] = expectString(data[_K]);
  }
  if (data[_L] != null) {
    contents[_L] = expectString(data[_L]);
  }
  return contents;
};
var de_CreateMultipartUploadCommand = async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = map({
    $metadata: deserializeMetadata(output),
    [_AD]: [
      () => void 0 !== output.headers[_xaad],
      () => expectNonNull(parseRfc7231DateTime(output.headers[_xaad]))
    ],
    [_ARI]: [, output.headers[_xaari]],
    [_SSE]: [, output.headers[_xasse]],
    [_SSECA]: [, output.headers[_xasseca]],
    [_SSECKMD]: [, output.headers[_xasseckm]],
    [_SSEKMSKI]: [, output.headers[_xasseakki]],
    [_SSEKMSEC]: [, output.headers[_xassec]],
    [_BKE]: [() => void 0 !== output.headers[_xassebke], () => parseBoolean(output.headers[_xassebke])],
    [_RC]: [, output.headers[_xarc]],
    [_CA]: [, output.headers[_xaca]],
    [_CT]: [, output.headers[_xact]]
  });
  const data = expectNonNull(expectObject(await parseXmlBody(output.body, context)), "body");
  if (data[_B] != null) {
    contents[_B] = expectString(data[_B]);
  }
  if (data[_K] != null) {
    contents[_K] = expectString(data[_K]);
  }
  if (data[_UI] != null) {
    contents[_UI] = expectString(data[_UI]);
  }
  return contents;
};
var de_CreateSessionCommand = async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = map({
    $metadata: deserializeMetadata(output),
    [_SSE]: [, output.headers[_xasse]],
    [_SSEKMSKI]: [, output.headers[_xasseakki]],
    [_SSEKMSEC]: [, output.headers[_xassec]],
    [_BKE]: [() => void 0 !== output.headers[_xassebke], () => parseBoolean(output.headers[_xassebke])]
  });
  const data = expectNonNull(expectObject(await parseXmlBody(output.body, context)), "body");
  if (data[_C] != null) {
    contents[_C] = de_SessionCredentials(data[_C], context);
  }
  return contents;
};
var de_DeleteObjectCommand = async (output, context) => {
  if (output.statusCode !== 204 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = map({
    $metadata: deserializeMetadata(output),
    [_DM]: [() => void 0 !== output.headers[_xadm], () => parseBoolean(output.headers[_xadm])],
    [_VI]: [, output.headers[_xavi]],
    [_RC]: [, output.headers[_xarc]]
  });
  await collectBody(output.body, context);
  return contents;
};
var de_GetObjectCommand = async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = map({
    $metadata: deserializeMetadata(output),
    [_DM]: [() => void 0 !== output.headers[_xadm], () => parseBoolean(output.headers[_xadm])],
    [_AR]: [, output.headers[_ar]],
    [_Exp]: [, output.headers[_xae]],
    [_Re]: [, output.headers[_xar]],
    [_LM]: [() => void 0 !== output.headers[_lm], () => expectNonNull(parseRfc7231DateTime(output.headers[_lm]))],
    [_CLo]: [() => void 0 !== output.headers[_cl_], () => strictParseLong(output.headers[_cl_])],
    [_ETa]: [, output.headers[_eta]],
    [_CCRC]: [, output.headers[_xacc]],
    [_CCRCC]: [, output.headers[_xacc_]],
    [_CCRCNVME]: [, output.headers[_xacc__]],
    [_CSHA]: [, output.headers[_xacs]],
    [_CSHAh]: [, output.headers[_xacs_]],
    [_CT]: [, output.headers[_xact]],
    [_MM]: [() => void 0 !== output.headers[_xamm], () => strictParseInt32(output.headers[_xamm])],
    [_VI]: [, output.headers[_xavi]],
    [_CC]: [, output.headers[_cc]],
    [_CD]: [, output.headers[_cd]],
    [_CE]: [, output.headers[_ce]],
    [_CL]: [, output.headers[_cl]],
    [_CR]: [, output.headers[_cr]],
    [_CTo]: [, output.headers[_ct]],
    [_E]: [() => void 0 !== output.headers[_e], () => expectNonNull(parseRfc7231DateTime(output.headers[_e]))],
    [_ES]: [, output.headers[_ex]],
    [_WRL]: [, output.headers[_xawrl]],
    [_SSE]: [, output.headers[_xasse]],
    [_SSECA]: [, output.headers[_xasseca]],
    [_SSECKMD]: [, output.headers[_xasseckm]],
    [_SSEKMSKI]: [, output.headers[_xasseakki]],
    [_BKE]: [() => void 0 !== output.headers[_xassebke], () => parseBoolean(output.headers[_xassebke])],
    [_SC]: [, output.headers[_xasc]],
    [_RC]: [, output.headers[_xarc]],
    [_RS]: [, output.headers[_xars]],
    [_PC]: [() => void 0 !== output.headers[_xampc], () => strictParseInt32(output.headers[_xampc])],
    [_TC]: [() => void 0 !== output.headers[_xatc], () => strictParseInt32(output.headers[_xatc])],
    [_OLM]: [, output.headers[_xaolm]],
    [_OLRUD]: [
      () => void 0 !== output.headers[_xaolrud],
      () => expectNonNull(parseRfc3339DateTimeWithOffset(output.headers[_xaolrud]))
    ],
    [_OLLHS]: [, output.headers[_xaollh]],
    Metadata: [
      ,
      Object.keys(output.headers).filter((header) => header.startsWith("x-amz-meta-")).reduce((acc, header) => {
        acc[header.substring(11)] = output.headers[header];
        return acc;
      }, {})
    ]
  });
  const data = output.body;
  context.sdkStreamMixin(data);
  contents.Body = data;
  return contents;
};
var de_HeadObjectCommand = async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = map({
    $metadata: deserializeMetadata(output),
    [_DM]: [() => void 0 !== output.headers[_xadm], () => parseBoolean(output.headers[_xadm])],
    [_AR]: [, output.headers[_ar]],
    [_Exp]: [, output.headers[_xae]],
    [_Re]: [, output.headers[_xar]],
    [_AS]: [, output.headers[_xaas]],
    [_LM]: [() => void 0 !== output.headers[_lm], () => expectNonNull(parseRfc7231DateTime(output.headers[_lm]))],
    [_CLo]: [() => void 0 !== output.headers[_cl_], () => strictParseLong(output.headers[_cl_])],
    [_CCRC]: [, output.headers[_xacc]],
    [_CCRCC]: [, output.headers[_xacc_]],
    [_CCRCNVME]: [, output.headers[_xacc__]],
    [_CSHA]: [, output.headers[_xacs]],
    [_CSHAh]: [, output.headers[_xacs_]],
    [_CT]: [, output.headers[_xact]],
    [_ETa]: [, output.headers[_eta]],
    [_MM]: [() => void 0 !== output.headers[_xamm], () => strictParseInt32(output.headers[_xamm])],
    [_VI]: [, output.headers[_xavi]],
    [_CC]: [, output.headers[_cc]],
    [_CD]: [, output.headers[_cd]],
    [_CE]: [, output.headers[_ce]],
    [_CL]: [, output.headers[_cl]],
    [_CTo]: [, output.headers[_ct]],
    [_E]: [() => void 0 !== output.headers[_e], () => expectNonNull(parseRfc7231DateTime(output.headers[_e]))],
    [_ES]: [, output.headers[_ex]],
    [_WRL]: [, output.headers[_xawrl]],
    [_SSE]: [, output.headers[_xasse]],
    [_SSECA]: [, output.headers[_xasseca]],
    [_SSECKMD]: [, output.headers[_xasseckm]],
    [_SSEKMSKI]: [, output.headers[_xasseakki]],
    [_BKE]: [() => void 0 !== output.headers[_xassebke], () => parseBoolean(output.headers[_xassebke])],
    [_SC]: [, output.headers[_xasc]],
    [_RC]: [, output.headers[_xarc]],
    [_RS]: [, output.headers[_xars]],
    [_PC]: [() => void 0 !== output.headers[_xampc], () => strictParseInt32(output.headers[_xampc])],
    [_OLM]: [, output.headers[_xaolm]],
    [_OLRUD]: [
      () => void 0 !== output.headers[_xaolrud],
      () => expectNonNull(parseRfc3339DateTimeWithOffset(output.headers[_xaolrud]))
    ],
    [_OLLHS]: [, output.headers[_xaollh]],
    Metadata: [
      ,
      Object.keys(output.headers).filter((header) => header.startsWith("x-amz-meta-")).reduce((acc, header) => {
        acc[header.substring(11)] = output.headers[header];
        return acc;
      }, {})
    ]
  });
  await collectBody(output.body, context);
  return contents;
};
var de_PutObjectCommand = async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = map({
    $metadata: deserializeMetadata(output),
    [_Exp]: [, output.headers[_xae]],
    [_ETa]: [, output.headers[_eta]],
    [_CCRC]: [, output.headers[_xacc]],
    [_CCRCC]: [, output.headers[_xacc_]],
    [_CCRCNVME]: [, output.headers[_xacc__]],
    [_CSHA]: [, output.headers[_xacs]],
    [_CSHAh]: [, output.headers[_xacs_]],
    [_CT]: [, output.headers[_xact]],
    [_SSE]: [, output.headers[_xasse]],
    [_VI]: [, output.headers[_xavi]],
    [_SSECA]: [, output.headers[_xasseca]],
    [_SSECKMD]: [, output.headers[_xasseckm]],
    [_SSEKMSKI]: [, output.headers[_xasseakki]],
    [_SSEKMSEC]: [, output.headers[_xassec]],
    [_BKE]: [() => void 0 !== output.headers[_xassebke], () => parseBoolean(output.headers[_xassebke])],
    [_Si]: [() => void 0 !== output.headers[_xaos], () => strictParseLong(output.headers[_xaos])],
    [_RC]: [, output.headers[_xarc]]
  });
  await collectBody(output.body, context);
  return contents;
};
var de_UploadPartCommand = async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = map({
    $metadata: deserializeMetadata(output),
    [_SSE]: [, output.headers[_xasse]],
    [_ETa]: [, output.headers[_eta]],
    [_CCRC]: [, output.headers[_xacc]],
    [_CCRCC]: [, output.headers[_xacc_]],
    [_CCRCNVME]: [, output.headers[_xacc__]],
    [_CSHA]: [, output.headers[_xacs]],
    [_CSHAh]: [, output.headers[_xacs_]],
    [_SSECA]: [, output.headers[_xasseca]],
    [_SSECKMD]: [, output.headers[_xasseckm]],
    [_SSEKMSKI]: [, output.headers[_xasseakki]],
    [_BKE]: [() => void 0 !== output.headers[_xassebke], () => parseBoolean(output.headers[_xassebke])],
    [_RC]: [, output.headers[_xarc]]
  });
  await collectBody(output.body, context);
  return contents;
};
var de_CommandError = async (output, context) => {
  const parsedOutput = {
    ...output,
    body: await parseXmlErrorBody(output.body, context)
  };
  const errorCode = loadRestXmlErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "NoSuchUpload":
    case "com.amazonaws.s3#NoSuchUpload":
      throw await de_NoSuchUploadRes(parsedOutput, context);
    case "ObjectNotInActiveTierError":
    case "com.amazonaws.s3#ObjectNotInActiveTierError":
      throw await de_ObjectNotInActiveTierErrorRes(parsedOutput, context);
    case "BucketAlreadyExists":
    case "com.amazonaws.s3#BucketAlreadyExists":
      throw await de_BucketAlreadyExistsRes(parsedOutput, context);
    case "BucketAlreadyOwnedByYou":
    case "com.amazonaws.s3#BucketAlreadyOwnedByYou":
      throw await de_BucketAlreadyOwnedByYouRes(parsedOutput, context);
    case "NoSuchBucket":
    case "com.amazonaws.s3#NoSuchBucket":
      throw await de_NoSuchBucketRes(parsedOutput, context);
    case "InvalidObjectState":
    case "com.amazonaws.s3#InvalidObjectState":
      throw await de_InvalidObjectStateRes(parsedOutput, context);
    case "NoSuchKey":
    case "com.amazonaws.s3#NoSuchKey":
      throw await de_NoSuchKeyRes(parsedOutput, context);
    case "NotFound":
    case "com.amazonaws.s3#NotFound":
      throw await de_NotFoundRes(parsedOutput, context);
    case "EncryptionTypeMismatch":
    case "com.amazonaws.s3#EncryptionTypeMismatch":
      throw await de_EncryptionTypeMismatchRes(parsedOutput, context);
    case "InvalidRequest":
    case "com.amazonaws.s3#InvalidRequest":
      throw await de_InvalidRequestRes(parsedOutput, context);
    case "InvalidWriteOffset":
    case "com.amazonaws.s3#InvalidWriteOffset":
      throw await de_InvalidWriteOffsetRes(parsedOutput, context);
    case "TooManyParts":
    case "com.amazonaws.s3#TooManyParts":
      throw await de_TooManyPartsRes(parsedOutput, context);
    case "ObjectAlreadyInActiveTierError":
    case "com.amazonaws.s3#ObjectAlreadyInActiveTierError":
      throw await de_ObjectAlreadyInActiveTierErrorRes(parsedOutput, context);
    default:
      const parsedBody = parsedOutput.body;
      return throwDefaultError({
        output,
        parsedBody,
        errorCode
      });
  }
};
var throwDefaultError = withBaseException(S3ServiceException);
var de_BucketAlreadyExistsRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new BucketAlreadyExists({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_BucketAlreadyOwnedByYouRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new BucketAlreadyOwnedByYou({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_EncryptionTypeMismatchRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new EncryptionTypeMismatch({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_InvalidObjectStateRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  if (data[_AT] != null) {
    contents[_AT] = expectString(data[_AT]);
  }
  if (data[_SC] != null) {
    contents[_SC] = expectString(data[_SC]);
  }
  const exception = new InvalidObjectState({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_InvalidRequestRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new InvalidRequest({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_InvalidWriteOffsetRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new InvalidWriteOffset({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_NoSuchBucketRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new NoSuchBucket({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_NoSuchKeyRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new NoSuchKey({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_NoSuchUploadRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new NoSuchUpload({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_NotFoundRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new NotFound({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_ObjectAlreadyInActiveTierErrorRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new ObjectAlreadyInActiveTierError({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_ObjectNotInActiveTierErrorRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new ObjectNotInActiveTierError({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_TooManyPartsRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const exception = new TooManyParts({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var se_CompletedMultipartUpload = (input, context) => {
  const bn2 = new XmlNode(_CMU);
  bn2.l(input, "Parts", "Part", () => se_CompletedPartList(input[_Part], context));
  return bn2;
};
var se_CompletedPart = (input, context) => {
  const bn2 = new XmlNode(_CPo);
  bn2.cc(input, _ETa);
  bn2.cc(input, _CCRC);
  bn2.cc(input, _CCRCC);
  bn2.cc(input, _CCRCNVME);
  bn2.cc(input, _CSHA);
  bn2.cc(input, _CSHAh);
  if (input[_PN] != null) {
    bn2.c(XmlNode.of(_PN, String(input[_PN])).n(_PN));
  }
  return bn2;
};
var se_CompletedPartList = (input, context) => {
  return input.filter((e2) => e2 != null).map((entry) => {
    const n2 = se_CompletedPart(entry, context);
    return n2.n(_me);
  });
};
var de_SessionCredentials = (output, context) => {
  const contents = {};
  if (output[_AKI] != null) {
    contents[_AKI] = expectString(output[_AKI]);
  }
  if (output[_SAK] != null) {
    contents[_SAK] = expectString(output[_SAK]);
  }
  if (output[_ST] != null) {
    contents[_ST] = expectString(output[_ST]);
  }
  if (output[_Exp] != null) {
    contents[_Exp] = expectNonNull(parseRfc3339DateTimeWithOffset(output[_Exp]));
  }
  return contents;
};
var deserializeMetadata = (output) => ({
  httpStatusCode: output.statusCode,
  requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
  extendedRequestId: output.headers["x-amz-id-2"],
  cfId: output.headers["x-amz-cf-id"]
});
var _ACL = "ACL";
var _AD = "AbortDate";
var _AKI = "AccessKeyId";
var _AR = "AcceptRanges";
var _ARI = "AbortRuleId";
var _AS = "ArchiveStatus";
var _AT = "AccessTier";
var _B = "Bucket";
var _BGR = "BypassGovernanceRetention";
var _BKE = "BucketKeyEnabled";
var _C = "Credentials";
var _CA = "ChecksumAlgorithm";
var _CC = "CacheControl";
var _CCRC = "ChecksumCRC32";
var _CCRCC = "ChecksumCRC32C";
var _CCRCNVME = "ChecksumCRC64NVME";
var _CD = "ContentDisposition";
var _CE = "ContentEncoding";
var _CL = "ContentLanguage";
var _CLo = "ContentLength";
var _CM = "ChecksumMode";
var _CMD = "ContentMD5";
var _CMU = "CompletedMultipartUpload";
var _CPo = "CompletedPart";
var _CR = "ContentRange";
var _CSHA = "ChecksumSHA1";
var _CSHAh = "ChecksumSHA256";
var _CT = "ChecksumType";
var _CTo = "ContentType";
var _DM = "DeleteMarker";
var _E = "Expires";
var _EBO = "ExpectedBucketOwner";
var _ES = "ExpiresString";
var _ETa = "ETag";
var _Exp = "Expiration";
var _GFC = "GrantFullControl";
var _GR = "GrantRead";
var _GRACP = "GrantReadACP";
var _GWACP = "GrantWriteACP";
var _IM = "IfMatch";
var _IMLMT = "IfMatchLastModifiedTime";
var _IMS = "IfMatchSize";
var _IMSf = "IfModifiedSince";
var _INM = "IfNoneMatch";
var _IUS = "IfUnmodifiedSince";
var _K = "Key";
var _L = "Location";
var _LM = "LastModified";
var _MFA = "MFA";
var _MM = "MissingMeta";
var _MOS = "MpuObjectSize";
var _OLLHS = "ObjectLockLegalHoldStatus";
var _OLM = "ObjectLockMode";
var _OLRUD = "ObjectLockRetainUntilDate";
var _PC = "PartsCount";
var _PN = "PartNumber";
var _Part = "Parts";
var _R = "Range";
var _RC = "RequestCharged";
var _RCC = "ResponseCacheControl";
var _RCD = "ResponseContentDisposition";
var _RCE = "ResponseContentEncoding";
var _RCL = "ResponseContentLanguage";
var _RCT = "ResponseContentType";
var _RE = "ResponseExpires";
var _RP = "RequestPayer";
var _RS = "ReplicationStatus";
var _Re = "Restore";
var _SAK = "SecretAccessKey";
var _SC = "StorageClass";
var _SM = "SessionMode";
var _SSE = "ServerSideEncryption";
var _SSECA = "SSECustomerAlgorithm";
var _SSECK = "SSECustomerKey";
var _SSECKMD = "SSECustomerKeyMD5";
var _SSEKMSEC = "SSEKMSEncryptionContext";
var _SSEKMSKI = "SSEKMSKeyId";
var _ST = "SessionToken";
var _Si = "Size";
var _T = "Tagging";
var _TC = "TagCount";
var _UI = "UploadId";
var _VI = "VersionId";
var _WOB = "WriteOffsetBytes";
var _WRL = "WebsiteRedirectLocation";
var _ar = "accept-ranges";
var _cc = "cache-control";
var _cd = "content-disposition";
var _ce = "content-encoding";
var _cl = "content-language";
var _cl_ = "content-length";
var _cm = "content-md5";
var _cr = "content-range";
var _ct = "content-type";
var _e = "expires";
var _eta = "etag";
var _ex = "expiresstring";
var _im = "if-match";
var _ims = "if-modified-since";
var _inm = "if-none-match";
var _ius = "if-unmodified-since";
var _lm = "last-modified";
var _me = "member";
var _pN = "partNumber";
var _ra = "range";
var _rcc = "response-cache-control";
var _rcd = "response-content-disposition";
var _rce = "response-content-encoding";
var _rcl = "response-content-language";
var _rct = "response-content-type";
var _re = "response-expires";
var _s = "session";
var _u = "uploads";
var _uI = "uploadId";
var _vI = "versionId";
var _ve = '<?xml version="1.0" encoding="UTF-8"?>';
var _xaa = "x-amz-acl";
var _xaad = "x-amz-abort-date";
var _xaari = "x-amz-abort-rule-id";
var _xaas = "x-amz-archive-status";
var _xabgr = "x-amz-bypass-governance-retention";
var _xaca = "x-amz-checksum-algorithm";
var _xacc = "x-amz-checksum-crc32";
var _xacc_ = "x-amz-checksum-crc32c";
var _xacc__ = "x-amz-checksum-crc64nvme";
var _xacm = "x-amz-checksum-mode";
var _xacs = "x-amz-checksum-sha1";
var _xacs_ = "x-amz-checksum-sha256";
var _xacsm = "x-amz-create-session-mode";
var _xact = "x-amz-checksum-type";
var _xadm = "x-amz-delete-marker";
var _xae = "x-amz-expiration";
var _xaebo = "x-amz-expected-bucket-owner";
var _xagfc = "x-amz-grant-full-control";
var _xagr = "x-amz-grant-read";
var _xagra = "x-amz-grant-read-acp";
var _xagwa = "x-amz-grant-write-acp";
var _xaimlmt = "x-amz-if-match-last-modified-time";
var _xaims = "x-amz-if-match-size";
var _xam = "x-amz-mfa";
var _xamm = "x-amz-missing-meta";
var _xamos = "x-amz-mp-object-size";
var _xampc = "x-amz-mp-parts-count";
var _xaollh = "x-amz-object-lock-legal-hold";
var _xaolm = "x-amz-object-lock-mode";
var _xaolrud = "x-amz-object-lock-retain-until-date";
var _xaos = "x-amz-object-size";
var _xar = "x-amz-restore";
var _xarc = "x-amz-request-charged";
var _xarp = "x-amz-request-payer";
var _xars = "x-amz-replication-status";
var _xasc = "x-amz-storage-class";
var _xasca = "x-amz-sdk-checksum-algorithm";
var _xasse = "x-amz-server-side-encryption";
var _xasseakki = "x-amz-server-side-encryption-aws-kms-key-id";
var _xassebke = "x-amz-server-side-encryption-bucket-key-enabled";
var _xassec = "x-amz-server-side-encryption-context";
var _xasseca = "x-amz-server-side-encryption-customer-algorithm";
var _xasseck = "x-amz-server-side-encryption-customer-key";
var _xasseckm = "x-amz-server-side-encryption-customer-key-md5";
var _xat = "x-amz-tagging";
var _xatc = "x-amz-tagging-count";
var _xavi = "x-amz-version-id";
var _xawob = "x-amz-write-offset-bytes";
var _xawrl = "x-amz-website-redirect-location";
var _xi = "x-id";

// node_modules/@aws-sdk/client-s3/dist-es/commands/CreateSessionCommand.js
var CreateSessionCommand = class extends Command.classBuilder().ep({
  ...commonParams,
  DisableS3ExpressSessionAuth: { type: "staticContextParams", value: true },
  Bucket: { type: "contextParams", name: "Bucket" }
}).m(function(Command2, cs2, config, o2) {
  return [
    getSerdePlugin(config, this.serialize, this.deserialize),
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions()),
    getThrow200ExceptionsPlugin(config)
  ];
}).s("AmazonS3", "CreateSession", {}).n("S3Client", "CreateSessionCommand").f(CreateSessionRequestFilterSensitiveLog, CreateSessionOutputFilterSensitiveLog).ser(se_CreateSessionCommand).de(de_CreateSessionCommand).build() {
};

// node_modules/@aws-sdk/client-s3/package.json
var package_default = {
  name: "@aws-sdk/client-s3",
  description: "AWS SDK for JavaScript S3 Client for Node.js, Browser and React Native",
  version: "3.730.0",
  scripts: {
    build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
    "build:cjs": "node ../../scripts/compilation/inline client-s3",
    "build:es": "tsc -p tsconfig.es.json",
    "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
    "build:types": "tsc -p tsconfig.types.json",
    "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
    clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
    "extract:docs": "api-extractor run --local",
    "generate:client": "node ../../scripts/generate-clients/single-service --solo s3",
    test: "yarn g:vitest run",
    "test:browser": "node ./test/browser-build/esbuild && yarn g:vitest run -c vitest.config.browser.ts",
    "test:browser:watch": "node ./test/browser-build/esbuild && yarn g:vitest watch -c vitest.config.browser.ts",
    "test:e2e": "yarn g:vitest run -c vitest.config.e2e.ts && yarn test:browser",
    "test:e2e:watch": "yarn g:vitest watch -c vitest.config.e2e.ts",
    "test:watch": "yarn g:vitest watch"
  },
  main: "./dist-cjs/index.js",
  types: "./dist-types/index.d.ts",
  module: "./dist-es/index.js",
  sideEffects: false,
  dependencies: {
    "@aws-crypto/sha1-browser": "5.2.0",
    "@aws-crypto/sha256-browser": "5.2.0",
    "@aws-crypto/sha256-js": "5.2.0",
    "@aws-sdk/core": "3.730.0",
    "@aws-sdk/credential-provider-node": "3.730.0",
    "@aws-sdk/middleware-bucket-endpoint": "3.726.0",
    "@aws-sdk/middleware-expect-continue": "3.723.0",
    "@aws-sdk/middleware-flexible-checksums": "3.730.0",
    "@aws-sdk/middleware-host-header": "3.723.0",
    "@aws-sdk/middleware-location-constraint": "3.723.0",
    "@aws-sdk/middleware-logger": "3.723.0",
    "@aws-sdk/middleware-recursion-detection": "3.723.0",
    "@aws-sdk/middleware-sdk-s3": "3.730.0",
    "@aws-sdk/middleware-ssec": "3.723.0",
    "@aws-sdk/middleware-user-agent": "3.730.0",
    "@aws-sdk/region-config-resolver": "3.723.0",
    "@aws-sdk/signature-v4-multi-region": "3.730.0",
    "@aws-sdk/types": "3.723.0",
    "@aws-sdk/util-endpoints": "3.730.0",
    "@aws-sdk/util-user-agent-browser": "3.723.0",
    "@aws-sdk/util-user-agent-node": "3.730.0",
    "@aws-sdk/xml-builder": "3.723.0",
    "@smithy/config-resolver": "^4.0.0",
    "@smithy/core": "^3.0.0",
    "@smithy/eventstream-serde-browser": "^4.0.0",
    "@smithy/eventstream-serde-config-resolver": "^4.0.0",
    "@smithy/eventstream-serde-node": "^4.0.0",
    "@smithy/fetch-http-handler": "^5.0.0",
    "@smithy/hash-blob-browser": "^4.0.0",
    "@smithy/hash-node": "^4.0.0",
    "@smithy/hash-stream-node": "^4.0.0",
    "@smithy/invalid-dependency": "^4.0.0",
    "@smithy/md5-js": "^4.0.0",
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
    "@smithy/util-stream": "^4.0.0",
    "@smithy/util-utf8": "^4.0.0",
    "@smithy/util-waiter": "^4.0.0",
    tslib: "^2.6.2"
  },
  devDependencies: {
    "@aws-sdk/signature-v4-crt": "3.730.0",
    "@tsconfig/node18": "18.2.4",
    "@types/node": "^18.19.69",
    concurrently: "7.0.0",
    "downlevel-dts": "0.10.1",
    rimraf: "3.0.2",
    typescript: "~5.2.2"
  },
  engines: {
    node: ">=18.0.0"
  },
  typesVersions: {
    "<4.0": {
      "dist-types/*": [
        "dist-types/ts3.4/*"
      ]
    }
  },
  files: [
    "dist-*/**"
  ],
  author: {
    name: "AWS SDK for JavaScript Team",
    url: "https://aws.amazon.com/javascript/"
  },
  license: "Apache-2.0",
  browser: {
    "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
  },
  "react-native": {
    "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
  },
  homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-s3",
  repository: {
    type: "git",
    url: "https://github.com/aws/aws-sdk-js-v3.git",
    directory: "clients/client-s3"
  }
};

// node_modules/@aws-sdk/credential-provider-node/dist-es/remoteProvider.js
var ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
var remoteProvider = async (init) => {
  const { ENV_CMDS_FULL_URI, ENV_CMDS_RELATIVE_URI, fromContainerMetadata, fromInstanceMetadata } = await import("./dist-es-7JSGNQV5.js");
  if (process.env[ENV_CMDS_RELATIVE_URI] || process.env[ENV_CMDS_FULL_URI]) {
    init.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");
    const { fromHttp } = await import("./dist-es-A2TIKQUW.js");
    return chain(fromHttp(init), fromContainerMetadata(init));
  }
  if (process.env[ENV_IMDS_DISABLED]) {
    return async () => {
      throw new CredentialsProviderError("EC2 Instance Metadata Service access disabled", { logger: init.logger });
    };
  }
  init.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata");
  return fromInstanceMetadata(init);
};

// node_modules/@aws-sdk/credential-provider-node/dist-es/defaultProvider.js
var multipleCredentialSourceWarningEmitted = false;
var defaultProvider = (init = {}) => memoize(chain(async () => {
  const profile = init.profile ?? process.env[ENV_PROFILE];
  if (profile) {
    const envStaticCredentialsAreSet = process.env[ENV_KEY] && process.env[ENV_SECRET];
    if (envStaticCredentialsAreSet) {
      if (!multipleCredentialSourceWarningEmitted) {
        const warnFn = init.logger?.warn && init.logger?.constructor?.name !== "NoOpLogger" ? init.logger.warn : console.warn;
        warnFn(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`);
        multipleCredentialSourceWarningEmitted = true;
      }
    }
    throw new CredentialsProviderError("AWS_PROFILE is set, skipping fromEnv provider.", {
      logger: init.logger,
      tryNextLink: true
    });
  }
  init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv");
  return fromEnv(init)();
}, async () => {
  init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");
  const { ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoSession } = init;
  if (!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName && !ssoSession) {
    throw new CredentialsProviderError("Skipping SSO provider in default chain (inputs do not include SSO fields).", { logger: init.logger });
  }
  const { fromSSO } = await import("./dist-es-ZZPSORBJ.js");
  return fromSSO(init)();
}, async () => {
  init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");
  const { fromIni } = await import("./dist-es-T3MXWRET.js");
  return fromIni(init)();
}, async () => {
  init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");
  const { fromProcess } = await import("./dist-es-CVV7SH2U.js");
  return fromProcess(init)();
}, async () => {
  init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");
  const { fromTokenFile } = await import("./dist-es-FO3XJCPC.js");
  return fromTokenFile(init)();
}, async () => {
  init.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider");
  return (await remoteProvider(init))();
}, async () => {
  throw new CredentialsProviderError("Could not load credentials from any providers", {
    tryNextLink: false,
    logger: init.logger
  });
}), credentialsTreatedAsExpired, credentialsWillNeedRefresh);
var credentialsWillNeedRefresh = (credentials) => credentials?.expiration !== void 0;
var credentialsTreatedAsExpired = (credentials) => credentials?.expiration !== void 0 && credentials.expiration.getTime() - Date.now() < 3e5;

// node_modules/@aws-sdk/middleware-bucket-endpoint/dist-es/NodeUseArnRegionConfigOptions.js
var NODE_USE_ARN_REGION_ENV_NAME = "AWS_S3_USE_ARN_REGION";
var NODE_USE_ARN_REGION_INI_NAME = "s3_use_arn_region";
var NODE_USE_ARN_REGION_CONFIG_OPTIONS = {
  environmentVariableSelector: (env) => booleanSelector(env, NODE_USE_ARN_REGION_ENV_NAME, SelectorType.ENV),
  configFileSelector: (profile) => booleanSelector(profile, NODE_USE_ARN_REGION_INI_NAME, SelectorType.CONFIG),
  default: false
};

// node_modules/@smithy/eventstream-codec/dist-es/Int64.js
var Int64 = class _Int64 {
  constructor(bytes) {
    this.bytes = bytes;
    if (bytes.byteLength !== 8) {
      throw new Error("Int64 buffers must be exactly 8 bytes");
    }
  }
  static fromNumber(number) {
    if (number > 9223372036854776e3 || number < -9223372036854776e3) {
      throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
    }
    const bytes = new Uint8Array(8);
    for (let i2 = 7, remaining = Math.abs(Math.round(number)); i2 > -1 && remaining > 0; i2--, remaining /= 256) {
      bytes[i2] = remaining;
    }
    if (number < 0) {
      negate(bytes);
    }
    return new _Int64(bytes);
  }
  valueOf() {
    const bytes = this.bytes.slice(0);
    const negative = bytes[0] & 128;
    if (negative) {
      negate(bytes);
    }
    return parseInt(toHex(bytes), 16) * (negative ? -1 : 1);
  }
  toString() {
    return String(this.valueOf());
  }
};
function negate(bytes) {
  for (let i2 = 0; i2 < 8; i2++) {
    bytes[i2] ^= 255;
  }
  for (let i2 = 7; i2 > -1; i2--) {
    bytes[i2]++;
    if (bytes[i2] !== 0)
      break;
  }
}

// node_modules/@smithy/eventstream-codec/dist-es/HeaderMarshaller.js
var HeaderMarshaller = class {
  constructor(toUtf82, fromUtf84) {
    this.toUtf8 = toUtf82;
    this.fromUtf8 = fromUtf84;
  }
  format(headers) {
    const chunks = [];
    for (const headerName of Object.keys(headers)) {
      const bytes = this.fromUtf8(headerName);
      chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
    }
    const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
    let position = 0;
    for (const chunk of chunks) {
      out.set(chunk, position);
      position += chunk.byteLength;
    }
    return out;
  }
  formatHeaderValue(header) {
    switch (header.type) {
      case "boolean":
        return Uint8Array.from([header.value ? 0 : 1]);
      case "byte":
        return Uint8Array.from([2, header.value]);
      case "short":
        const shortView = new DataView(new ArrayBuffer(3));
        shortView.setUint8(0, 3);
        shortView.setInt16(1, header.value, false);
        return new Uint8Array(shortView.buffer);
      case "integer":
        const intView = new DataView(new ArrayBuffer(5));
        intView.setUint8(0, 4);
        intView.setInt32(1, header.value, false);
        return new Uint8Array(intView.buffer);
      case "long":
        const longBytes = new Uint8Array(9);
        longBytes[0] = 5;
        longBytes.set(header.value.bytes, 1);
        return longBytes;
      case "binary":
        const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
        binView.setUint8(0, 6);
        binView.setUint16(1, header.value.byteLength, false);
        const binBytes = new Uint8Array(binView.buffer);
        binBytes.set(header.value, 3);
        return binBytes;
      case "string":
        const utf8Bytes = this.fromUtf8(header.value);
        const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
        strView.setUint8(0, 7);
        strView.setUint16(1, utf8Bytes.byteLength, false);
        const strBytes = new Uint8Array(strView.buffer);
        strBytes.set(utf8Bytes, 3);
        return strBytes;
      case "timestamp":
        const tsBytes = new Uint8Array(9);
        tsBytes[0] = 8;
        tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
        return tsBytes;
      case "uuid":
        if (!UUID_PATTERN.test(header.value)) {
          throw new Error(`Invalid UUID received: ${header.value}`);
        }
        const uuidBytes = new Uint8Array(17);
        uuidBytes[0] = 9;
        uuidBytes.set(fromHex(header.value.replace(/\-/g, "")), 1);
        return uuidBytes;
    }
  }
  parse(headers) {
    const out = {};
    let position = 0;
    while (position < headers.byteLength) {
      const nameLength = headers.getUint8(position++);
      const name = this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, nameLength));
      position += nameLength;
      switch (headers.getUint8(position++)) {
        case 0:
          out[name] = {
            type: BOOLEAN_TAG,
            value: true
          };
          break;
        case 1:
          out[name] = {
            type: BOOLEAN_TAG,
            value: false
          };
          break;
        case 2:
          out[name] = {
            type: BYTE_TAG,
            value: headers.getInt8(position++)
          };
          break;
        case 3:
          out[name] = {
            type: SHORT_TAG,
            value: headers.getInt16(position, false)
          };
          position += 2;
          break;
        case 4:
          out[name] = {
            type: INT_TAG,
            value: headers.getInt32(position, false)
          };
          position += 4;
          break;
        case 5:
          out[name] = {
            type: LONG_TAG,
            value: new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8))
          };
          position += 8;
          break;
        case 6:
          const binaryLength = headers.getUint16(position, false);
          position += 2;
          out[name] = {
            type: BINARY_TAG,
            value: new Uint8Array(headers.buffer, headers.byteOffset + position, binaryLength)
          };
          position += binaryLength;
          break;
        case 7:
          const stringLength = headers.getUint16(position, false);
          position += 2;
          out[name] = {
            type: STRING_TAG,
            value: this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, stringLength))
          };
          position += stringLength;
          break;
        case 8:
          out[name] = {
            type: TIMESTAMP_TAG,
            value: new Date(new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)).valueOf())
          };
          position += 8;
          break;
        case 9:
          const uuidBytes = new Uint8Array(headers.buffer, headers.byteOffset + position, 16);
          position += 16;
          out[name] = {
            type: UUID_TAG,
            value: `${toHex(uuidBytes.subarray(0, 4))}-${toHex(uuidBytes.subarray(4, 6))}-${toHex(uuidBytes.subarray(6, 8))}-${toHex(uuidBytes.subarray(8, 10))}-${toHex(uuidBytes.subarray(10))}`
          };
          break;
        default:
          throw new Error(`Unrecognized header type tag`);
      }
    }
    return out;
  }
};
var HEADER_VALUE_TYPE;
(function(HEADER_VALUE_TYPE2) {
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["boolTrue"] = 0] = "boolTrue";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["boolFalse"] = 1] = "boolFalse";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["byte"] = 2] = "byte";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["short"] = 3] = "short";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["integer"] = 4] = "integer";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["long"] = 5] = "long";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["byteArray"] = 6] = "byteArray";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["string"] = 7] = "string";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["timestamp"] = 8] = "timestamp";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["uuid"] = 9] = "uuid";
})(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
var BOOLEAN_TAG = "boolean";
var BYTE_TAG = "byte";
var SHORT_TAG = "short";
var INT_TAG = "integer";
var LONG_TAG = "long";
var BINARY_TAG = "binary";
var STRING_TAG = "string";
var TIMESTAMP_TAG = "timestamp";
var UUID_TAG = "uuid";
var UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

// node_modules/@smithy/eventstream-codec/dist-es/splitMessage.js
var PRELUDE_MEMBER_LENGTH = 4;
var PRELUDE_LENGTH = PRELUDE_MEMBER_LENGTH * 2;
var CHECKSUM_LENGTH = 4;
var MINIMUM_MESSAGE_LENGTH = PRELUDE_LENGTH + CHECKSUM_LENGTH * 2;
function splitMessage({ byteLength, byteOffset, buffer }) {
  if (byteLength < MINIMUM_MESSAGE_LENGTH) {
    throw new Error("Provided message too short to accommodate event stream message overhead");
  }
  const view = new DataView(buffer, byteOffset, byteLength);
  const messageLength = view.getUint32(0, false);
  if (byteLength !== messageLength) {
    throw new Error("Reported message length does not match received message length");
  }
  const headerLength = view.getUint32(PRELUDE_MEMBER_LENGTH, false);
  const expectedPreludeChecksum = view.getUint32(PRELUDE_LENGTH, false);
  const expectedMessageChecksum = view.getUint32(byteLength - CHECKSUM_LENGTH, false);
  const checksummer = new Crc32().update(new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH));
  if (expectedPreludeChecksum !== checksummer.digest()) {
    throw new Error(`The prelude checksum specified in the message (${expectedPreludeChecksum}) does not match the calculated CRC32 checksum (${checksummer.digest()})`);
  }
  checksummer.update(new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH, byteLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH)));
  if (expectedMessageChecksum !== checksummer.digest()) {
    throw new Error(`The message checksum (${checksummer.digest()}) did not match the expected value of ${expectedMessageChecksum}`);
  }
  return {
    headers: new DataView(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH, headerLength),
    body: new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH + headerLength, messageLength - headerLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH + CHECKSUM_LENGTH))
  };
}

// node_modules/@smithy/eventstream-codec/dist-es/EventStreamCodec.js
var EventStreamCodec = class {
  constructor(toUtf82, fromUtf84) {
    this.headerMarshaller = new HeaderMarshaller(toUtf82, fromUtf84);
    this.messageBuffer = [];
    this.isEndOfStream = false;
  }
  feed(message) {
    this.messageBuffer.push(this.decode(message));
  }
  endOfStream() {
    this.isEndOfStream = true;
  }
  getMessage() {
    const message = this.messageBuffer.pop();
    const isEndOfStream = this.isEndOfStream;
    return {
      getMessage() {
        return message;
      },
      isEndOfStream() {
        return isEndOfStream;
      }
    };
  }
  getAvailableMessages() {
    const messages = this.messageBuffer;
    this.messageBuffer = [];
    const isEndOfStream = this.isEndOfStream;
    return {
      getMessages() {
        return messages;
      },
      isEndOfStream() {
        return isEndOfStream;
      }
    };
  }
  encode({ headers: rawHeaders, body }) {
    const headers = this.headerMarshaller.format(rawHeaders);
    const length = headers.byteLength + body.byteLength + 16;
    const out = new Uint8Array(length);
    const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    const checksum = new Crc32();
    view.setUint32(0, length, false);
    view.setUint32(4, headers.byteLength, false);
    view.setUint32(8, checksum.update(out.subarray(0, 8)).digest(), false);
    out.set(headers, 12);
    out.set(body, headers.byteLength + 12);
    view.setUint32(length - 4, checksum.update(out.subarray(8, length - 4)).digest(), false);
    return out;
  }
  decode(message) {
    const { headers, body } = splitMessage(message);
    return { headers: this.headerMarshaller.parse(headers), body };
  }
  formatHeaders(rawHeaders) {
    return this.headerMarshaller.format(rawHeaders);
  }
};

// node_modules/@smithy/eventstream-codec/dist-es/MessageDecoderStream.js
var MessageDecoderStream = class {
  constructor(options) {
    this.options = options;
  }
  [Symbol.asyncIterator]() {
    return this.asyncIterator();
  }
  async *asyncIterator() {
    for await (const bytes of this.options.inputStream) {
      const decoded = this.options.decoder.decode(bytes);
      yield decoded;
    }
  }
};

// node_modules/@smithy/eventstream-codec/dist-es/MessageEncoderStream.js
var MessageEncoderStream = class {
  constructor(options) {
    this.options = options;
  }
  [Symbol.asyncIterator]() {
    return this.asyncIterator();
  }
  async *asyncIterator() {
    for await (const msg of this.options.messageStream) {
      const encoded = this.options.encoder.encode(msg);
      yield encoded;
    }
    if (this.options.includeEndFrame) {
      yield new Uint8Array(0);
    }
  }
};

// node_modules/@smithy/eventstream-codec/dist-es/SmithyMessageDecoderStream.js
var SmithyMessageDecoderStream = class {
  constructor(options) {
    this.options = options;
  }
  [Symbol.asyncIterator]() {
    return this.asyncIterator();
  }
  async *asyncIterator() {
    for await (const message of this.options.messageStream) {
      const deserialized = await this.options.deserializer(message);
      if (deserialized === void 0)
        continue;
      yield deserialized;
    }
  }
};

// node_modules/@smithy/eventstream-codec/dist-es/SmithyMessageEncoderStream.js
var SmithyMessageEncoderStream = class {
  constructor(options) {
    this.options = options;
  }
  [Symbol.asyncIterator]() {
    return this.asyncIterator();
  }
  async *asyncIterator() {
    for await (const chunk of this.options.inputStream) {
      const payloadBuf = this.options.serializer(chunk);
      yield payloadBuf;
    }
  }
};

// node_modules/@smithy/eventstream-serde-universal/dist-es/getChunkedStream.js
function getChunkedStream(source) {
  let currentMessageTotalLength = 0;
  let currentMessagePendingLength = 0;
  let currentMessage = null;
  let messageLengthBuffer = null;
  const allocateMessage = (size) => {
    if (typeof size !== "number") {
      throw new Error("Attempted to allocate an event message where size was not a number: " + size);
    }
    currentMessageTotalLength = size;
    currentMessagePendingLength = 4;
    currentMessage = new Uint8Array(size);
    const currentMessageView = new DataView(currentMessage.buffer);
    currentMessageView.setUint32(0, size, false);
  };
  const iterator = async function* () {
    const sourceIterator = source[Symbol.asyncIterator]();
    while (true) {
      const { value, done } = await sourceIterator.next();
      if (done) {
        if (!currentMessageTotalLength) {
          return;
        } else if (currentMessageTotalLength === currentMessagePendingLength) {
          yield currentMessage;
        } else {
          throw new Error("Truncated event message received.");
        }
        return;
      }
      const chunkLength = value.length;
      let currentOffset = 0;
      while (currentOffset < chunkLength) {
        if (!currentMessage) {
          const bytesRemaining = chunkLength - currentOffset;
          if (!messageLengthBuffer) {
            messageLengthBuffer = new Uint8Array(4);
          }
          const numBytesForTotal = Math.min(4 - currentMessagePendingLength, bytesRemaining);
          messageLengthBuffer.set(value.slice(currentOffset, currentOffset + numBytesForTotal), currentMessagePendingLength);
          currentMessagePendingLength += numBytesForTotal;
          currentOffset += numBytesForTotal;
          if (currentMessagePendingLength < 4) {
            break;
          }
          allocateMessage(new DataView(messageLengthBuffer.buffer).getUint32(0, false));
          messageLengthBuffer = null;
        }
        const numBytesToWrite = Math.min(currentMessageTotalLength - currentMessagePendingLength, chunkLength - currentOffset);
        currentMessage.set(value.slice(currentOffset, currentOffset + numBytesToWrite), currentMessagePendingLength);
        currentMessagePendingLength += numBytesToWrite;
        currentOffset += numBytesToWrite;
        if (currentMessageTotalLength && currentMessageTotalLength === currentMessagePendingLength) {
          yield currentMessage;
          currentMessage = null;
          currentMessageTotalLength = 0;
          currentMessagePendingLength = 0;
        }
      }
    }
  };
  return {
    [Symbol.asyncIterator]: iterator
  };
}

// node_modules/@smithy/eventstream-serde-universal/dist-es/getUnmarshalledStream.js
function getMessageUnmarshaller(deserializer, toUtf82) {
  return async function(message) {
    const { value: messageType } = message.headers[":message-type"];
    if (messageType === "error") {
      const unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
      unmodeledError.name = message.headers[":error-code"].value;
      throw unmodeledError;
    } else if (messageType === "exception") {
      const code = message.headers[":exception-type"].value;
      const exception = { [code]: message };
      const deserializedException = await deserializer(exception);
      if (deserializedException.$unknown) {
        const error = new Error(toUtf82(message.body));
        error.name = code;
        throw error;
      }
      throw deserializedException[code];
    } else if (messageType === "event") {
      const event = {
        [message.headers[":event-type"].value]: message
      };
      const deserialized = await deserializer(event);
      if (deserialized.$unknown)
        return;
      return deserialized;
    } else {
      throw Error(`Unrecognizable event type: ${message.headers[":event-type"].value}`);
    }
  };
}

// node_modules/@smithy/eventstream-serde-universal/dist-es/EventStreamMarshaller.js
var EventStreamMarshaller = class {
  constructor({ utf8Encoder, utf8Decoder }) {
    this.eventStreamCodec = new EventStreamCodec(utf8Encoder, utf8Decoder);
    this.utfEncoder = utf8Encoder;
  }
  deserialize(body, deserializer) {
    const inputStream = getChunkedStream(body);
    return new SmithyMessageDecoderStream({
      messageStream: new MessageDecoderStream({ inputStream, decoder: this.eventStreamCodec }),
      deserializer: getMessageUnmarshaller(deserializer, this.utfEncoder)
    });
  }
  serialize(inputStream, serializer) {
    return new MessageEncoderStream({
      messageStream: new SmithyMessageEncoderStream({ inputStream, serializer }),
      encoder: this.eventStreamCodec,
      includeEndFrame: true
    });
  }
};

// node_modules/@smithy/eventstream-serde-node/dist-es/EventStreamMarshaller.js
import { Readable } from "stream";

// node_modules/@smithy/eventstream-serde-node/dist-es/utils.js
async function* readabletoIterable(readStream) {
  let streamEnded = false;
  let generationEnded = false;
  const records = new Array();
  readStream.on("error", (err) => {
    if (!streamEnded) {
      streamEnded = true;
    }
    if (err) {
      throw err;
    }
  });
  readStream.on("data", (data) => {
    records.push(data);
  });
  readStream.on("end", () => {
    streamEnded = true;
  });
  while (!generationEnded) {
    const value = await new Promise((resolve) => setTimeout(() => resolve(records.shift()), 0));
    if (value) {
      yield value;
    }
    generationEnded = streamEnded && records.length === 0;
  }
}

// node_modules/@smithy/eventstream-serde-node/dist-es/EventStreamMarshaller.js
var EventStreamMarshaller2 = class {
  constructor({ utf8Encoder, utf8Decoder }) {
    this.universalMarshaller = new EventStreamMarshaller({
      utf8Decoder,
      utf8Encoder
    });
  }
  deserialize(body, deserializer) {
    const bodyIterable = typeof body[Symbol.asyncIterator] === "function" ? body : readabletoIterable(body);
    return this.universalMarshaller.deserialize(bodyIterable, deserializer);
  }
  serialize(input, serializer) {
    return Readable.from(this.universalMarshaller.serialize(input, serializer));
  }
};

// node_modules/@smithy/eventstream-serde-node/dist-es/provider.js
var eventStreamSerdeProvider = (options) => new EventStreamMarshaller2(options);

// node_modules/@smithy/hash-stream-node/dist-es/HashCalculator.js
import { Writable } from "stream";
var HashCalculator = class extends Writable {
  constructor(hash, options) {
    super(options);
    this.hash = hash;
  }
  _write(chunk, encoding, callback) {
    try {
      this.hash.update(toUint8Array(chunk));
    } catch (err) {
      return callback(err);
    }
    callback();
  }
};

// node_modules/@smithy/hash-stream-node/dist-es/readableStreamHasher.js
var readableStreamHasher = (hashCtor, readableStream) => {
  if (readableStream.readableFlowing !== null) {
    throw new Error("Unable to calculate hash for flowing readable stream");
  }
  const hash = new hashCtor();
  const hashCalculator = new HashCalculator(hash);
  readableStream.pipe(hashCalculator);
  return new Promise((resolve, reject) => {
    readableStream.on("error", (err) => {
      hashCalculator.end();
      reject(err);
    });
    hashCalculator.on("error", reject);
    hashCalculator.on("finish", () => {
      hash.digest().then(resolve).catch(reject);
    });
  });
};

// node_modules/@aws-sdk/client-s3/dist-es/runtimeConfig.shared.js
var getRuntimeConfig = (config) => {
  return {
    apiVersion: "2006-03-01",
    base64Decoder: config?.base64Decoder ?? fromBase64,
    base64Encoder: config?.base64Encoder ?? toBase64,
    disableHostPrefix: config?.disableHostPrefix ?? false,
    endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
    extensions: config?.extensions ?? [],
    getAwsChunkedEncodingStream: config?.getAwsChunkedEncodingStream ?? getAwsChunkedEncodingStream,
    httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultS3HttpAuthSchemeProvider,
    httpAuthSchemes: config?.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
        signer: new AwsSdkSigV4Signer()
      },
      {
        schemeId: "aws.auth#sigv4a",
        identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4a"),
        signer: new AwsSdkSigV4ASigner()
      }
    ],
    logger: config?.logger ?? new NoOpLogger(),
    sdkStreamMixin: config?.sdkStreamMixin ?? sdkStreamMixin,
    serviceId: config?.serviceId ?? "S3",
    signerConstructor: config?.signerConstructor ?? SignatureV4MultiRegion,
    signingEscapePath: config?.signingEscapePath ?? false,
    urlParser: config?.urlParser ?? parseUrl,
    useArnRegion: config?.useArnRegion ?? false,
    utf8Decoder: config?.utf8Decoder ?? fromUtf8,
    utf8Encoder: config?.utf8Encoder ?? toUtf8
  };
};

// node_modules/@aws-sdk/client-s3/dist-es/runtimeConfig.js
var getRuntimeConfig2 = (config) => {
  emitWarningIfUnsupportedVersion2(process.version);
  const defaultsMode = resolveDefaultsModeConfig(config);
  const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
  const clientSharedValues = getRuntimeConfig(config);
  emitWarningIfUnsupportedVersion(process.version);
  const profileConfig = { profile: config?.profile };
  return {
    ...clientSharedValues,
    ...config,
    runtime: "node",
    defaultsMode,
    bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
    credentialDefaultProvider: config?.credentialDefaultProvider ?? defaultProvider,
    defaultUserAgentProvider: config?.defaultUserAgentProvider ?? createDefaultUserAgentProvider({ serviceId: clientSharedValues.serviceId, clientVersion: package_default.version }),
    disableS3ExpressSessionAuth: config?.disableS3ExpressSessionAuth ?? loadConfig(NODE_DISABLE_S3_EXPRESS_SESSION_AUTH_OPTIONS, profileConfig),
    eventStreamSerdeProvider: config?.eventStreamSerdeProvider ?? eventStreamSerdeProvider,
    maxAttempts: config?.maxAttempts ?? loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
    md5: config?.md5 ?? Hash.bind(null, "md5"),
    region: config?.region ?? loadConfig(NODE_REGION_CONFIG_OPTIONS, { ...NODE_REGION_CONFIG_FILE_OPTIONS, ...profileConfig }),
    requestChecksumCalculation: config?.requestChecksumCalculation ?? loadConfig(NODE_REQUEST_CHECKSUM_CALCULATION_CONFIG_OPTIONS, profileConfig),
    requestHandler: NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
    responseChecksumValidation: config?.responseChecksumValidation ?? loadConfig(NODE_RESPONSE_CHECKSUM_VALIDATION_CONFIG_OPTIONS, profileConfig),
    retryMode: config?.retryMode ?? loadConfig({
      ...NODE_RETRY_MODE_CONFIG_OPTIONS,
      default: async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE
    }, config),
    sha1: config?.sha1 ?? Hash.bind(null, "sha1"),
    sha256: config?.sha256 ?? Hash.bind(null, "sha256"),
    sigv4aSigningRegionSet: config?.sigv4aSigningRegionSet ?? loadConfig(NODE_SIGV4A_CONFIG_OPTIONS, profileConfig),
    streamCollector: config?.streamCollector ?? streamCollector,
    streamHasher: config?.streamHasher ?? readableStreamHasher,
    useArnRegion: config?.useArnRegion ?? loadConfig(NODE_USE_ARN_REGION_CONFIG_OPTIONS, profileConfig),
    useDualstackEndpoint: config?.useDualstackEndpoint ?? loadConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, profileConfig),
    useFipsEndpoint: config?.useFipsEndpoint ?? loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, profileConfig),
    userAgentAppId: config?.userAgentAppId ?? loadConfig(NODE_APP_ID_CONFIG_OPTIONS, profileConfig)
  };
};

// node_modules/@aws-sdk/client-s3/dist-es/auth/httpAuthExtensionConfiguration.js
var getHttpAuthExtensionConfiguration = (runtimeConfig) => {
  const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
  let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
  let _credentials = runtimeConfig.credentials;
  return {
    setHttpAuthScheme(httpAuthScheme) {
      const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
      if (index === -1) {
        _httpAuthSchemes.push(httpAuthScheme);
      } else {
        _httpAuthSchemes.splice(index, 1, httpAuthScheme);
      }
    },
    httpAuthSchemes() {
      return _httpAuthSchemes;
    },
    setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
      _httpAuthSchemeProvider = httpAuthSchemeProvider;
    },
    httpAuthSchemeProvider() {
      return _httpAuthSchemeProvider;
    },
    setCredentials(credentials) {
      _credentials = credentials;
    },
    credentials() {
      return _credentials;
    }
  };
};
var resolveHttpAuthRuntimeConfig = (config) => {
  return {
    httpAuthSchemes: config.httpAuthSchemes(),
    httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
    credentials: config.credentials()
  };
};

// node_modules/@aws-sdk/client-s3/dist-es/runtimeExtensions.js
var asPartial = (t2) => t2;
var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
  const extensionConfiguration = {
    ...asPartial(getAwsRegionExtensionConfiguration(runtimeConfig)),
    ...asPartial(getDefaultExtensionConfiguration(runtimeConfig)),
    ...asPartial(getHttpHandlerExtensionConfiguration(runtimeConfig)),
    ...asPartial(getHttpAuthExtensionConfiguration(runtimeConfig))
  };
  extensions.forEach((extension) => extension.configure(extensionConfiguration));
  return {
    ...runtimeConfig,
    ...resolveAwsRegionExtensionConfiguration(extensionConfiguration),
    ...resolveDefaultRuntimeConfig(extensionConfiguration),
    ...resolveHttpHandlerRuntimeConfig(extensionConfiguration),
    ...resolveHttpAuthRuntimeConfig(extensionConfiguration)
  };
};

// node_modules/@aws-sdk/client-s3/dist-es/S3Client.js
var S3Client = class extends Client {
  config;
  constructor(...[configuration]) {
    const _config_0 = getRuntimeConfig2(configuration || {});
    const _config_1 = resolveClientEndpointParameters(_config_0);
    const _config_2 = resolveUserAgentConfig(_config_1);
    const _config_3 = resolveFlexibleChecksumsConfig(_config_2);
    const _config_4 = resolveRetryConfig(_config_3);
    const _config_5 = resolveRegionConfig(_config_4);
    const _config_6 = resolveHostHeaderConfig(_config_5);
    const _config_7 = resolveEndpointConfig(_config_6);
    const _config_8 = resolveEventStreamSerdeConfig(_config_7);
    const _config_9 = resolveHttpAuthSchemeConfig(_config_8);
    const _config_10 = resolveS3Config(_config_9, { session: [() => this, CreateSessionCommand] });
    const _config_11 = resolveRuntimeExtensions(_config_10, configuration?.extensions || []);
    super(_config_11);
    this.config = _config_11;
    this.middlewareStack.use(getUserAgentPlugin(this.config));
    this.middlewareStack.use(getRetryPlugin(this.config));
    this.middlewareStack.use(getContentLengthPlugin(this.config));
    this.middlewareStack.use(getHostHeaderPlugin(this.config));
    this.middlewareStack.use(getLoggerPlugin(this.config));
    this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
    this.middlewareStack.use(getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
      httpAuthSchemeParametersProvider: defaultS3HttpAuthSchemeParametersProvider,
      identityProviderConfigProvider: async (config) => new DefaultIdentityProviderConfig({
        "aws.auth#sigv4": config.credentials,
        "aws.auth#sigv4a": config.credentials
      })
    }));
    this.middlewareStack.use(getHttpSigningPlugin(this.config));
    this.middlewareStack.use(getValidateBucketNamePlugin(this.config));
    this.middlewareStack.use(getAddExpectContinuePlugin(this.config));
    this.middlewareStack.use(getRegionRedirectMiddlewarePlugin(this.config));
    this.middlewareStack.use(getS3ExpressPlugin(this.config));
    this.middlewareStack.use(getS3ExpressHttpSigningPlugin(this.config));
  }
  destroy() {
    super.destroy();
  }
};

// node_modules/@aws-sdk/middleware-ssec/dist-es/index.js
function ssecMiddleware(options) {
  return (next) => async (args) => {
    const input = { ...args.input };
    const properties = [
      {
        target: "SSECustomerKey",
        hash: "SSECustomerKeyMD5"
      },
      {
        target: "CopySourceSSECustomerKey",
        hash: "CopySourceSSECustomerKeyMD5"
      }
    ];
    for (const prop of properties) {
      const value = input[prop.target];
      if (value) {
        let valueForHash;
        if (typeof value === "string") {
          if (isValidBase64EncodedSSECustomerKey(value, options)) {
            valueForHash = options.base64Decoder(value);
          } else {
            valueForHash = options.utf8Decoder(value);
            input[prop.target] = options.base64Encoder(valueForHash);
          }
        } else {
          valueForHash = ArrayBuffer.isView(value) ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength) : new Uint8Array(value);
          input[prop.target] = options.base64Encoder(valueForHash);
        }
        const hash = new options.md5();
        hash.update(valueForHash);
        input[prop.hash] = options.base64Encoder(await hash.digest());
      }
    }
    return next({
      ...args,
      input
    });
  };
}
var ssecMiddlewareOptions = {
  name: "ssecMiddleware",
  step: "initialize",
  tags: ["SSE"],
  override: true
};
var getSsecPlugin = (config) => ({
  applyToStack: (clientStack) => {
    clientStack.add(ssecMiddleware(config), ssecMiddlewareOptions);
  }
});
function isValidBase64EncodedSSECustomerKey(str, options) {
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  if (!base64Regex.test(str))
    return false;
  try {
    const decodedBytes = options.base64Decoder(str);
    return decodedBytes.length === 32;
  } catch {
    return false;
  }
}

// node_modules/@aws-sdk/client-s3/dist-es/commands/CompleteMultipartUploadCommand.js
var CompleteMultipartUploadCommand = class extends Command.classBuilder().ep({
  ...commonParams,
  Bucket: { type: "contextParams", name: "Bucket" },
  Key: { type: "contextParams", name: "Key" }
}).m(function(Command2, cs2, config, o2) {
  return [
    getSerdePlugin(config, this.serialize, this.deserialize),
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions()),
    getThrow200ExceptionsPlugin(config),
    getSsecPlugin(config)
  ];
}).s("AmazonS3", "CompleteMultipartUpload", {}).n("S3Client", "CompleteMultipartUploadCommand").f(CompleteMultipartUploadRequestFilterSensitiveLog, CompleteMultipartUploadOutputFilterSensitiveLog).ser(se_CompleteMultipartUploadCommand).de(de_CompleteMultipartUploadCommand).build() {
};

// node_modules/@aws-sdk/client-s3/dist-es/commands/CreateMultipartUploadCommand.js
var CreateMultipartUploadCommand = class extends Command.classBuilder().ep({
  ...commonParams,
  Bucket: { type: "contextParams", name: "Bucket" },
  Key: { type: "contextParams", name: "Key" }
}).m(function(Command2, cs2, config, o2) {
  return [
    getSerdePlugin(config, this.serialize, this.deserialize),
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions()),
    getThrow200ExceptionsPlugin(config),
    getSsecPlugin(config)
  ];
}).s("AmazonS3", "CreateMultipartUpload", {}).n("S3Client", "CreateMultipartUploadCommand").f(CreateMultipartUploadRequestFilterSensitiveLog, CreateMultipartUploadOutputFilterSensitiveLog).ser(se_CreateMultipartUploadCommand).de(de_CreateMultipartUploadCommand).build() {
};

// node_modules/@aws-sdk/client-s3/dist-es/commands/DeleteObjectCommand.js
var DeleteObjectCommand = class extends Command.classBuilder().ep({
  ...commonParams,
  Bucket: { type: "contextParams", name: "Bucket" },
  Key: { type: "contextParams", name: "Key" }
}).m(function(Command2, cs2, config, o2) {
  return [
    getSerdePlugin(config, this.serialize, this.deserialize),
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions()),
    getThrow200ExceptionsPlugin(config)
  ];
}).s("AmazonS3", "DeleteObject", {}).n("S3Client", "DeleteObjectCommand").f(void 0, void 0).ser(se_DeleteObjectCommand).de(de_DeleteObjectCommand).build() {
};

// node_modules/@aws-sdk/client-s3/dist-es/commands/GetObjectCommand.js
var GetObjectCommand = class extends Command.classBuilder().ep({
  ...commonParams,
  Bucket: { type: "contextParams", name: "Bucket" },
  Key: { type: "contextParams", name: "Key" }
}).m(function(Command2, cs2, config, o2) {
  return [
    getSerdePlugin(config, this.serialize, this.deserialize),
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions()),
    getFlexibleChecksumsPlugin(config, {
      requestChecksumRequired: false,
      requestValidationModeMember: "ChecksumMode",
      responseAlgorithms: ["CRC64NVME", "CRC32", "CRC32C", "SHA256", "SHA1"]
    }),
    getSsecPlugin(config),
    getS3ExpiresMiddlewarePlugin(config)
  ];
}).s("AmazonS3", "GetObject", {}).n("S3Client", "GetObjectCommand").f(GetObjectRequestFilterSensitiveLog, GetObjectOutputFilterSensitiveLog).ser(se_GetObjectCommand).de(de_GetObjectCommand).build() {
};

// node_modules/@aws-sdk/client-s3/dist-es/commands/HeadObjectCommand.js
var HeadObjectCommand = class extends Command.classBuilder().ep({
  ...commonParams,
  Bucket: { type: "contextParams", name: "Bucket" },
  Key: { type: "contextParams", name: "Key" }
}).m(function(Command2, cs2, config, o2) {
  return [
    getSerdePlugin(config, this.serialize, this.deserialize),
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions()),
    getThrow200ExceptionsPlugin(config),
    getSsecPlugin(config),
    getS3ExpiresMiddlewarePlugin(config)
  ];
}).s("AmazonS3", "HeadObject", {}).n("S3Client", "HeadObjectCommand").f(HeadObjectRequestFilterSensitiveLog, HeadObjectOutputFilterSensitiveLog).ser(se_HeadObjectCommand).de(de_HeadObjectCommand).build() {
};

// node_modules/@aws-sdk/client-s3/dist-es/commands/PutObjectCommand.js
var PutObjectCommand = class extends Command.classBuilder().ep({
  ...commonParams,
  Bucket: { type: "contextParams", name: "Bucket" },
  Key: { type: "contextParams", name: "Key" }
}).m(function(Command2, cs2, config, o2) {
  return [
    getSerdePlugin(config, this.serialize, this.deserialize),
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions()),
    getFlexibleChecksumsPlugin(config, {
      requestAlgorithmMember: { httpHeader: "x-amz-sdk-checksum-algorithm", name: "ChecksumAlgorithm" },
      requestChecksumRequired: false
    }),
    getCheckContentLengthHeaderPlugin(config),
    getThrow200ExceptionsPlugin(config),
    getSsecPlugin(config)
  ];
}).s("AmazonS3", "PutObject", {}).n("S3Client", "PutObjectCommand").f(PutObjectRequestFilterSensitiveLog, PutObjectOutputFilterSensitiveLog).ser(se_PutObjectCommand).de(de_PutObjectCommand).build() {
};

// node_modules/@aws-sdk/client-s3/dist-es/commands/UploadPartCommand.js
var UploadPartCommand = class extends Command.classBuilder().ep({
  ...commonParams,
  Bucket: { type: "contextParams", name: "Bucket" },
  Key: { type: "contextParams", name: "Key" }
}).m(function(Command2, cs2, config, o2) {
  return [
    getSerdePlugin(config, this.serialize, this.deserialize),
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions()),
    getFlexibleChecksumsPlugin(config, {
      requestAlgorithmMember: { httpHeader: "x-amz-sdk-checksum-algorithm", name: "ChecksumAlgorithm" },
      requestChecksumRequired: false
    }),
    getThrow200ExceptionsPlugin(config),
    getSsecPlugin(config)
  ];
}).s("AmazonS3", "UploadPart", {}).n("S3Client", "UploadPartCommand").f(UploadPartRequestFilterSensitiveLog, UploadPartOutputFilterSensitiveLog).ser(se_UploadPartCommand).de(de_UploadPartCommand).build() {
};

// src/lib/utils.ts
import { randomUUID } from "crypto";

// node_modules/@aws-sdk/util-format-url/dist-es/index.js
function formatUrl(request) {
  const { port, query } = request;
  let { protocol, path, hostname } = request;
  if (protocol && protocol.slice(-1) !== ":") {
    protocol += ":";
  }
  if (port) {
    hostname += `:${port}`;
  }
  if (path && path.charAt(0) !== "/") {
    path = `/${path}`;
  }
  let queryString = query ? buildQueryString(query) : "";
  if (queryString && queryString[0] !== "?") {
    queryString = `?${queryString}`;
  }
  let auth = "";
  if (request.username != null || request.password != null) {
    const username = request.username ?? "";
    const password = request.password ?? "";
    auth = `${username}:${password}@`;
  }
  let fragment = "";
  if (request.fragment) {
    fragment = `#${request.fragment}`;
  }
  return `${protocol}//${auth}${hostname}${path}${queryString}${fragment}`;
}

// node_modules/@aws-sdk/s3-request-presigner/dist-es/constants.js
var UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
var SHA256_HEADER = "X-Amz-Content-Sha256";

// node_modules/@aws-sdk/s3-request-presigner/dist-es/presigner.js
var S3RequestPresigner = class {
  signer;
  constructor(options) {
    const resolvedOptions = {
      service: options.signingName || options.service || "s3",
      uriEscapePath: options.uriEscapePath || false,
      applyChecksum: options.applyChecksum || false,
      ...options
    };
    this.signer = new SignatureV4MultiRegion(resolvedOptions);
  }
  presign(requestToSign, { unsignableHeaders = /* @__PURE__ */ new Set(), hoistableHeaders = /* @__PURE__ */ new Set(), unhoistableHeaders = /* @__PURE__ */ new Set(), ...options } = {}) {
    this.prepareRequest(requestToSign, {
      unsignableHeaders,
      unhoistableHeaders,
      hoistableHeaders
    });
    return this.signer.presign(requestToSign, {
      expiresIn: 900,
      unsignableHeaders,
      unhoistableHeaders,
      ...options
    });
  }
  presignWithCredentials(requestToSign, credentials, { unsignableHeaders = /* @__PURE__ */ new Set(), hoistableHeaders = /* @__PURE__ */ new Set(), unhoistableHeaders = /* @__PURE__ */ new Set(), ...options } = {}) {
    this.prepareRequest(requestToSign, {
      unsignableHeaders,
      unhoistableHeaders,
      hoistableHeaders
    });
    return this.signer.presignWithCredentials(requestToSign, credentials, {
      expiresIn: 900,
      unsignableHeaders,
      unhoistableHeaders,
      ...options
    });
  }
  prepareRequest(requestToSign, { unsignableHeaders = /* @__PURE__ */ new Set(), unhoistableHeaders = /* @__PURE__ */ new Set(), hoistableHeaders = /* @__PURE__ */ new Set() } = {}) {
    unsignableHeaders.add("content-type");
    Object.keys(requestToSign.headers).map((header) => header.toLowerCase()).filter((header) => header.startsWith("x-amz-server-side-encryption")).forEach((header) => {
      if (!hoistableHeaders.has(header)) {
        unhoistableHeaders.add(header);
      }
    });
    requestToSign.headers[SHA256_HEADER] = UNSIGNED_PAYLOAD;
    const currentHostHeader = requestToSign.headers.host;
    const port = requestToSign.port;
    const expectedHostHeader = `${requestToSign.hostname}${requestToSign.port != null ? ":" + port : ""}`;
    if (!currentHostHeader || currentHostHeader === requestToSign.hostname && requestToSign.port != null) {
      requestToSign.headers.host = expectedHostHeader;
    }
  }
};

// node_modules/@aws-sdk/s3-request-presigner/dist-es/getSignedUrl.js
var getSignedUrl = async (client, command, options = {}) => {
  let s3Presigner;
  let region;
  if (typeof client.config.endpointProvider === "function") {
    const endpointV2 = await getEndpointFromInstructions(command.input, command.constructor, client.config);
    const authScheme = endpointV2.properties?.authSchemes?.[0];
    if (authScheme?.name === "sigv4a") {
      region = authScheme?.signingRegionSet?.join(",");
    } else {
      region = authScheme?.signingRegion;
    }
    s3Presigner = new S3RequestPresigner({
      ...client.config,
      signingName: authScheme?.signingName,
      region: async () => region
    });
  } else {
    s3Presigner = new S3RequestPresigner(client.config);
  }
  const presignInterceptMiddleware = (next, context) => async (args) => {
    const { request } = args;
    if (!HttpRequest.isInstance(request)) {
      throw new Error("Request to be presigned is not an valid HTTP request.");
    }
    delete request.headers["amz-sdk-invocation-id"];
    delete request.headers["amz-sdk-request"];
    delete request.headers["x-amz-user-agent"];
    let presigned2;
    const presignerOptions = {
      ...options,
      signingRegion: options.signingRegion ?? context["signing_region"] ?? region,
      signingService: options.signingService ?? context["signing_service"]
    };
    if (context.s3ExpressIdentity) {
      presigned2 = await s3Presigner.presignWithCredentials(request, context.s3ExpressIdentity, presignerOptions);
    } else {
      presigned2 = await s3Presigner.presign(request, presignerOptions);
    }
    return {
      response: {},
      output: {
        $metadata: { httpStatusCode: 200 },
        presigned: presigned2
      }
    };
  };
  const middlewareName = "presignInterceptMiddleware";
  const clientStack = client.middlewareStack.clone();
  clientStack.addRelativeTo(presignInterceptMiddleware, {
    name: middlewareName,
    relation: "before",
    toMiddleware: "awsAuthMiddleware",
    override: true
  });
  const handler2 = command.resolveMiddleware(clientStack, client.config, {});
  const { output } = await handler2({ input: command.input });
  const { presigned } = output;
  return formatUrl(presigned);
};

// src/lib/utils.ts
import dotenv from "dotenv";
dotenv.config();
var Bucket = process.env.BUCKET_NAME;
console.info("BUCKET_NAME", Bucket);
var completeMultipart = ({
  ETags,
  UploadId,
  Key
}) => {
  return getS3Client().send(
    new CompleteMultipartUploadCommand({
      Bucket,
      Key,
      UploadId,
      MultipartUpload: {
        Parts: ETags.map((ETag, i2) => ({
          ETag,
          PartNumber: i2 + 1
        }))
      }
    })
  );
};
var getPutPartUrl = (options) => getSignedUrl(
  getS3Client(),
  new UploadPartCommand({
    Bucket,
    Key: options.Key,
    UploadId: options.UploadId,
    PartNumber: options.PartNumber
  }),
  {
    expiresIn: options.expiresIn
  }
);
var createMultipart = async (fileName, ACL = "private") => {
  let Key = randomUUID();
  if (fileName) {
    const name = fileName.split(".");
    const ext = name.pop();
    Key = name.join(".") + "_" + Key + "." + ext;
  }
  const { UploadId } = await getS3Client().send(
    new CreateMultipartUploadCommand({
      Bucket,
      Key,
      ACL
    })
  );
  if (!UploadId)
    throw new Error("Error trying to create a multipart upload \u{1F6A8}");
  return {
    uploadId: UploadId,
    key: Key
  };
};
var deleteObject = (Key) => getS3Client().send(
  new DeleteObjectCommand({
    Bucket,
    Key
  })
);
var globalBucket = Bucket;
var getReadURL = (Key, expiresIn = 900, options) => {
  const { Bucket: Bucket2 = globalBucket } = options || {};
  getSignedUrl(
    getS3Client(),
    new GetObjectCommand({
      Key,
      Bucket: Bucket2
    }),
    { expiresIn }
    // seconds
  );
};
var fileExist = (Key) => {
  return getS3Client().send(
    new HeadObjectCommand({
      Bucket,
      Key
    })
  ).then((r2) => {
    console.log("::FILE_EXIST:: ", r2.ContentType);
    return true;
  }).catch((err) => {
    console.error("FILE_MAY_NOT_EXIST", Key, err.message);
    return false;
  });
};
var getPutFileUrl = (Key, expiresIn = 900) => getSignedUrl(
  getS3Client(),
  new PutObjectCommand({
    Bucket,
    Key
  }),
  { expiresIn }
);
var getDeleteFileUrl = async (Key) => getSignedUrl(
  getS3Client(),
  new DeleteObjectCommand({
    Bucket,
    Key
  }),
  { expiresIn: 3600 }
);
var s3Client;
function getS3Client() {
  s3Client ??= new S3Client({
    region: process.env.AWS_REGION || "auto",
    endpoint: process.env.AWS_ENDPOINT_URL_S3
  });
  return s3Client;
}

// src/lib/constants.ts
var CREATE_MULTIPART_STRING = "create_multipart_upload";
var CREATE_PUT_PART_URL_STRING = "create_put_part_url";
var COMPLETE_MULTIPART_STRING = "complete_multipart_upload";

// src/lib/multipart-uploader.ts
var handler = async (request, cb2, options) => {
  const { ACL = "private", directory = "" } = options || {};
  const body = await request.json();
  switch (body.intent) {
    case CREATE_MULTIPART_STRING:
      const path = directory + body.fileName;
      return new Response(
        JSON.stringify(await createMultipart(path, body.access || ACL))
      );
    case CREATE_PUT_PART_URL_STRING:
      return new Response(
        await getPutPartUrl({
          Key: body.key,
          UploadId: body.uploadId,
          PartNumber: body.partNumber
        })
      );
    case COMPLETE_MULTIPART_STRING:
      const completedData = await completeMultipart({
        ETags: body.etags,
        Key: body.key,
        UploadId: body.uploadId
      });
      const complete = {
        ...body,
        completedData,
        intent: void 0
      };
      console.info("::MULTIPART_COMPLETED:: ", complete.key);
      return typeof cb2 === "function" ? cb2(complete) : new Response(JSON.stringify(complete));
    default:
      return new Response(null);
  }
};
export {
  deleteObject,
  fileExist,
  getDeleteFileUrl,
  getPutFileUrl,
  getReadURL,
  getS3Client,
  handler
};
