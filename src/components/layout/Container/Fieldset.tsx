import { ParentComponent } from "solid-js";

type FieldsetProps = {
  legend: string;
};

const Fieldset: ParentComponent<FieldsetProps> = ({ legend, children }) => {
  return (
    <fieldset class="border-2 border-smoke-200 dark:border-smoke-800 rounded-md p-2">
      <legend class="bg-smoke-300 dark:bg-smoke-700 rounded-md px-2 leading-normal">
        {legend}
      </legend>

      {children}
    </fieldset>
  );
};

export default Fieldset;
