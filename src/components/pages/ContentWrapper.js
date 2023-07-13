import React from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../Sidebar";
import { Navbar } from "../Navbar";
import "./styles.css";

export const ContentWrapper = (props) => {
  const { children } = props;
  return (
    <Box>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2.5,
            mt: 8,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
