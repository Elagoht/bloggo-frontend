import React from "react";
import RadioButton from ".";

type RadioGroupProps = {
  name: string;
  checked?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ name, checked, options }) => {
  return (
    <div className="flex flex-col gap-2">
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
