import styled, { keyframes } from "styled-components";

const rotate = keyframes`
from{
    transform: rotate(0deg);

}
to{
    transform: rotate(360deg);
}
`;

export const LoadingDiv = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.3);

    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
        width: 80px;
        height: 80px;
        content: " ";
        margin: 8px;
        border: 6px solid white;
        border-radius: 50%;
        border-color: white transparent white transparent;
        animation: ${rotate} 1.2s linear infinite;
}
`;
