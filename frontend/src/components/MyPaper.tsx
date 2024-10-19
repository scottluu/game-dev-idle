import React from "react";
import { Paper } from "@mui/material";

type MyPaperProps = {
  children: React.ReactNode;
};

const MyPaper = (props: MyPaperProps) => {
  return (
    <Paper elevation={3} style={{ margin: "1rem", padding: "1rem" }}>
      {props.children}
    </Paper>
  );
};

export default MyPaper;
