import jwt from "jsonwebtoken";

const secret_key = 'fhgdyjgkufyfjhvjgvjvyjtudytdt233514615768wugjhvxj,hvgds5651875';

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    jwt.verify(token, secret_key);
    next();
  } catch (err) { 
    res.status(401).send("Invalid signature");
    console.log("INvalid signature");
  }
};

export default auth;
