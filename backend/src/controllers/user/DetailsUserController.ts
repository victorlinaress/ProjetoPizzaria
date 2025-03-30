import { Request, Response } from "express";
import DetailsUserService from "../../services/user/DetailsUserService";

class DetailsUserController {
    async handle(req:Request, rep: Response){
        const detailsUserService = new DetailsUserService();
        const user = await detailsUserService.execute()

        return res.json()

    }
}

export default DetailsUserController