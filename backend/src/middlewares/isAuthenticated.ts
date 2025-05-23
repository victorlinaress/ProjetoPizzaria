import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}

function isAuthenticated(req: Request, resp: Response, next: NextFunction) {
  //receber o token

  const authToken = req.headers.authorization;

  if (!authToken) {
    return resp.status(401).end();
  }


  const [, token] = authToken.split(" "); 


  try {
    //validação do token
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;
    //recuperar o id do token e colocar dentro de uma variavel user_id dentro do request 
    req.user_id = sub; 
    return next();
  } catch (error) {
    //se não validar, mostrar erro
    return resp.status(401).end();
  }
}

export { isAuthenticated };
