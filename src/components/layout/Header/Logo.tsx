import { A } from "@solidjs/router";
import { Component } from "solid-js";

const Logo: Component<{}> = (props) => {
  return (
    <A href="/" class="flex items-center gap-2">
      <img src="/assets/bloggo.webp" width={48} height={48} alt="Bloggo" />

      <strong class="text-3xl leading-none">Bloggo</strong>
    </A>
  );
};

export default Logo;
