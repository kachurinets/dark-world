const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req.headers, 'headers');
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'secret_this_should_be_longer');
    next();
  } catch (e) {
    res.status(401).json({message: "Auth failed!"});
  }

};
