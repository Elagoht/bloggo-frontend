import { FC } from "react";
import { Link } from "react-router-dom";

const Logo: FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 m-1.5 shrink-0">
      <img src="/assets/bloggo.webp" width={36} height={36} alt="Bloggo" />

      <strong className="text-2xl leading-none hidden md:block">Bloggo</strong>
    </Link>
  );
};

export default Logo;
