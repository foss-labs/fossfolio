import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prismaService = new PrismaClient();

const generateUser = () => ({
    email: faker.internet.email(),
    displayName: faker.internet.displayName(),
    slug: faker.lorem.word(),
    photoURL: faker.image.url(),
    collegeName: faker.lorem.word(),
});

async function main() {
    const rounds = 10;
    for (let i = 0; i < rounds; i++) {
        const userData = generateUser();
        const user = await prismaService.user.create({
            data: userData,
        });

        await prismaService.account.create({
            data: {
                userId: user.uid,
                provider: faker.number.int().toString(),
                providerAccountId: faker.number.int().toString(),
            },
        });

        const org = await prismaService.organization.create({
            data: {
                name: faker.internet.displayName(),
                slug: faker.number.int().toString(),
                members: {
                    create: {
                        userUid: user.uid,
                        role: 'ADMIN',
                    },
                },
            },
        });

        const event = await prismaService.events.create({
            data: {
                organizationId: org.id,
                name: faker.internet.displayName(),
                slug: faker.number.int().toString(),
                website: faker.internet.domainName(),
                location: faker.location.city(),
                lastDate: faker.date.soon(),
                eventDate: faker.date.future({ years: 1 }),
                maxTicketCount: 10,
                coverImage: faker.image.url(),
            },
        });

        await prismaService.events.update({
            where: {
                id: event.id,
            },
            data: {
                form: {
                    createMany: {
                        data: [
                            {
                                label: faker.internet.displayName(),
                                placeholder: faker.lorem.word(),
                                type: 'Email',
                            },
                            {
                                label: faker.internet.displayName(),
                                placeholder: faker.lorem.word(),
                                type: 'Number',
                            },
                        ],
                    },
                },
                isFormPublished: true,
                isPublished: true,
            },
        });

        await prismaService.user.update({
            where: {
                uid: user.uid,
            },
            data: {
                Ticket: {
                    create: {
                        eventsId: event.id,
                    },
                },
            },
        });
    }
}

main()
    .catch((e) => console.log('Error populating db', e))
    .finally(() => prismaService.$disconnect());
