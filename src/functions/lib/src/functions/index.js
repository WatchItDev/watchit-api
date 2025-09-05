'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.processingTrigger =
  exports.storageTrigger =
  exports.logsTrigger =
  exports.perksTrigger =
  exports.xpTrigger =
  exports.likesTrigger =
  exports.followsTrigger =
  exports.bookmarksTrigger =
  exports.commentsTrigger =
  exports.postsTrigger =
  exports.usersTrigger =
    void 0;
const dotenv_1 = require('dotenv');
(0, dotenv_1.config)({ path: '../../.env' });
exports.usersTrigger = __importStar(require('./triggers/users'));
exports.postsTrigger = __importStar(require('./triggers/posts'));
exports.commentsTrigger = __importStar(require('./triggers/comments'));
exports.bookmarksTrigger = __importStar(require('./triggers/bookmarks'));
exports.followsTrigger = __importStar(require('./triggers/follow'));
exports.likesTrigger = __importStar(require('./triggers/likes'));
exports.xpTrigger = __importStar(require('./triggers/xp'));
exports.perksTrigger = __importStar(require('./triggers/perks'));
exports.logsTrigger = __importStar(require('./triggers/logs'));
exports.storageTrigger = __importStar(require('./triggers/storage'));
exports.processingTrigger = __importStar(require('./triggers/processing'));
//# sourceMappingURL=index.js.map
