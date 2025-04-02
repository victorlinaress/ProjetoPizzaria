import { Request, Response } from "express";
import DetailsUserService from "../../services/user/DetailsUserService";

class DetailsUserController {
  async handle(req: Request, rep: Response) {
    const user_id = req.user_id;
    const detailsUserService = new DetailsUserService();
    const user = await detailsUserService.execute(user_id);

    return rep.json(user); 
  }
}

export default DetailsUserController;
