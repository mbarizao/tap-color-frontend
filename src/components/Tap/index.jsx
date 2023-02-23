import styled from 'styled-components';

export default styled.button`
    width: 10rem;
    height: 10rem;
    border: none;
    border-radius: 2px;
    background-color: ${({ color }) => color};
    margin: 5px;

    @media (max-width: 375px) {
        width: 8rem;
        height: 8rem;
    }
`;
