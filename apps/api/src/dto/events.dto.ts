import {
  IsString,
  IsOptional,
  IsUrl,
  IsBoolean,
  IsDate,
} from "class-validator";

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  website: string;

  @IsString()
  location: string;

  @IsString()
  cover_image: string;

  @IsDate()
  event_date: Date;
}

export class CreateEventParams {
  @IsString()
  orgId: string;
}

export class DashboardEventParams {
  @IsString()
  eventId: string;
}

export class EventParams {
  @IsString()
  eventId: string;

  @IsString()
  orgId: string;
}

export class PublicEventParams {
  @IsString()
  slug: string;
}

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsUrl()
  @IsOptional()
  cover_image?: string;

  @IsBoolean()
  @IsOptional()
  is_published?: boolean;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  event_date?: Date;
}
