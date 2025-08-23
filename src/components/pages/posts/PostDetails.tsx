import { IconCalendar, IconCategory, IconEye } from "@tabler/icons-react";
import classNames from "classnames";
import React, { FC } from "react";
import { Link } from "react-router-dom";

const PostDetails: FC<PostDetails> = (post) => {
  const data = [
    {
      icon: (
        <img
          width={24}
          height={24}
          className="rounded-full"
          src={import.meta.env.VITE_API_URL + post.author.avatar}
        />
      ),
      title: "Author",
      value: post.author.name,
      href: `/users/details/${post.author.id}`,
    },
    {
      icon: <IconCategory />,
      title: "Category",
      value: post.category.name,
      href: `/cartegories/details/${post.category.id}`,
    },
    { icon: <IconEye />, title: "Views", value: post.readCount },
    {
      icon: <IconCalendar />,
      title: "Created At",
      value: post.createdAt,
    },
  ];

  return (
    <section className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 flex max-lg:flex-col">
      <figure className="lg:w-56 max-lg:max-h-32 shrink-0 items-center justify-center flex bg-gopher-500 lg:rounded-l-xl max-lg:rounded-t-xl overflow-clip">
        <img
          src={
            post.coverImage
              ? import.meta.env.VITE_API_URL + post.coverImage
              : "/assets/placeholder.webp"
          }
          alt={"Post cover"}
          className="object-cover w-full h-full"
        />
      </figure>

      <div className="flex flex-col grow">
        <p className="bg-smoke-100 dark:bg-smoke-900 text-sm py-2 px-4 lg:rounded-tr-xl">
          {post.spot || "No Spot Text Yet"}
        </p>

        <ul className="flex gap-2 p-2 items-center flex-wrap">
          {data.map((datum, index) => {
            const content = (
              <li
                key={index}
                className={classNames(
                  "flex items-center py-1 pr-2 pl-3 gap-3 leading-snug rounded-md border",
                  {
                    "bg-smoke-200 dark:bg-smoke-800 border-smoke-300 dark:border-smoke-600":
                      !datum.href,
                    "bg-gopher-200 dark:bg-gopher-800 border-gopher-300 dark:border-gopher-600":
                      datum.href,
                  }
                )}
              >
                {datum.icon}

                <dl>
                  <dt
                    className={classNames("text-xs", {
                      "text-smoke-500": !datum.href,
                      "text-gopher-500": datum.href,
                    })}
                  >
                    {datum.title}
                  </dt>

                  <dd className="text-sm">{datum.value}</dd>
                </dl>
              </li>
            );
            if (datum.href) return <Link to={datum.href}>{content}</Link>;
            return content;
          })}
        </ul>
      </div>
    </section>
  );
};

export default PostDetails;
