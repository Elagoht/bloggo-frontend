import { Component, For } from "solid-js";
import RadioButton from ".";

type RadioGroupProps = {
  name: string;
  checked?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

const RadioGroup: Component<RadioGroupProps> = ({ name, checked, options }) => {
  return (
    <For each={options}>
      {(option, index) => (
        <RadioButton
          checked={checked ? checked === option.value : index() === 0}
          name={name}
          value={option.value}
          label={option.label}
        />
      )}
    </For>
  );
};

export default RadioGroup;
