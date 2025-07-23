import { ParentComponent } from "solid-js";

const ContentWithSidebar: ParentComponent = ({ children }) => {
  return (
    <div class="flex max-md:flex-col-reverse justify-center w-full mx-auto gap-4">
      {children}
    </div>
  );
};

export default ContentWithSidebar;
