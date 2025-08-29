import { FC } from "react";
import Checkbox from ".";

type CheckboxGroupProps = {
  name?: string;
  values?: string[];
  onChange?: (values: string[]) => void;
  options: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
};

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  name,
  values = [],
  onChange,
  options,
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (!onChange) return;

    if (checked) {
      onChange([...values, optionValue]);
    } else {
      onChange(values.filter((value) => value !== optionValue));
    }
  };

  return options.map((option) => (
    <Checkbox
      key={option.value}
      name={name}
      checked={values.includes(option.value)}
      onChange={(e) => handleChange(option.value, e.target.checked)}
      label={option.label}
      disabled={option.disabled}
    />
  ));
};

export default CheckboxGroup;
