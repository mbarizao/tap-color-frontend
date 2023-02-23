import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  Card, Container, Spinner,
} from 'react-bootstrap';
import FetchApi from '../../api';
import Assets from '../../assets';
import { BackButton, User } from '../../components';
import Session from '../../session';

export default function Ranking() {
  const [ranking, setRanking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { data } } = await FetchApi.get('/ranking');

      setRanking(data);
    };

    fetchData();
  }, []);

  return (
    <div className="h-inherit d-flex justify-content-center">
      <Container className="d-flex flex-column justify-content-center align-items-center p-5">
        <Card className="cardWidth">
          <Card.Header className="d-flex justify-content-center align-items-center">
            <BackButton />
            <Image alt="Trophy" src={Assets.Trophy} width={48} height={48} />
            <span className="mx-2 title">Ranking</span>
          </Card.Header>
          <Card.Body className="list">
            <div className="box">
              {
                ranking ? ranking.map((item, index) => (
                  <div key={item.id} className="d-flex flex-row align-items-center w-100">
                    <span style={{ width: 40 }}>{`${index + 1}.`}</span>
                    <User
                      username={item.name}
                      score={item.score}
                    />
                  </div>
                )) : <Spinner size="lg" color="#272935" />
              }
            </div>
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
