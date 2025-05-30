import { createReadStream } from 'fs';
import { ReadStream } from 'typeorm/platform/PlatformTools';

export const getFileToBuffer = (filename: string) => {
  const readStream = createReadStream(filename);
  const chunks: Buffer[] = [];

  return new Promise<{ buffer: Buffer; stream: ReadStream }>(
    (resolve, reject) => {
      readStream.on('data', (chunk: Buffer) => chunks.push(chunk));
      readStream.on('error', (err) => reject(err));
      readStream.on('close', () => {
        resolve({
          buffer: Buffer.concat(chunks),
          stream: readStream,
        });
      });
    },
  );
};
