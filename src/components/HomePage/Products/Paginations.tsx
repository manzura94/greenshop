"use client";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setCurrentPage } from "@/redux/uiSlice";

export default function Paginations() {
  const dispatch = useAppDispatch();
  const { totalPages, currentPage } = useAppSelector((state) => state.ui);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    dispatch(setCurrentPage(value));
  };
  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        paddingTop: "40px",
      }}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            "&.Mui-selected": {
              backgroundColor: "#46A358",
              color: "white",
              "&:hover": {
                backgroundColor: "#46A358",
              },
            },
          },
        }}
      />
    </Stack>
  );
}
