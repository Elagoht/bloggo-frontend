import React from "react";

type PostStatCounterProps = {
  label: string;
  value: number;
};

const PostStatCounter: React.FC<PostStatCounterProps> = ({ label, value }) => {
  return (
    <fieldset className="bg-smoke-200 dark:bg-smoke-900 px-4 py-2 rounded-full text-center leading-snug">
      <legend className="bg-gopher-500 leading-snug px-2 mx-4 rounded-full">
        {label}
      </legend>

      {value}
    </fieldset>
  );
};

export default PostStatCounter;
