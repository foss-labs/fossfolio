import Image from 'next/image';
import { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import { HomeLayout } from '@app/layout';
import { Button } from '@app/ui/components/button';

const Error: NextPageWithLayout = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center gap-4 min-h-[90vh] p-20 md:p-[30px] lg:p-[75px] justify-center">
            <Image src="/404.svg" height="400" width="300" alt="A 404 IMAGE" />
            <h1 className="text-center font-bold text-brand-purple-200 text-2xl">
                Looks Like You&apos;re Lost
            </h1>
            <Button
                variant="outline"
                className="text-brand-purple-200"
                onClick={() => router.push('/')}
            >
                Go Back Home
            </Button>
        </div>
    );
};

Error.Layout = HomeLayout;
Error.RequireAuth = false;
export default Error;
