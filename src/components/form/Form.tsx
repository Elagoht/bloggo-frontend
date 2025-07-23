import { JSX, ParentComponent } from "solid-js";

interface FormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {
  handle: (formData: FormData) => Promise<void>;
}

const Form: ParentComponent<FormProps> = ({ handle, ...props }) => {
  const handleSubmit = async (event: SubmitEvent) => {
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

  return (
    <form class="flex flex-col gap-4" {...props} onsubmit={handleSubmit}>
      {props.children}
    </form>
  );
};

export default Form;
