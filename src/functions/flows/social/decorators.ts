import { IsNotEmpty, IsString } from 'class-validator';

export class FollowDto {
    @IsNotEmpty() @IsString() me!: string;
    @IsNotEmpty() @IsString() target!: string;
}

export class LikePostDto {
    @IsNotEmpty() @IsString() me!: string;
    @IsNotEmpty() @IsString() postId!: string;
}

export class BookmarkPostDto {
    @IsNotEmpty() @IsString() me!: string;
    @IsNotEmpty() @IsString() postId!: string;
}

export class LikeCommentDto {
    @IsNotEmpty() @IsString() me!: string;
    @IsNotEmpty() @IsString() commentId!: string;
}
