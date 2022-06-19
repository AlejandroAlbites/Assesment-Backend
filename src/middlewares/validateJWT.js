const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Si sesión expiró");
    }

    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Si sesión expiró");
    }

    const { id } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.user = id;

    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  validateJWT,
};
