import { useActiveButton } from "@/hooks/useActiveButton";
import { Button, Box } from "@mui/material";

const links = ["Home", "Shop", "Plant Care", "Blogs"];

export const NavLinks = () => {
  const { activeRouter, handleClick } = useActiveButton();
  return (
    <Box
      sx={{
        display: "flex",
        gap: "50px",
        "@media (max-width: 870px)": { display: "none" },
      }}
    >
      {links.map((button) => (
        <Button
          key={button}
          color="inherit"
          onClick={() => handleClick(button)}
          disableRipple
          disableFocusRipple
          sx={{
            position: "relative",
            padding: "16px 10px",
            // minWidth: '80px',
            hover: "none",
            fontWeight: activeRouter === button ? "600" : "400",
            transition: "font-weight 0.3s ease, color 0.3s ease",
            textTransform: "capitalize",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-3px",
              left: 0,
              right: 0,
              height: "3px",
              backgroundColor:
                activeRouter === button ? "#46A358" : "transparent",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              transform: activeRouter === button ? "scaleX(1)" : "scaleX(0)",
            },
          }}
        >
          {button}
        </Button>
      ))}
    </Box>
  );
};
