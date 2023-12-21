import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { HomeLayout } from '@app/layout';
import { apiHandler } from '@app/config';

type Prop = {
    ok: boolean;
    orgId: string;
};

const Verify = ({ orgId }: Prop) => {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push(`/org/${orgId}`);
            // redirect back to org page after 2.5 seconds
        }, 2500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="flex justify-center items-center flex-col h-[90vh] p-7">
            <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                EMAIL VERIFICATION SUCCESFULL
            </h1>
        </div>
    );
};

// used to verify the email for org
export async function getServerSideProps(ctx: any) {
    const accesToken = ctx.req.cookies['access_token'];
    const refreshToken = ctx.req.cookies['refresh_token'];

    if (!accesToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const { data } = await apiHandler.get(`/org/invite/verify?id=${ctx.query.id}`, {
        headers: {
            Cookie: `access_token=${accesToken}; refresh_token=${refreshToken};`,
        },
    });

    if (!data.ok) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            ok: true,
            orgId: data.data.id,
        },
    };
}

Verify.Layout = HomeLayout;
Verify.RequireAuth = true;

export default Verify;
