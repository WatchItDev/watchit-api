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
exports.mediakit = void 0;
/**
 * Provides media-related utility functions using ffmpeg and ffprobe.
 *
 * @param ds - Data source context.
 * @param activity - Activity context.
 * @returns An object containing the following functions:
 * - ffmpeg: Executes an ffmpeg command and returns the result.
 * - ffprobe: Executes ffprobe to extract metadata from a media file.
 * - extractSnapshots: Extracts snapshots from a video file at evenly spaced intervals.
 * - extractMetadata: Extracts metadata from a media file using ffprobe.
 */
const mediakit = ({ ds, activity }) => {
  async function ffmpeg(command) {
    const { execa } = await Promise.resolve().then(() =>
      __importStar(require('execa')),
    );
    const res = await execa('ffmpeg', command);
    return {
      code: res.exitCode,
      stdout: res.stdout,
      stderr: res.stderr,
      all: res.all,
    };
  }
  async function ffprobe(input) {
    const { execa } = await Promise.resolve().then(() =>
      __importStar(require('execa')),
    );
    const command = [
      '-v',
      'error',
      '-show_format',
      '-show_streams',
      '-print_format',
      'json',
      '-i',
      input,
    ];
    const { stdout } = await execa('ffprobe', command);
    return JSON.parse(stdout);
  }
  function extractSnapshots(input, duration, snapsCount, output) {
    // ffmpeg -i /media/gmena/backup/creators/jordan/its_a_party/its_a_party.mp4 -vf fps=1/2 output_%04d.jpg
    return ffmpeg([
      '-i',
      input,
      '-vf',
      `fps=1/${duration / snapsCount}`,
      `${output}/%04d.jpg`,
    ]);
  }
  function extractMetadata(input) {
    return ffprobe(input);
  }
  return {
    ffmpeg,
    ffprobe,
    extractSnapshots,
    extractMetadata,
  };
};
exports.mediakit = mediakit;
//# sourceMappingURL=mediakit.js.map
