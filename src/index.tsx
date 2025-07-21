import "./index.css";

import { render } from "solid-js/web";

import { Router } from "@solidjs/router";
import { routes } from "./routes";

render(() => <Router>{routes}</Router>, document.querySelector("body"));
