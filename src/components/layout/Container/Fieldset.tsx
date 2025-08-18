import React from "react";

interface FieldsetProps {
  legend: string;
  children: React.ReactNode;
}

const Fieldset: React.FC<FieldsetProps> = ({ legend, children }) => {
  return (
    <fieldset className="border-2 border-smoke-200 dark:border-smoke-800 rounded-md p-2">
      <legend className="bg-smoke-300 dark:bg-smoke-700 rounded-md px-2 leading-normal">
        {legend}
      </legend>

      {children}
    </fieldset>
  );
};

export default Fieldset;
