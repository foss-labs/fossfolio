import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { BiLoader } from "react-icons/bi"
import { twMerge } from "tailwind-merge";

type Props = {
    children: ReactNode;
    isDisabled?: boolean;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    // loading state
    isLoading?: boolean;
};

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/95',
                outline: 'bg-[#F9F5FF] text-primary border-1 hover:text-primary hover:bg-[#F9F5FF]  border-[1.4px] hover:border-primary'

            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> &
    Props;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            isDisabled = false,
            className = "",
            size = "sm",
            variant = 'default',
            leftIcon,
            rightIcon,
            isLoading,
            ...props
        },
        ref
    ): JSX.Element => {
        const loadingToggleClass = isLoading ? "opacity-0" : "opacity-100";

        return (
            <button
                ref={ref}
                aria-disabled={isDisabled}
                type="button"
                className={twMerge(
                    buttonVariants({
                        size,
                        className
                    })
                )}
                disabled={isDisabled}
                {...props}
            >
                {isLoading && (
                    <BiLoader className="animate-spin w-[90px]" />
                )
                }
                {leftIcon && (
                    <div
                        className={twMerge(
                            "inline-flex shrink-0 cursor-pointer items-center justify-center transition-all",
                            loadingToggleClass,
                        )}
                    >
                        {leftIcon}
                    </div>
                )}
                <span
                    className={twMerge(
                        "transition-all",
                        loadingToggleClass
                    )}
                >
                    {!isLoading && children}
                </span>
                {
                    rightIcon && (
                        <div
                            className={twMerge(
                                "inline-flex shrink-0 cursor-pointer items-center justify-center transition-all",
                                loadingToggleClass
                            )}
                        >
                            {rightIcon}
                        </div>
                    )
                }
            </button >
        );
    }
);

Button.displayName = "Button";