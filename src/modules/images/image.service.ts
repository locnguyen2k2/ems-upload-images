import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { env } from 'src/utils/env';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  async handleImage(file: any): Promise<Express.Multer.File> {
    const { createReadStream, mimetype, filename } = await file;
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      createReadStream()
        .on('data', (chunk: any) => chunks.push(chunk))
        .on('end', () => resolve(Buffer.concat(chunks)))
        .on('error', reject);
    });

    return {
      originalname: filename,
      mimetype,
      buffer,
    } as Express.Multer.File;
  }

  async uploadImage(picture: any): Promise<string> {
    const file = await this.handleImage(picture);
    const bucket = this.firebaseAdmin.storage().bucket(env('FIREBASE_BUCKET'));
    const filename = `${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(`uploads/imgs/${filename}`);

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
      public: true,
    });

    return `${filename}`;
  }

  async deleteImage(picture: any): Promise<boolean> {
    const bucket = this.firebaseAdmin.storage().bucket(env('FIREBASE_BUCKET'));

    await bucket.deleteFiles({
      prefix: `uploads/imgs/${picture}`,
    });

    return true;
  }
}
