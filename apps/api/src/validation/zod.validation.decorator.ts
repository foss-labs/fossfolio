import { applyDecorators, UsePipes } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ZodValidationPipe } from './zod.validation.pipe';

interface ZodValidationOptions {
	bodySchema?: ZodSchema;
	querySchema?: ZodSchema;
}

export function ZodValidator(options: ZodValidationOptions) {
	const decorators: ClassDecorator[] = [] as unknown as ClassDecorator[];

	if (options.bodySchema) {
		decorators.push(
			UsePipes(new ZodValidationPipe(options.bodySchema, 'body')),
		);
	}

	if (options.querySchema) {
		decorators.push(
			UsePipes(new ZodValidationPipe(options.querySchema, 'query')),
		);
	}

	return applyDecorators(...decorators);
}
