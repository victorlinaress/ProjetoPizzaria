import prismaClient from "../../prisma";

interface ProductRequest {
  category_id: string;
}

class ListByCategories {
  async execute({ category_id }: ProductRequest) {
    const findByCategory = await prismaClient.product.findMany({
      where: {
        category_id: category_id // bater com o que o usuário mandou
      }
    });

    return findByCategory;
  }
}

export { ListByCategories };
