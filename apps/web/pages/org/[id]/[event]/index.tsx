import { NextPageWithLayout } from 'next';
import { DashboardLayout } from "@app/layout";
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@app/ui/components/table';
import { AiOutlineDelete } from 'react-icons/ai'; 
import{ FiEdit2 }from 'react-icons/fi';
export const Members = () => {
    return (
        <div className="p-none md:p-[64px]"style={{ width: '158%' }}>
            <Table className="border-[1px] border-[#E9D7FE] rounded-full">
                <TableHeader className="bg-[#F9FAFB] rounded-lg">
                <TableRow style={{ background: 'white', height: '67px' }}>
                        <TableCell className="font-medium">
                            Participants
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Student / Pro</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email address</TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">
                        <h5>sreehari jayaraj</h5>
                        </TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell>
                        9745644798
                        </TableCell>
                        <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                        <TableCell className="text-right">
                            <AiOutlineDelete className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                        <TableCell className="text-right">
                           <FiEdit2 className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">
                            <h5>sreehari jayaraj</h5>
                        </TableCell>
                        <TableCell>Pro</TableCell>
                        <TableCell>
                        9745644798  
                        </TableCell>
                        <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                        <TableCell className="text-right">
                            <AiOutlineDelete className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                        <TableCell className="text-right">
                           <FiEdit2 className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">
                            <h5>sreehari jayaraj</h5>
                        </TableCell>
                        <TableCell>student</TableCell>
                        <TableCell>
                        9745644798
                        </TableCell>
                        <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                        <TableCell className="text-right">
                            <AiOutlineDelete className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                        <TableCell className="text-right">
                           <FiEdit2 className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">
                            <h5>sreehari jayaraj</h5>
                        </TableCell>
                        <TableCell>Pro</TableCell>
                        <TableCell>
                        9745644798
                        </TableCell>
                        <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                        <TableCell className="text-right">
                            <AiOutlineDelete className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                        <TableCell className="text-right">
                           <FiEdit2 className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">
                        <h5>sreehari jayaraj</h5>
                        </TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell>
                        9745644798
                        </TableCell>
                        <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                        <TableCell className="text-right">
                            <AiOutlineDelete className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                        <TableCell className="text-right">
                           <FiEdit2 className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">
                            <h5>sreehari jayaraj</h5>
                        </TableCell>
                        <TableCell>Pro</TableCell>
                        <TableCell>
                        9745644798  
                        </TableCell>
                        <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                        <TableCell className="text-right">
                            <AiOutlineDelete className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                        <TableCell className="text-right">
                           <FiEdit2 className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">
                            <h5>sreehari jayaraj</h5>
                        </TableCell>
                        <TableCell>Pro</TableCell>
                        <TableCell>
                        9745644798  
                        </TableCell>
                        <TableCell>sreeharivijaya2003@gmail.com</TableCell>
                        <TableCell className="text-right">
                            <AiOutlineDelete className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                        <TableCell className="text-right">
                           <FiEdit2 className="hover:text-[red] cursor-pointer text-lg" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            
               <TableRow>
                  <TableCell>

                  </TableCell>
               </TableRow>
            
        </div>
    );
};

const Dashboard: NextPageWithLayout = () => {
    return (
        <div>
            <Members/>
        </div>
        
    );
};

Dashboard.Layout = DashboardLayout;
Dashboard.RequireAuth = true;
export default Dashboard;