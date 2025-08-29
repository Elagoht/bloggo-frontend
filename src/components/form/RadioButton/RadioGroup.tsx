import { FC } from "react";
import RadioButton from ".";

type RadioGroupProps = {
  name: string;
  checked?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

const RadioGroup: FC<RadioGroupProps> = ({ name, checked, options }) => {
  return (
    <div className="flex flex-col gap-0.5">
      {options.map((option, index) => (
        <RadioButton
          key={option.value}
          defaultChecked={checked ? checked === option.value : index === 0}
          name={name}
          value={option.value}
          label={option.label}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
