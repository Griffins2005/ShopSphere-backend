const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).send("Access Denied");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid Token");
    req.user = user;
    next();
  });
};

app.get("/profile", authenticateJWT, (req, res) => {
  res.send(`Hello ${req.user.userId}`);
});
