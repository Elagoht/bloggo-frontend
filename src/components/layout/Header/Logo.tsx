import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src="/assets/bloggo.webp" width={48} height={48} alt="Bloggo" />

      <strong className="text-3xl leading-none">Bloggo</strong>
    </Link>
  );
};

export default Logo;
