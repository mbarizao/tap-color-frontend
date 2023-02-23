import React, { useContext } from 'react';
import {
  Container,
  Card,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Validator from '../../utils/validator';
import Assets from '../../assets';
import { AuthContext } from '../../contexts/AuthContext';

export default function Register() {
  const { signUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    await signUp(formData);
  };

  return (
    <div className="h-inherit d-flex justify-content-center">
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <Card className="cardWidth">
          <Card.Body>
            <Card.Title className="text-center mb-4">
              <Image className="logo" alt="logo" src={Assets.Logo} priority />
            </Card.Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label>Nome de usuário</Form.Label>
                <FormControl
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
                <FormControl
                  type="email"
                  placeholder="exemplo@dominio.com"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'É necessário informar um email',
                    },
                    validate: (string) => {
                      if (!Validator.isEmail(string)) {
                        return 'Insira um endereço de email válido';
                      }
                      return true;
                    },
                  })}
                />
                { errors.email && <span className="form-error">{errors.email.message}</span>}
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Senha</Form.Label>
                <FormControl
                  type="password"
                  placeholder="Sua senha aqui.."
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'É necessário informar uma senha',
                    },
                  })}
                />
                { errors.password && <span className="form-error">{errors.password.message}</span>}
              </Form.Group>
              <Button className="mt-3 w-100" variant="primary" type="submit">
                CRIAR CONTA
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center">
            <Link href="/login">
              <Button
                className="w-100"
                variant="link"
              >
                Já possui conta? Faça login
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}
