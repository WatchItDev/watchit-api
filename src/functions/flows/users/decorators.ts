import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator'

export class SocialLinkInput {
    @IsOptional()
    @IsString()
    platform?: string

    @IsOptional()
    @IsUrl()
    url?: string
}

export class CreateUserDto {
    @IsNotEmpty() address!: string
    @IsNotEmpty() username!: string
    @IsNotEmpty() displayName!: string
    @IsNotEmpty() bio!: string

    @IsOptional()
    @IsUrl()
    profilePicture?: string

    @IsOptional()
    @IsUrl()
    coverPicture?: string

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => SocialLinkInput)
    socialLinks?: SocialLinkInput[]
}
