import { HttpException, HttpStatus } from '@nestjs/common';

export class ReadUserException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: "Could'nt read User" }, HttpStatus.BAD_REQUEST);
        /* eslint-disable */
        console.log({ err });
    }
}
