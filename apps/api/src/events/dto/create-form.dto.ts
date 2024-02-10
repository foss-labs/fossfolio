import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FormPayLoad {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    organizationId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    eventId: string;

    data: Payload[];
}

class Payload {
    label: string;
    placeholder?: string;
    options?: string;
    required: boolean;
    type: FieldType;
}

type FieldType = {
    SingleLineText;
    LongText;
    SingleSelect;
    MultiSelect;
    Checkbox;
    Number;
    Email;
    URL;
    PhoneNumber;
    Attachment;
};
