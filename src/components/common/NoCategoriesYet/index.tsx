import { IconExclamationCircle } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import FormCard from "../../layout/Container/FormCard";
import SectionHeader from "../../layout/SectionHeader";

type NoCategoriesYetProps = {
  count: number;
};

const NoCategoriesYet: FC<NoCategoriesYetProps> = ({ count }) => {
  return (
    count === 0 && (
      <FormCard color="warning">
        <SectionHeader color="warning" icon={IconExclamationCircle}>
          No categories yet.
        </SectionHeader>

        <span className="text-warning-700 dark:text-warning-300 text-xs">
          You can save your draft without specifying a category. But you will
          need set a category before sending it to review. You can create one{" "}
          <Link className="underline" to="/categories/create">
            here
          </Link>
          .
        </span>
      </FormCard>
    )
  );
};
export default NoCategoriesYet;
