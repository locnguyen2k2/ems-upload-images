import { Module } from '@nestjs/common';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';
import { FirebaseModule } from 'src/configs/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [ImageService, ImageResolver],
  exports: [ImageService, ImageResolver],
})
export class ImageModule {}
