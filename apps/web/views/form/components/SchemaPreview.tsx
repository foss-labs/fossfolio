import { Button } from '@app/components/ui/Button';
import { Iform } from '@app/hooks/api/Events/useFormSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@app/ui/components/card';
import { Checkbox } from '@app/ui/components/checkbox';
import { Input } from '@app/ui/components/input';
import { Label } from '@app/ui/components/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@app/ui/components/select';
import { Textarea } from '@app/ui/components/textarea';

type Prop = {
    data: Iform[];
};

export const SchemaPreview = ({ data }: Prop) => {
    return (
        <Card className="mt-10 w-[300px]">
            <CardHeader>
                <CardTitle>Please fill The form</CardTitle>
            </CardHeader>
            <CardContent>
                {data.map((el) => (
                    <div key={el.id}>
                        <Label>{el.label}</Label>
                        <div className="mt-3 mb-2">
                            {el.type === 'SingleLineText' && <Input placeholder={el.placeholder} />}
                            {el.type === 'Checkbox' && <Checkbox placeholder={el.placeholder} />}
                            {el.type === 'Email' && (
                                <Input placeholder={el.placeholder} type="email" />
                            )}
                            {el.type === 'SingleSelect' && (
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={el.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                            {el.type === 'LongText' && <Textarea placeholder={el.placeholder} />}
                        </div>
                    </div>
                ))}
                <Button type="submit" className="mt-5 w-full">
                    submit
                </Button>
            </CardContent>
        </Card>
    );
};
