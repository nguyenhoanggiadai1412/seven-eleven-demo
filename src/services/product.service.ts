import api from "./api";
import type { Product, ProductFormData } from "../types/product.type";

const STORAGE_KEY = "admin_products";

const seedProducts: Product[] = [
  {
    id: 1,
    name: "Classic Sandwich",
    description: "Soft bread with ham, egg, cucumber, and a light creamy sauce.",
    price: 32000,
    stock: 12,
    category: "Ready Meals",
    imageUrl:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Iced Latte",
    description: "Chilled coffee with fresh milk for a smooth afternoon boost.",
    price: 28000,
    stock: 18,
    category: "Drinks",
    imageUrl:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Chicken Bento",
    description: "Grilled chicken with rice, vegetables, and savory sauce.",
    price: 59000,
    stock: 10,
    category: "Ready Meals",
    imageUrl:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
  },
];

function readProducts() {
  const storedProducts = localStorage.getItem(STORAGE_KEY);

  if (!storedProducts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
    return seedProducts;
  }

  return JSON.parse(storedProducts) as Product[];
}

function writeProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function nextId(products: Product[]) {
  return products.length === 0 ? 1 : Math.max(...products.map((product) => product.id)) + 1;
}

export const productService = {
  async getAll(): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>("/products");
      return response.data;
    } catch {
      return readProducts();
    }
  },

  async getById(id: number): Promise<Product> {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch {
      const product = readProducts().find((item) => item.id === id);

      if (!product) {
        throw new Error("Product not found.");
      }

      return product;
    }
  },

  async create(data: ProductFormData): Promise<Product> {
    try {
      const response = await api.post<Product>("/products", data);
      return response.data;
    } catch {
      const products = readProducts();
      const product: Product = { id: nextId(products), ...data };
      writeProducts([...products, product]);
      return product;
    }
  },

  async update(id: number, data: ProductFormData): Promise<Product> {
    try {
      const response = await api.put<Product>(`/products/${id}`, data);
      return response.data;
    } catch {
      const products = readProducts();
      const productIndex = products.findIndex((item) => item.id === id);

      if (productIndex === -1) {
        throw new Error("Product not found.");
      }

      const updatedProduct: Product = { id, ...data };
      const nextProducts = products.map((product) =>
        product.id === id ? updatedProduct : product,
      );
      writeProducts(nextProducts);
      return updatedProduct;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
    } catch {
      writeProducts(readProducts().filter((product) => product.id !== id));
    }
  },
};
