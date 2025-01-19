const User = require('../models/user');

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.session?.userId;

    if (!userId) {
      console.error('User not authenticated - No session ID');
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await User.findById(userId).lean();
    if (!user) {
      console.error('User not found for ID:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.session?.userId;

    if (!userId) {
      console.error('User not authenticated - No session ID');
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { address, city, zipCode, country, cardNumber, expirationDate } = req.body;

    if (!address || !city || !zipCode || !country || !cardNumber || !expirationDate) {
      console.error('Missing required fields:', req.body);
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        shipping: { address, city, zipCode, country },
        payment: { cardNumber, expirationDate },
      },
      { new: true }
    );

    if (!updatedUser) {
      console.error('User not found for ID:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...userWithoutPassword } = updatedUser.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};