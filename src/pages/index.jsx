import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import {
  Button, Card, Container,
} from 'react-bootstrap';
import FetchApi from '../api';
import Assets from '../assets';
import { User } from '../components';
import { AuthContext } from '../contexts/AuthContext';
import { showAlert } from '../events/events';
import Session from '../session';

export default function GameMenu() {
  const router = useRouter();
  const { user, syncUserData } = useContext(AuthContext);

  // Update user data in context
  useEffect(() => {
    const fetchData = async () => {
      await syncUserData();
    };

    fetchData();
  }, []);

  const setNotFirstLogin = async () => {
    const { status } = await FetchApi.put('/user/', { isFirstLogin: false });

    if (status !== 200) {
      return showAlert('Erro interno', 'Houve um erro interno, tente novamente mais tarde');
    }

    return router.push('/play');
  };

  const onPlayGame = () => {
    if (user.isFirstLogin) {
      return showAlert('Instruções de jogo', `
        No topo da página, é exibido o nome de uma cor em inglês. Para jogar, clique no quadrado que corresponda à mesma cor. Se você selecionar a cor incorreta, perderá a partida, mas terá a chance de jogar novamente. Preste atenção ao tempo, pois, se ele chegar a zero, você também perderá a partida.
     `, async () => {
        await setNotFirstLogin();
      });
    }

    return router.push('/play');
  };

  const openGithubProject = () => window.open('https://github.com/mbarizao/tap-color-frontend', '_blank');

  return (
    <div className="h-inherit d-flex justify-content-center">
      <Container className="d-flex flex-column justify-content-center align-items-center p-5">
        <Card className="cardWidth">
          <Card.Header className="d-flex flex-row align-items-center">
            <User
              className="cursor-pointer"
              title="Meu perfil"
              username={user?.name}
              score={user?.score}
              onClick={() => router.push('/profile')}
            />
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-center mb-4">
              <Image alt="logo" src={Assets.Logo} width={330} priority />
            </Card.Title>
            <Button
              className="w-100"
              variant="primary"
              onClick={onPlayGame}
            >
              JOGAR
            </Button>
            <Button
              className="w-100 mt-2"
              variant="warning"
              onClick={() => router.push('/ranking')}
            >
              RANKING
            </Button>
            <Button
              className="w-100 mt-2"
              variant="outline-dark"
              onClick={openGithubProject}
            >
              GITHUB
            </Button>
          </Card.Body>
          <Card.Footer className="text-center">
            <span>
              By
              {' '}
              <a href="https://marllonbarizao.com" target="_blank" rel="noreferrer">Marllon Barizão</a>
            </span>
            <br />
            <span>2023</span>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

export const getServerSideProps = (context) => {
  const session = Session.decryptSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
