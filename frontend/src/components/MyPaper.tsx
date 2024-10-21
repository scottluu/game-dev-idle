import React from "react";
import { Sheet } from "@mui/joy";

type MyPaperProps = {
  children: React.ReactNode;
};

const MyPaper = (props: MyPaperProps) => {
  return (
    <Sheet style={{ margin: "1rem", padding: "1rem" }}>{props.children}</Sheet>
  );
};

export default MyPaper;
