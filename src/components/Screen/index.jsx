import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import emitter from '../../events';

export default function Screen({ children }) {
  const [alert, setAlert] = useState({
    visible: false,
    title: null,
    message: null,
    onClick: null,
  });

  const handleClose = () => setAlert(false);

  useEffect(() => {
    emitter.addListener('alert', setAlert);
  }, []);

  return (
    <div className="h-inherit">
      {alert.visible && (
      <Modal
        centered
        show={alert}
        size="md"
        onHide={() => {
          if (alert.onClick) {
            alert.onClick();
          }
          handleClose();
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{alert.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert.message}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              if (alert.onClick) {
                alert.onClick();
              }
              handleClose();
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      )}
      <Head>
        <title>TapColor</title>
        <meta
          name="description"
          content="Jogue TapColor, um jogo que desafia a sua agilidade e habilidade mental. Compita com os jogadores de todo o mundo e suba no ranking de maior pontuação. Disponível com código aberto."
        />
      </Head>
      {children}
    </div>
  );
}
