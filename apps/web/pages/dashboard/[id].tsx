import React from 'react';
import { DashLayout } from '@app/layout';
import { NextPageWithLayout } from '../_app';

const Page: NextPageWithLayout = () => <div>sdfbdhjs</div>;

Page.getLayout = (page) => <DashLayout>{page}</DashLayout>;

export default Page;
