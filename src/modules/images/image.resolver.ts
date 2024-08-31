import { ImageService } from './image.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Stream } from 'stream';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Query(() => String)
  async uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: Promise<FileUpload>,
  ): Promise<string> {
    return await this.imageService.uploadImage(file);
  }
}
