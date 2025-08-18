import React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  handle: (formData: FormData) => Promise<void> | void;
  reset?: (form: HTMLFormElement) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ handle, reset, children, ...props }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Select all form elements that can be disabled
    const formElements = form.querySelectorAll(
      "input, select, textarea, button"
    ) as NodeListOf<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | HTMLButtonElement
    >;

    // Store initial disabled states and disable elements
    const initialStates = new Map<Element, boolean>();
    formElements.forEach((element) => {
      initialStates.set(element, element.disabled);
      element.disabled = true;
    });

    try {
      await handle(formData);
    } finally {
      // Re-enable elements based on their initial states
      formElements.forEach((element) => {
        const wasDisabled = initialStates.get(element) || false;
        element.disabled = wasDisabled;
      });
    }
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    form.reset();
    if (reset) {
      reset(form);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      {...props}
      onReset={handleReset}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
