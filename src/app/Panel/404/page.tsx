import { IconHome, IconSearch } from "@tabler/icons-react";
import React from "react";
import Button from "../../../components/form/Button";
import H1 from "../../../components/typography/H1";

const NotFoundPage: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] w-full">
      <div className="flex flex-col text-center items-center gap-6 max-w-md mx-auto">
        {/* Icon */}
        <div className="p-4 bg-smoke-100 dark:bg-smoke-900 text-smoke-500 dark:text-smoke-400 rounded-full">
          <IconSearch size={32} />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <H1>Page Not Found</H1>
          <p className="text-smoke-600 dark:text-smoke-400">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button href="/" color="primary" iconLeft={IconHome}>
            Go to Dashboard
          </Button>

          <Button
            onClick={() => window.history.back()}
            variant="outline"
            color="primary"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
