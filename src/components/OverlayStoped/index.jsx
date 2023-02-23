import React from 'react';
import styled from 'styled-components';
import { BsHouseFill, BsFillPlayFill } from 'react-icons/bs';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 2.6rem;
    color: #fff;
    text-align: center;
`;

const Button = styled.button`
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
`;

export default function OverlayStoped({ onClickMenu, onClickRestart }) {
  return (
    <Wrapper>
      <Title>Poxa, você perdeu!</Title>
      <div className="mt-4 d-flex flex-row">
        <Button title="Voltar para o menu" className="mx-2" onClick={onClickMenu}><BsHouseFill size={36} color="#272935" /></Button>
        <Button title="Reiniciar jogo" className="mx-2" onClick={onClickRestart}><BsFillPlayFill size={48} color="#272935" /></Button>
      </div>
    </Wrapper>
  );
}
