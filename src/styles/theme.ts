export const theme = {
    fontSize: {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "md": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
    },
    fontWeight: {
        thin: "300",
        normal: "400",
        medium: "500",
        bold: "700",
        extraBold: "800",
    },
    lineHeight: {
        "normal": "normal",
        "xs": "1",
        "sm": "1.25",
        "md": "1.5",
        "lg": "1.75",
        "xl": "2",
    },
    fontColor: {
        black: "#000000",
        darkGray: "#333333",
        gray: "#666666",
        lightGray: "#CCCCCC",
        white: "#FFFFFF",
    },
    colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
        success: "#28A745",
        warning: "#FFC107",
        danger: "#DC3545",
        info: "#17A2B8",
        light: "#F8F9FA",
        dark: "#343A40",
        white: "#FFFFFF",
        black: "#000000",
        lightGray: "#EFEFEF"
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
