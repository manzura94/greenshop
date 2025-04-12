"use client";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setPage } from "@/redux/paginationSlice";

export default function Paginations() {
  const dispatch = useAppDispatch();
  const totalPage = useAppSelector((state) => state.pagination.totalPages);
  const page = useAppSelector((state) => state.pagination.currentPage);
  console.log(page);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    dispatch(setPage(value));
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
        count={totalPage}
        page={page}
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
