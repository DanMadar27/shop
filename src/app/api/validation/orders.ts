import prisma from '@/app/api/db/client';
import { Product } from '@prisma/client';

type ProductInput = {
  id: number;
  quantity: number;
};

export async function validateCheckoutRequest(request: Request) {
  try {
    const productsInput: ProductInput[] = await request.json();

    if (!productsInput || !Array.isArray(productsInput) || !productsInput.length) {
      console.error('Invalid products input');
      return null;
    }

    const productIds = productsInput.map((product: ProductInput) => product.id);

    const products: Product[] = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      },
    });
  
    if (products.length !== productIds.length) {
      console.error('One or more products are invalid or do not exist');
      return null;
    }
    
    for (let i = 0; i < productsInput.length; i++) {
      if (!productsInput[i].quantity || productsInput[i].quantity < 1) {
        console.error('One or more products have invalid quantity');
        return null;
      }

      productsInput[i].quantity = Math.floor(productsInput[i].quantity);
    }

    const productsWithPrice = products.map((product: Product) => {
      const quantity = productsInput.find(
        (productInput: ProductInput) => productInput.id === product.id
      )?.quantity || 0;

      if (!quantity) {
        console.error('No quantity found for product : ', product.id);
      }

      return {
        ...product,
        quantity,
        price: product.price * quantity,
      };
    });

    return productsWithPrice;
  }
  catch (error) {
    console.error('Error validating request : ', error);
    return null;
  }
}
