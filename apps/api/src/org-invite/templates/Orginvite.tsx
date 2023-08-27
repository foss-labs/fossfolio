import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface VercelInviteUserEmailProps {
    username?: string;
    userImage?: string;
    invitedByUsername?: string;
    invitedByEmail?: string;
    teamName?: string;
    inviteLink?: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

export const InviteUserEmail = ({
    username = 'zenorocha',
    userImage = `${baseUrl}/static/vercel-user.png`,
    invitedByUsername = 'bukinoshita',
    invitedByEmail = 'bukinoshita@example.com',
    teamName = 'My Project',
    inviteLink = 'https://vercel.com/teams/invite/foo',
}: VercelInviteUserEmailProps) => {
    const previewText = `Join ${invitedByUsername} on Vercel`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px]">
                            <Img
                                src={`${baseUrl}/static/vercel-logo.png`}
                                width="40"
                                height="37"
                                alt="Vercel"
                                className="my-0 mx-auto"
                            />
                        </Section>
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Join <strong>{teamName}</strong> on <strong>Fossfolio</strong>
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Hello {username},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            <strong>{invitedByUsername}</strong> (
                            <Link
                                href={`mailto:${invitedByEmail}`}
                                className="text-blue-600 no-underline"
                            >
                                {invitedByEmail}
                            </Link>
                            ) has invited you to the <strong>{teamName}</strong> Organisation on{' '}
                            <strong>Fossfolio</strong>.
                        </Text>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                pX={20}
                                pY={12}
                                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                                href={inviteLink}
                            >
                                Join the team
                            </Button>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            or copy and paste this URL into your browser:{' '}
                            <Link
                                href={inviteLink}
                                className="text-blue-600 no-underline"
                            >
                                {inviteLink}
                            </Link>
                        </Text>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

