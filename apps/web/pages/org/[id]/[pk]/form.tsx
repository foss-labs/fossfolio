import { NextPageWithLayout } from 'next';
import { DashboardLayout } from '@app/layout';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Button } from '@app/components/ui/Button';
import { Input } from '@app/ui/components/input';

const Form: NextPageWithLayout = () => {
    return (
        <div className="pt-5">
            <h3 className="text-3xl font-semibold mt-4 p-5">Form Builder</h3>
            <div className="flex justify-center  h-screen bg-[#EFEBF7] p-5">
                <div className="w-[650px] gap-3 flex flex-col">
                    <div className="h-20 border-2 border-gray-400 p-5  rounded-md flex">
                        <Input defaultValue="Untitled form" />
                    </div>
                    <Button
                        className="gap-2"
                        rightIcon={<IoIosAddCircleOutline className="h-4 w-4 " />}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
};

Form.Layout = DashboardLayout;
Form.RequireAuth = true;
export default Form;
