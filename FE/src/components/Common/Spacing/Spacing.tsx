import styled from "styled-components";

import theme from "@/styles/theme";
interface SpacingProps {
    height?: keyof typeof theme.spacing;
}

const Spacing = ({ height = "xs" }: SpacingProps) => {
    return <CustomSpacing $height={height} />;
};

export default Spacing;

const CustomSpacing = styled.div<{ $height: keyof typeof theme.spacing }>`
    height: ${({ $height }) => theme.spacing[$height]};
`;
