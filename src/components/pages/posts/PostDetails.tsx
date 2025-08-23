import { IconCalendar, IconCategory, IconEye } from "@tabler/icons-react";
import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

const PostDetails: FC<PostDetails> = (post) => {
  const data = [
    {
      icon: (
        <img
          width={20}
          height={20}
          className="rounded-full"
          src={import.meta.env.VITE_API_URL + post.author.avatar}
        />
      ),
      title: "Author",
      value: post.author.name,
      href: `/users/details/${post.author.id}`,
    },
    {
      icon: <IconCategory size={20} />,
      title: "Category",
      value: post.category.name,
      href: post.category.slug
        ? `/categories/details/${post.category.slug}`
        : undefined,
    },
    { icon: <IconEye size={20} />, title: "Views", value: post.readCount },
    {
      icon: <IconCalendar size={20} />,
      title: "Created At",
      value: post.createdAt,
    },
  ];

  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 flex max-lg:flex-col">
      <figure className="lg:w-56 max-lg:h-32 shrink-0 items-center justify-center flex bg-gradient-to-br from-gopher-400 to-gopher-600 lg:rounded-l-xl max-lg:rounded-t-xl overflow-clip">
        <img
          src={
            post.coverImage
              ? import.meta.env.VITE_API_URL + post.coverImage
              : "/assets/placeholder.webp"
          }
          alt="Post cover"
          className="object-cover w-full h-full"
        />
      </figure>

      <div className="flex flex-col grow p-4 gap-4">
        <hgroup>
          <h2 className="font-semibold text-smoke-900 dark:text-smoke-100 mb-1 line-clamp-1">
            {post.title || "Untitled Post"}
          </h2>
          <p className="text-sm text-smoke-600 dark:text-smoke-400 line-clamp-2">
            {post.spot || "No description available"}
          </p>
        </hgroup>

        <div className="flex gap-2 items-center flex-wrap">
          {data.map((datum, index) => {
            const content = (
              <div
                key={index}
                className={classNames(
                  "flex items-center py-2 px-3 gap-2 rounded-lg text-sm transition-colors duration-200",
                  {
                    "bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400":
                      !datum.href,
                    "bg-gopher-100 dark:bg-gopher-800 text-gopher-600 dark:text-gopher-400 hover:bg-gopher-200 dark:hover:bg-gopher-700":
                      datum.href,
                  }
                )}
              >
                {datum.icon}
                <div>
                  <div className="text-xs opacity-75">{datum.title}</div>
                  <div className="font-medium">{datum.value || "N/A"}</div>
                </div>
              </div>
            );
            if (datum.href)
              return (
                <Link key={index} to={datum.href}>
                  {content}
                </Link>
              );
            return content;
          })}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
