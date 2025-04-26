import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsArray,
    ValidateNested,
    IsIn,
} from 'class-validator';
import type {
    VisibilitySetting,
    MediaType,
    CreatePostInput,
    UpdatePostInput,
} from '../../../schema/types';

class MediaAttachmentInput {
    @IsNotEmpty()
    @IsString()
    url!: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    cid?: string;

    @IsIn(['IMAGE','VIDEO','AUDIO'])
    type!: MediaType;
}

export class CreatePostDto implements CreatePostInput {
    @IsNotEmpty()
    @IsString()
    authorAddress!: string;

    @IsOptional()
    @IsString()
    content!: string;

    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsString()
    cid!: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MediaAttachmentInput)
    media?: MediaAttachmentInput[];

    @IsNotEmpty()
    @IsIn(['PUBLIC','FOLLOWERS_ONLY','PRIVATE'])
    visibility!: VisibilitySetting;

    @IsOptional()
    @IsString()
    replyTo?: string;

    @IsOptional()
    @IsString()
    quoteOf?: string;
}

export class UpdatePostDto implements UpdatePostInput {
    @IsNotEmpty()
    @IsString()
    postId!: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    cid?: string;

    @IsOptional()
    @IsIn(['PUBLIC','FOLLOWERS_ONLY','PRIVATE'])
    visibility?: VisibilitySetting;
}

export class IncrementViewDto {
    @IsNotEmpty()
    @IsString()
    postId!: string;
}
