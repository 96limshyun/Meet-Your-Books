export const theme = {
    fontSize: {
        "0.5": "0.8rem",
        "1": "1rem",
        "2": "1.5rem",
        "3": "2rem",
        "4": "2.5rem",
    },
    fontWeight: {
        normal: "400",
        medium: "500",
        bold: "700",
    },
    lineHeight: {
        "1": "1.2",
        "2": "1.5",
        "3": "1.8",
    },
    fontColor: {
        black: "#000000",
        lightGray: "#D3D3D3",
        white: "#ffffff",
    },
    colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
        red: "#FF0000",
        gray: "#6C757D",
        lightGray: "#E0E0E0",
        white: "#FFFFFF",
        black: "#000000",
    },
    spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
    },
} as const;

export default theme;
