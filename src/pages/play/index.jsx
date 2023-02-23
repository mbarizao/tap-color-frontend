/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
import React, { useContext, useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { OverlayStoped, Tap, User } from '../../components';
import colorList from '../../common/colorList';
import { axiosConnection } from '../../api';
import Session from '../../session';
import { AuthContext } from '../../contexts/AuthContext';

function Play() {
  const router = useRouter();

  const { user, syncUserData } = useContext(AuthContext);

  const [currentScore, setCurrentScore] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);
  const [gameStoped, setGameStoped] = useState(false);
  const [defaultTime, setDefaultTime] = useState(5);
  const [timer, setTimer] = useState(defaultTime);
  const [defaultColors] = useState(colorList);
  const [colors, setColors] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('linear-gradient(to right bottom, #3005ff, #007cff, #00abff, #00cfe0, #12ebb2)');
  const [identifyer, setIdentifyer] = useState({
    id: '',
    value: '',
    color: '',
  });
  const [tapColors, setTapColors] = useState({
    color1: '',
    color2: '',
    color3: '',
    color4: '',
  });

  const getColorForTaps = () => {
    const tempColors = [...defaultColors];
    const result = {};

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * tempColors.length);
      result[`color${i + 1}`] = tempColors.splice(randomIndex, 1)[0];
    }

    return result;
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * defaultColors.length);
    const randomColor = defaultColors[randomIndex];

    return randomColor;
  };

  const defineName = () => {
    const randomIdentifyerColor = getRandomColor();
    const randomColor = getRandomColor().value;

    if (randomIdentifyerColor.name === identifyer.value || randomColor === identifyer.color) {
      return defineName();
    }

    return setIdentifyer({
      id: randomIdentifyerColor.id,
      value: randomIdentifyerColor.name,
      color: randomColor,
    });
  };

  const defineColors = () => {
    if (colors.length === 0) {
      setColors([...defaultColors]);
    }

    setTapColors(getColorForTaps());
  };

  const startGame = async () => {
    // Get user data
    await syncUserData();

    // Define variables to default values
    setStopTimer(false); // Stop timer false
    setDefaultTime(5); // Starts with 5 seconds
    setTimer(defaultTime); // Starts with default time
    setGameStoped(false); // Game is not stopped
    setCurrentScore(0); // Current score is 0

    // Background gradient default
    setBackgroundImage('linear-gradient(to right bottom, #3005ff, #007cff, #00abff, #00cfe0, #12ebb2)');

    // Get color name and set your color
    defineName();

    // Define colors
    defineColors();

    // Set color list
    setColors([...defaultColors]);
  };

  const stopGame = async () => {
    if (currentScore > user.score) {
      await axiosConnection.put('/api/updateScore', {
        userId: user.id,
        currentScore,
      });
    }

    setStopTimer(true);
    setGameStoped(true);
  };

  const resetGame = () => {
    if (currentScore >= 20) {
      setDefaultTime(4);
      setBackgroundImage('linear-gradient(to right top, #bd05ff, #7d5fff, #2e7fff, #0093ff, #12a0eb)');
    }

    if (currentScore >= 40) {
      setDefaultTime(3);
      setBackgroundImage('linear-gradient(to right top, #ff05ea, #d900ec, #ad0bed, #791aed, #1225eb)');
    }

    if (currentScore >= 100) {
      setDefaultTime(2);
      setBackgroundImage('linear-gradient(to right top, #ff0531, #ff005b, #f7008a, #d400bc, #8c12eb)');
    }

    if (currentScore >= 150) {
      setBackgroundImage('linear-gradient(to right top, #ff0505, #fe5a00, #fa8400, #f3a600, #ebc512)');
    }

    setTimer(defaultTime);
    defineName();
    defineColors();
  };

  const onTap = (color) => {
    if (color.id !== identifyer.id) {
      return stopGame();
    }

    setCurrentScore((prev) => prev + 1);

    return resetGame();
  };

  // On start game
  useEffect(() => {
    startGame();
  }, []);

  // Timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (stopTimer) {
        return clearInterval(intervalId);
      }

      if (timer <= 0) {
        clearInterval(intervalId);
        return stopGame();
      }
      return setTimer(timer - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, stopTimer]);

  return (
    <div className="h-inherit d-flex justify-content-center background-linear" style={{ backgroundImage }}>
      <Container className="d-flex flex-column justify-content-center align-items-center">
        {gameStoped
        && (
        <OverlayStoped
          onClickMenu={() => router.push('/')}
          onClickRestart={startGame}
        />
        )}
        <Card className="cardWidth">
          <Card.Header>
            <User
              username={user?.name}
              score={`${currentScore}/${user?.score || 0}`}
            />
          </Card.Header>
          <Card.Body className="d-flex flex-column align-items-center">
            <h1 style={{ color: identifyer.color }}>
              {identifyer.value}
            </h1>
            <div>
              <div className="d-flex flex-row">
                <Tap color={tapColors.color1?.value} onClick={() => onTap(tapColors.color1)} />
                <Tap color={tapColors.color2?.value} onClick={() => onTap(tapColors.color2)} />
              </div>
              <div className="d-flex flex-row">
                <Tap color={tapColors.color3?.value} onClick={() => onTap(tapColors.color3)} />
                <Tap color={tapColors.color4?.value} onClick={() => onTap(tapColors.color4)} />
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center align-items-center">
            <h1>
              00:0
              {timer}
            </h1>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

export default React.memo(Play);

export const getServerSideProps = async (context) => {
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
    props: {
    },
  };
};
