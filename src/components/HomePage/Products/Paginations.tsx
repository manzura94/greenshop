import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Paginations() {
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
        count={4}
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
