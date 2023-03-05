import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateUserException extends HttpException {
    constructor(err: any) {
        super({ success: false, error: "Could'nt create User" }, HttpStatus.BAD_REQUEST);
        /* eslint-disable */
        console.log({ err });
    }
}
