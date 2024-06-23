import { applyDecorators, UsePipes } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ZodValidationPipe } from './zod.validation.pipe';

interface ZodValidationOptions {
	body?: ZodSchema;
	query?: ZodSchema;
	params?: ZodSchema;
}

export function ZodValidator(options: ZodValidationOptions) {
	const decorators: ClassDecorator[] = [] as unknown as ClassDecorator[];
	if (options.body) {
		decorators.push(UsePipes(new ZodValidationPipe(options.body, 'body')));
	}

	if (options.query) {
		decorators.push(UsePipes(new ZodValidationPipe(options.query, 'query')));
	}
	if (options.params) {
		decorators.push(UsePipes(new ZodValidationPipe(options.params, 'param')));
	}

	return applyDecorators(...decorators);
}
