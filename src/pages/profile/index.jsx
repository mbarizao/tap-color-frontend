/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Container, Form,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FetchApi from '../../api';
import BackButton from '../../components/BackButton';
import { showAlert } from '../../events/events';
import Session from '../../session';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Get user data from session
  useEffect(() => {
    const fetchData = async () => {
      const { data: { data } } = await FetchApi.get('/user');

      setUser(data);

      setValue('username', data?.name);
    };

    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    const { status, data: { data, message } } = await FetchApi.put('/user', formData);

    if (status !== 200) {
      return showAlert('Atualizar perfil', message);
    }

    return showAlert('Atualizar perfil', data.message);
  };

  const logOut = () => {
    // Remove session
    Session.remove();

    // Redirect
    router.push('/login');
  };

  return (
    <div className="h-inherit d-flex justify-content-center">
      <Container className="d-flex flex-column justify-content-center align-items-center p-5">
        <Card className="cardWidth">
          <Card.Header className="d-flex flex-row align-items-center justify-content-center">
            <BackButton />
            <span className="title">Meu perfil</span>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Nome de usuário</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="João Silva"
                  {...register('username', {
                    required: {
                      value: true,
                      message: 'É necessário informar um nome de usuário',
                    },
                  })}
                />
                { errors.username && <span className="form-error">{errors.username.message}</span>}
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Endereço de email</Form.Label>
                <Form.Control
                  type="text"
                  value={user?.email || ''}
                  disabled
                />
              </Form.Group>
            </Form>
            <Button
              className="w-100 mt-3"
              variant="success"
              onClick={handleSubmit(onSubmit)}
            >
              Atualizar informações
            </Button>
            <Button
              className="w-100 mt-3"
              variant="outline-danger"
              onClick={logOut}
            >
              Desconectar
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
