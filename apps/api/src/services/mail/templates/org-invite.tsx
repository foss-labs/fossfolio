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
import type { OrgInviteEvent } from '../mail.service';
import React from 'react';

const baseUrl = process.env.CLIENT_URL
	? `https://${process.env.CLIENT_URL}`
	: 'fossfolio.com';

const InviteUserEmail = ({
	from,
	fromEmail,
	orgName,
	inviteUrl,
}: OrgInviteEvent) => {
	const previewText = `Join ${orgName} on Fossfolio`;

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
								alt="Fossfolio"
								className="my-0 mx-auto"
							/>
						</Section>
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Join <strong>{orgName}</strong> on <strong>Fossfolio</strong>
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Hello,
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							<strong>{from}</strong> (
							<Link
								href={`mailto:${fromEmail}`}
								className="text-blue-600 no-underline"
							>
								{fromEmail}
							</Link>
							) has invited you to the <strong>{orgName}</strong> Organisation
							on <strong>Fossfolio</strong>.
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
								href={inviteUrl}
							>
								Join the Org
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							or copy and paste this URL into your browser:{' '}
							<Link href={inviteUrl} className="text-blue-600 no-underline">
								{inviteUrl}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default InviteUserEmail;
