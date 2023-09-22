const allowedCors = [
  'https://movie.wardenclock.nomoreparties.co',
  'http://movie.wardenclock.nomoreparties.co',
];

function cors(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  next();
}

module.exports = cors;
