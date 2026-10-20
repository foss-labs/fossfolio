import 'reflect-metadata';
import { deepStrictEqual, strictEqual, throws } from 'node:assert';
import { after, before, test } from 'node:test';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { EventsController } from './events.controller';
import { EventsService } from '../services/events.service';
import { RbacGuard } from '../services/guards/rbac-member.guard';
import { EventParamsSchema } from '../dto/events.dto';
import { BadRequest } from '../utils/error';
import { ZodValidationPipe } from '../validation/zod.validation.pipe';

// Exercise the real routes and validation without authentication or database I/O.
const events = {
	getEventBySlug: (slug: string) => ({ slug }),
	createEvent: (data: unknown) => data,
	updateEvent: (data: unknown) => data,
	deleteEvent: (data: unknown) => data,
};
const allowRequest = { canActivate: () => true };

let app: INestApplication;
let baseUrl: string;

before(async () => {
	const module = await Test.createTestingModule({
		controllers: [EventsController],
		providers: [{ provide: EventsService, useValue: events }],
	})
		.overrideGuard(AuthGuard('jwt'))
		.useValue(allowRequest)
		.overrideGuard(RbacGuard)
		.useValue(allowRequest)
		.compile();
	app = module.createNestApplication({ logger: false });
	await app.listen(0, '127.0.0.1');
	baseUrl = await app.getUrl();
});

after(async () => {
	await app?.close();
});

test('GET accepts a dynamic slug with an object params schema', async () => {
	const response = await fetch(`${baseUrl}/events/community-hackathon`);
	strictEqual(response.status, 200);
	deepStrictEqual(await response.json(), { slug: 'community-hackathon' });
});

test('POST validates body and orgId together', async () => {
	const body = {
		name: 'Community Hackathon',
		website: 'https://example.com',
		location: 'Online',
		cover_image: 'https://example.com/cover.png',
		event_date: '2025-01-01',
	};
	const response = await fetch(`${baseUrl}/events/org123/create`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	strictEqual(response.status, 201);
	deepStrictEqual(await response.json(), {
		newEvent: { ...body, event_date: '2025-01-01T00:00:00.000Z' },
		orgId: 'org123',
	});
});

test('PATCH accepts both dynamic params and a valid body', async () => {
	const response = await fetch(`${baseUrl}/events/org123/evt456`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name: 'Updated event' }),
	});
	strictEqual(response.status, 200);
	deepStrictEqual(await response.json(), {
		updateData: { name: 'Updated event' },
		orgId: 'org123',
		eventId: 'evt456',
	});
});

test('DELETE accepts both dynamic params', async () => {
	const response = await fetch(`${baseUrl}/events/org123/evt456`, {
		method: 'DELETE',
	});
	strictEqual(response.status, 200);
	deepStrictEqual(await response.json(), {
		orgId: 'org123',
		eventId: 'evt456',
	});
});

test('body validation still rejects invalid requests on dynamic routes', async () => {
	for (const [method, path] of [
		['POST', '/events/org123/create'],
		['PATCH', '/events/org123/evt456'],
	]) {
		const response = await fetch(`${baseUrl}${path}`, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: 123 }),
		});
		strictEqual(response.status, 400);
	}
});

test('params validation rejects missing or incorrectly typed fields', () => {
	const pipe = new ZodValidationPipe(EventParamsSchema, 'param');
	for (const params of [
		{ orgId: 'org123' },
		{ orgId: 'org123', eventId: 123 },
	]) {
		throws(() => pipe.transform(params, { type: 'param' }), BadRequest);
	}
});
