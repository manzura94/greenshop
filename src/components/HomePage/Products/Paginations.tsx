// import React from 'react';
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Paginations() {
  return (
    <Pagination
      count={10}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            color: "#46A358",
            "&.Mui-selected": {
              backgroundColor: "#46A358",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#3d8b40",
              },
            },
            "&:hover": {
              backgroundColor: "rgba(70, 163, 88, 0.1)",
            },
          }}
          slots={{
            previous: ChevronLeft,
            next: ChevronRight,
          }}
        />
      )}
    />
  );
}
