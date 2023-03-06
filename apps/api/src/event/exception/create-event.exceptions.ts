import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateEventException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: "Could'nt create event" }, HttpStatus.BAD_REQUEST);
        /* eslint-disable */
        console.log({ err });
    }
}
