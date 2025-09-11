import type { Ctx } from '../manager';

/**
 * Provides media processing utilities using FFmpeg and FFprobe.
 *
 * @param ds - The data source context.
 * @param activity - The activity context.
 * @returns An object containing media processing functions:
 * - `ffmpeg(command: string[]): Promise<any>`: Executes an FFmpeg command.
 * - `ffprobe(input: string): Promise<any>`: Retrieves metadata from a media file using FFprobe.
 * - `extractSnapshots(input: string, duration: number, snapsCount: number, output: string): Promise<any>`: Extracts a specified number of snapshots from a media file over its duration.
 * - `extractMetadata(input: string): Promise<any>`: Extracts metadata from a media file.
 */
export const mediakit = ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>) => {
  /**
   * Executes an ffmpeg command using the provided arguments.
   *
   * @param command - An array of command-line arguments to pass to ffmpeg.
   * @returns A promise that resolves to an object containing the exit code, stdout, stderr, and all output from the ffmpeg process.
   */
  async function ffmpeg(command: string[]): Promise<any> {
    const { execa } = await import('execa');
    const res = await execa('ffmpeg', command);
    return {
      code: res.exitCode,
      stdout: res.stdout,
      stderr: res.stderr,
      all: res.all,
    };
  }

  /**
   * Runs the `ffprobe` command-line tool on the specified input file and returns the parsed JSON output.
   *
   * @param input - The path to the media file to be analyzed by ffprobe.
   * @returns A promise that resolves to the parsed JSON output containing format and stream information.
   * @throws If the ffprobe command fails or returns invalid JSON.
   */
  async function ffprobe(input: string): Promise<any> {
    const { execa } = await import('execa');
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

  /**
   * Extracts a specified number of snapshot images from a video file over its duration.
   *
   * @param input - The path to the input video file.
   * @param duration - The total duration of the video in seconds.
   * @param snapsCount - The number of snapshots to extract from the video.
   * @param output - The directory where the extracted snapshot images will be saved.
   * @returns The result of the ffmpeg command execution.
   */
  function extractSnapshots(input: string, duration: number, snapsCount: number, output: string) {
    return ffmpeg(['-i', input, '-vf', `fps=1/${duration / snapsCount}`, `${output}/%04d.jpg`]);
  }

  return {
    ffmpeg,
    ffprobe,
    extractSnapshots,
  };
};

export type MediaLibType = ReturnType<typeof mediakit>;
