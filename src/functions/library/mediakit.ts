import type { Ctx } from '../manager';

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
export const mediakit = ({ ds, activity }: Pick<Ctx, 'ds' | 'activity'>) => {
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

  function extractSnapshots(
    input: string,
    duration: number,
    snapsCount: number,
    output: string,
  ) {
    // ffmpeg -i /media/gmena/backup/creators/jordan/its_a_party/its_a_party.mp4 -vf fps=1/2 output_%04d.jpg
    return ffmpeg([
      '-i',
      input,
      '-vf',
      `fps=1/${duration / snapsCount}`,
      `${output}/%04d.jpg`,
    ]);
  }

  function extractMetadata(input: string) {
    return ffprobe(input);
  }

  return {
    ffmpeg,
    ffprobe,
    extractSnapshots,
    extractMetadata,
  };
};

export type MediaLibType = ReturnType<typeof mediakit>;
