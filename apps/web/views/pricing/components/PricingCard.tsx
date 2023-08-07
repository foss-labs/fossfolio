import {
    Flex,
    Heading,
    Icon,
    List,
    ListIcon,
    ListItem,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { ElementType, ReactElement } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { Card, CardProps } from './Card';

export interface PricingCardData {
    features: string[];
    name: string;
    price: string;
}

interface PricingCardProps extends CardProps {
    data: PricingCardData;
    icon?: ElementType;
    button: ReactElement;
}

export const PricingCard = (props: PricingCardProps) => {
    const { data, icon, button, ...rest } = props;
    const { features, price, name } = data;
    const accentColor = useColorModeValue('blue.600', 'blue.200');

    return (
        <Card rounded={{ sm: 'xl' }} {...rest}>
            <VStack spacing={6}>
                <Icon aria-hidden as={icon} fontSize="4xl" color={accentColor} />
                <Heading size="md" fontWeight="extrabold">
                    {name}
                </Heading>
            </VStack>
            <Flex
                align="flex-end"
                justify="center"
                fontWeight="extrabold"
                color={accentColor}
                my="8"
            >
                <Heading size="3xl" fontWeight="inherit" lineHeight="0.9em">
                    {price}
                </Heading>
                <Text fontWeight="inherit" fontSize="2xl">
                    / yr
                </Text>
            </Flex>
            <List spacing="4" mb="8" maxW="28ch" mx="auto">
                {features.map((feature) => (
                    <ListItem fontWeight="medium" key={feature}>
                        <ListIcon
                            fontSize="xl"
                            as={HiCheckCircle}
                            marginEnd={2}
                            color={accentColor}
                        />
                        {feature}
                    </ListItem>
                ))}
            </List>
            {button}
        </Card>
    );
};
