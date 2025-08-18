import { Link } from "react-router-dom";
import React from "react";

const NoCategoriesYet: React.FC = () => {
  return (
    <p className="bg-smoke-100 dark:bg-smoke-900 rounded-lg p-8 text-center text-smoke-800 dark:text-smoke-200 my-12">
      There's no category yet.{" "}
      <Link
        className="text-gopher-500 hover:text-gopher-400 underline underline-offset-2 hover:underline-offset-4 transition-all"
        to="/categories/create"
      >
        Let's create one!
      </Link>
    </p>
  );
};

export default NoCategoriesYet;
