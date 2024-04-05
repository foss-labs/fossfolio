import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { HomeLayout } from '@app/layout';
import { apiHandler } from '@app/config';
import { QueryClient } from '@tanstack/react-query';

type Prop = {
    ok: boolean;
    orgId: string;
};

const Verify = ({ orgId }: Prop) => {
    const router = useRouter();

    const queryClient = new QueryClient();
    useEffect(() => {
        const verify = async () => {
            try {
                await apiHandler.get(`/org/invite/verify?id=${orgId}`);
                queryClient.invalidateQueries({
                    queryKey: ['orgs'],
                });
                router.push(`/org`);
            } catch {
                router.push('/events?invite_failed=true');
            }
        };
        verify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex justify-center items-center flex-col h-[90vh] p-7">
            <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Verifying your email
            </h1>
        </div>
    );
};

// used to verify the email for org
export async function getServerSideProps(ctx: any) {
    return {
        props: {
            ok: true,
            orgId: ctx.query.id,
        },
    };
}

Verify.Layout = HomeLayout;
Verify.RequireAuth = true;

export default Verify;
