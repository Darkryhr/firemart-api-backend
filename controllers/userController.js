const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
