/* eslint-disable react/no-array-index-key */
import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { Child } from '@app/types';

// Word wrapper
const Wrapper = ({ children }: Child) => (
    // We'll do this to prevent wrapping of words using CSS
    <span style={{ whiteSpace: 'nowrap' }}>{children}</span>
);

type Animate = {
    text: string;
};

// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations
export const AnimatedCharacters = ({ text }: Animate) => {
    const randomId = useId();
    // Framer Motion variant object, for controlling animation
    const item = {
        hidden: {
            y: '200%',
            color: 'black',
            transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
        },
        visible: {
            y: 0,
            color: 'black',
            transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
        },
    };

    //  Split each word of props.text into an array
    const splitWords = text.split(' ');

    // Create storage array
    const words: any = [];

    // Push each word into words array
    // eslint-disable-next-line no-restricted-syntax
    for (const [, items] of splitWords.entries()) {
        words.push(items.split(''));
    }

    // Add a space ("\u00A0") to the end of each word
    words.map((word: any) => word.push('\u00A0'));

    return (
        <h1 className="max-w-[350px] md:w-auto">
            {words.map((data: any, index: number) => (
                // Wrap each word in the Wrapper component
                <Wrapper key={data + randomId + index}>
                    {words[index].flat().map((element: string, indexs: number) => (
                        <span
                            className="overflow-hidden inline-block"
                            key={element + randomId + indexs}
                        >
                            <motion.span
                                className="inline-block text-3xl font-bold"
                                variants={item}
                            >
                                {element}
                            </motion.span>
                        </span>
                    ))}
                </Wrapper>
            ))}
        </h1>
    );
};
