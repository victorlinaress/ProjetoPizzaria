import prismaClient from "../../prisma";

// Interface que define os dados necessários para adicionar um item
interface ItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemService {
  async execute({ order_id, product_id, amount }: ItemRequest) {
    const order = await prismaClient.item.create({
      data: {
        order_id: order_id,      
        product_id: product_id,   
        amount: amount           
      }
    });

    return order; 
  }
}

export { AddItemService };
