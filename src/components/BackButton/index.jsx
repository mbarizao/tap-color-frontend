import React from 'react';
import styled from 'styled-components';
import { BsArrowLeftSquare } from 'react-icons/bs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 1rem;
  cursor: pointer;
`;

export default function BackButton() {
  return (
    <Wrapper>
      <BsArrowLeftSquare
        size={30}
        onClick={() => window.history.back()}
        title="Voltar"
      />
    </Wrapper>
  );
}
