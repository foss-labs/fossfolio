import { Checkbox } from "@app/ui/components/checkbox";
import { Input } from "@app/ui/components/input";
import Multiselect from "multiselect-react-dropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select";
import { Textarea } from "@app/ui/components/textarea";
import { Iform } from "@app/types";
import { Label } from "@app/ui/components/label";
import { Truncate } from "@app/components/ui/Truncate";

interface Prop {
  fieldProperty: Iform;
}

export const RenderField = ({ fieldProperty }: Prop) => {
  return (
    <>
      <Truncate text={fieldProperty.label} size={40}>
        <Label className="mb-3 truncate">{fieldProperty.label}</Label>
      </Truncate>
      <div className="mt-3 mb-2">
        {fieldProperty.type === "Number" && (
          <Input
            type="number"
            placeholder={fieldProperty.placeholder}
            required={fieldProperty.require}
            name={fieldProperty.id}
          />
        )}
        {fieldProperty.type === "SingleLineText" && (
          <Input
            type="text"
            placeholder={fieldProperty.placeholder}
            required={fieldProperty.require}
            name={fieldProperty.id}
          />
        )}
        {fieldProperty.type === "Checkbox" && (
          <Checkbox required={fieldProperty.require} name={fieldProperty.id} />
        )}
        {fieldProperty.type === "Email" && (
          <Input
            placeholder={fieldProperty.placeholder}
            type="email"
            required={fieldProperty.require}
            name={fieldProperty.id}
          />
        )}
        {fieldProperty.type === "PhoneNumber" && (
          <Input
            placeholder={fieldProperty.placeholder}
            type="phoneNumber"
            required={fieldProperty.require}
            name={fieldProperty.id}
          />
        )}
        {fieldProperty.type === "URL" && (
          <Input
            placeholder={fieldProperty.placeholder}
            type="url"
            required={fieldProperty.require}
            name={fieldProperty.id}
          />
        )}
        {fieldProperty.type === "SingleSelect" && (
          <Select required={fieldProperty.require} name={fieldProperty.id}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={fieldProperty.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {fieldProperty.selectOptions?.map((option) => (
                <SelectItem value={option.option} key={option.option}>
                  {option.option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {fieldProperty.type === "MultiSelect" && (
          <>
            <Multiselect
              options={fieldProperty.selectOptions?.map((o) => ({
                name: o.option,
                id: o.option,
              }))}
              selectedValues={fieldProperty.options}
              onSelect={(e) => fieldProperty.options?.push(e)}
              onRemove={(e) =>
                fieldProperty.options?.splice(
                  fieldProperty.options?.indexOf(e),
                  1
                )
              }
              displayValue="name"
            />
          </>
        )}
        {fieldProperty.type === "LongText" && (
          <Textarea
            placeholder={fieldProperty.placeholder}
            required={fieldProperty.require}
            name={fieldProperty.id}
          />
        )}
      </div>
    </>
  );
};
