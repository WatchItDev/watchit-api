import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty() @IsString() authorAddress!: string;
    @IsNotEmpty() @IsString() postId!: string;
    @IsOptional() @IsString() parentComment?: string;
    @IsNotEmpty() @IsString() content!: string;
}

export class UpdateCommentDto {
    @IsNotEmpty() @IsString() commentId!: string;
    @IsNotEmpty() @IsString() content!: string;
}
