import { Request, Response } from "express";
import { DetailsOrderService } from "../../services/orders/DetailsOrderService";

class DetailsOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;

    const detailsOrderService = new DetailsOrderService();

    const order = await detailsOrderService.execute({
      order_id,
    });

    return res.json(order);
  }
}

export { DetailsOrderController };
