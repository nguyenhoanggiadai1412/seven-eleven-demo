import type { Product } from "../types/product";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Could not load products. Please try again.");
  }

  return response.json() as Promise<Product[]>;
}
