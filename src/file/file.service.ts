import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File, path: string) {
    return await writeFile(path, file.buffer, (err) => {
      if (err) {
        console.log('erro: \n', err);
      } else {
        console.log('imagem salva!');
      }
    });
  }
}
