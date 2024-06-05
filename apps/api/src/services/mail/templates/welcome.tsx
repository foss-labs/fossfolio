import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import type { UserRegisteredEvent } from "../mail.service";
import React from "react";

const baseUrl = process.env.CLIENT_URL
  ? `${process.env.CLIENT_URL}`
  : "fossfolio.com";

const UserWelcome = ({ name, email, avatarUrl }: UserRegisteredEvent) => {
  const previewText = "Welcome to Fossfolio";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src="https://raw.githubusercontent.com/DarkPhoenix2704/fossfolio/dev/apps/web/public/logo.svg"
                width="40"
                height="37"
                alt="Fossfolio"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome to <strong>Fossfolio</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello, {name}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You have successfully registered for Fossfolio. We are glad to
              have you on board. You can now explore the events and start
              exploring the community.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] px-2 py-1 font-semibold no-underline text-center"
                href={`${baseUrl}/events`}
              >
                Explore Events
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default UserWelcome;
