import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 m-1.5">
      <img src="/assets/bloggo.webp" width={36} height={36} alt="Bloggo" />

      <strong className="text-2xl leading-none">Bloggo</strong>
    </Link>
  );
};

export default Logo;
