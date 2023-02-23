import FetchApi from '../../api';

const handler = async (req, res) => {
  const { userId, currentScore } = req.body;

  try {
    if (!userId) {
      throw new Error('User id is required');
    }

    if (!currentScore) {
      throw new Error('Score is required');
    }

    const { data: { data: { user } } } = await FetchApi.post('/auth/login', {
      email: process.env.USER_CONTROLLER_EMAIL,
      password: process.env.USER_CONTROLLER_PASSWORD,
    });

    await FetchApi.put('/score', { userId, score: currentScore }, {
      headers: {
        Authorization: user?.token,
      },
    });

    res.status(200).json({ message: 'Score foi atualizado' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
