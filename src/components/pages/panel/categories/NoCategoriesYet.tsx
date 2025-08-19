import { Link } from "react-router-dom";
import { IconCategory, IconPlus } from "@tabler/icons-react";
import React from "react";
import Button from "../../../form/Button";

const NoCategoriesYet: React.FC = () => {
  return (
    <div className="bg-white dark:bg-smoke-950 rounded-lg border border-smoke-200 dark:border-smoke-800 p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-smoke-100 dark:bg-smoke-900 text-smoke-500 dark:text-smoke-400 rounded-full">
          <IconCategory size={32} />
        </div>

        <div className="flex flex-col">
          <h3 className="font-semibold text-smoke-900 dark:text-smoke-100">
            No categories yet
          </h3>
          <p className="text-smoke-600 dark:text-smoke-400 text-sm">
            Create your first category to organize your blog posts
          </p>
        </div>

        <Button href="/categories/create" iconRight={IconPlus} color="success">
          Create Category
        </Button>
      </div>
    </div>
  );
};

export default NoCategoriesYet;
