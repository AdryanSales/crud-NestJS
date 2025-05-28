/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PathLike, writeFile } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  getDestinationPath() {
    return join(
      __dirname,
      '..',
      '..',
      'storage',
      'photos'
    );
  }

  async upload(file: Express.Multer.File, filename: string) {
		const path: PathLike = join(this.getDestinationPath(), filename)
    await writeFile(path, file.buffer, (err) => {
      if (err) {
        console.log('erro: \n', err);
      }
    });
		return path
  }
}
