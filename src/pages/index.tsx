import type { ReactNode } from "react";
import { Redirect } from "@docusaurus/router";

export default function Home(): ReactNode {
  // go straight to the guide instead of home page
  return <Redirect to="code-editor-setup" />;
}
