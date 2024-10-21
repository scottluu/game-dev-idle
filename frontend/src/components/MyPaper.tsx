import React, { CSSProperties } from "react";
import { Sheet } from "@mui/joy";

type MyPaperProps = {
  children: React.ReactNode;
  style?: CSSProperties | undefined;
};

const MyPaper = (props: MyPaperProps) => {
  return (
    <Sheet style={{ padding: "1rem", ...props.style }}>{props.children}</Sheet>
  );
};

export default MyPaper;
