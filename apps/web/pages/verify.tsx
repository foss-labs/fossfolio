import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { HomeLayout } from '@app/layout';
import { apiHandler } from '@app/config';

type Prop = {
    ok: boolean;
    orgId: string;
};

const Verify = ({ orgId }: Prop) => {

    useEffect(() => {
        const verify = async () => {
            const { data } = await apiHandler.get(`/org/invite/verify?id=${orgId}`);
            console.log(data);
        };
        verify();
    }, [orgId]);


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
