import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { FFError } from '@api/utils/error';

export class ZodValidationPipe implements PipeTransform {
	constructor(
		private schema: ZodSchema,
		private type: 'body' | 'query' | 'param',
	) {}

	transform(value: unknown, metadata: ArgumentMetadata) {
		console.log(value, metadata);
		if (metadata.type !== this.type) {
			return value;
		}

		try {
			const parsedValue = this.schema.parse(value);
			return parsedValue;
		} catch (error: unknown) {
			FFError.badRequest(`Invalid request ${this.type}:${error}`);
		}
	}
}
