import { Component } from "solid-js";

type PostStatCounterProps = {
  label: string;
  value: number;
};

const PostStatCounter: Component<PostStatCounterProps> = ({ label, value }) => {
  return (
    <fieldset class="bg-smoke-200 dark:bg-smoke-900 px-4 py-2 rounded-full text-center leading-snug">
      <legend class="bg-gopher-500 leading-snug px-2 mx-4 rounded-full">
        {label}
      </legend>

      {value}
    </fieldset>
  );
};

export default PostStatCounter;
