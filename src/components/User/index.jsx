import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Assets from '../../assets';

const Wrapper = styled.div`
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: default;
`;

const View = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

const Scores = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export default function User({
  username, score, onClick = null, ...props
}) {
  return (
    <Wrapper {...props}>
      <View onClick={onClick}>
        <Name>{username || 'Usuário'}</Name>
      </View>
      <View style={{ width: 80 }}>
        <Image className="mx-1" alt="Trophy" src={Assets.Trophy} width={30} height={30} />
        <Scores title="Minha pontuação">{score || 0}</Scores>
      </View>
    </Wrapper>
  );
}
