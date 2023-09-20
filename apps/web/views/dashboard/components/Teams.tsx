import { Card, CardContent, CardHeader, CardTitle } from '@app/ui/components/card';

export const Teams = () => {
    return (
        <div className="flex justify-between space-x-1 ">
            <Card className="w-[320px] h-[280px] bg-brand-pink-100 hover:cursor-pointer hover:outline-double hover:outline-[#7F56D9]">
                <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0 ">
                    <div className="space-y-0">
                        <div className="text-xs  ">TEAM</div>
                        <CardTitle className="font-semibold text-sm">Team 6970</CardTitle>
                    </div>
                </CardHeader>{' '}
                <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg?w=2000"
                            alt="Member 1"
                            className=" object-cover w-8 h-8 rounded-full"
                        />
                        <div>
                            <div className="font-semibold text-sm">Surya</div>
                            <div className="text-xs text-muted-foreground">surya@email.com</div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <img
                            src="https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg?w=2000"
                            alt="Member 2"
                            className="object-cover w-8 h-8 rounded-full"
                        />
                        <div>
                            <div className="font-semibold text-sm">Surya</div>
                            <div className="text-xs text-muted-foreground">surya@email.com</div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <img
                            src="https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg?w=2000"
                            alt="Member 3"
                            className=" object-cover w-8 h-8 rounded-full"
                        />
                        <div>
                            <div className="font-semibold text-sm">Surya</div>
                            <div className="text-xs text-muted-foreground">surya@email.com</div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 ">
                        <img
                            src="https://img.freepik.com/free-photo/beautiful-woman-street_23-2147654273.jpg?w=2000"
                            alt="Member 4"
                            className="object-cover w-8 h-8 rounded-full"
                        />
                        <div>
                            <div className="font-semibold text-sm">Surya</div>
                            <div className="text-xs text-muted-foreground">surya@email.com</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
