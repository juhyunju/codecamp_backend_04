import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async upload({ files }) {
    // 파일을 클라우드 스토리지에 저장하는 로직
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);

    const bucket = 'juju-storage';
    const storage = new Storage({
      projectId: 'emerald-lattice-358105',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('juju-storage');

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`${bucket}/${el.filename}`))
            .on('error', () => reject('실패'));
        });
      }),
    );
    return results;
  }
}
