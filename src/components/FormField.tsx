import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "file";
  desc?: string;
}

const FormField = <T extends FieldValues>({ control, name, label, placeholder, desc, type = "text" }: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input className="input" placeholder={placeholder} type={type} {...field} />
        </FormControl>
        {desc &&
          <FormDescription>
            {desc}
          </FormDescription>
        }
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField;