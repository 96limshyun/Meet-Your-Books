import { Heading } from "@components/Common";
import styled, { keyframes } from "styled-components";
const SkeletonLoader = () => {
    return (
        <SkeletonContainer>
            <SkeletonHeader>
                <Heading fontWeight="bold" fontSize="lg">
                    키워드 필터
                </Heading>
            </SkeletonHeader>
            <SkeletonList>
                {Array.from({ length: 5 }).map((_, idx) => (
                    <SkeletonItem key={idx}>
                        <SkeletonLabel />
                    </SkeletonItem>
                ))}
            </SkeletonList>
        </SkeletonContainer>
    );
};

export default SkeletonLoader;

const skeletonAnimation = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
`;

const SkeletonContainer = styled.div`
    min-width: 240px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
`;

const SkeletonHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    font-weight: 400;
    font-size: 0.9rem;
`;

const SkeletonList = styled.ul`
    font-weight: 400;
    font-size: 0.9rem;
    overflow-y: auto;
    padding: 1rem;
`;

const SkeletonItem = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const SkeletonLabel = styled.div`
    height: 15px;
    flex-grow: 1;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: ${skeletonAnimation} 1.2s ease-in-out infinite;
`;
