import { ParentComponent } from "solid-js";

type FormSectionProps = {
  legend: string;
};

const FormSection: ParentComponent<FormSectionProps> = ({
  legend,
  children,
}) => {
  return (
    <fieldset class="bg-smoke-50 dark:bg-smoke-950 rounded-lg p-4">
      <legend class="leading-normal text-smoke-500 text-sm font-semibold">
        {legend}
      </legend>

      <section class="flex flex-col gap-4">{children}</section>
    </fieldset>
  );
};

export default FormSection;
