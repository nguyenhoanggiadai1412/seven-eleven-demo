  import { useEffect, useMemo, useState } from "react";
  import { createOrder } from "../../api/orderApi";
  import { getProducts } from "../../api/productApi";
  import CartItem from "../../components/CartItem";
  import OrderForm, { type OrderFormValues } from "../../components/OrderForm";
  import ProductCard from "../../components/ProductCard";
  import type { CartItem as CartItemType, Product } from "../../types/product";
  import "./UserOrderPage.css";
import GradientText from "../../components/common/GradientText/GradientText";

  const initialFormValues: OrderFormValues = {
    customerName: "",
    phone: "",
    address: "",
    note: "",
  };

  const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const ITEMS_PER_PAGE = 6;

  const defaultProducts: Product[] = [
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
      name: "Onigiri Tuna Mayo",
      description: "Rice triangle wrapped with seaweed and filled with tuna mayo.",
      price: 24000,
      stock: 15,
      category: "Ready Meals",
      imageUrl:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Chocolate Donut",
      description: "Soft donut topped with chocolate glaze for a quick sweet bite.",
      price: 18000,
      stock: 20,
      category: "Bakery",
      imageUrl:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Fresh Orange Juice",
      description: "Cold pressed orange juice with a bright citrus finish.",
      price: 26000,
      stock: 16,
      category: "Drinks",
      imageUrl:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "Chicken Bento",
      description: "Grilled chicken with rice, vegetables, and savory sauce.",
      price: 59000,
      stock: 10,
      category: "Ready Meals",
      imageUrl:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      name: "Potato Chips",
      description: "Crispy salted potato chips for a quick snack break.",
      price: 17000,
      stock: 24,
      category: "Snacks",
      imageUrl:
        "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      name: "Strawberry Yogurt",
      description: "Creamy yogurt blended with sweet strawberry pieces.",
      price: 22000,
      stock: 14,
      category: "Dairy",
      imageUrl:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      name: "Cheese Croissant",
      description: "Buttery croissant baked with a soft cheese filling.",
      price: 25000,
      stock: 13,
      category: "Bakery",
      imageUrl:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      name: "Mineral Water",
      description: "Refreshing bottled mineral water for everyday hydration.",
      price: 10000,
      stock: 30,
      category: "Drinks",
      imageUrl:
        "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80",
    },
  ];

  export default function UserOrderPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [formValues, setFormValues] = useState<OrderFormValues>(initialFormValues);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
      async function loadProducts() {
        try {
          setIsLoading(true);
          setErrorMessage("");
          const productList = await getProducts();
          setProducts(productList);
        } catch (error) {
          setProducts(defaultProducts);
          setErrorMessage(error instanceof Error ? error.message : "Could not load products.");
        } finally {
          setIsLoading(false);
        }
      }

      loadProducts();
    }, []);

    const categories = useMemo(() => {
      const uniqueCategories = new Set(products.map((product) => product.category).filter(Boolean));
      return ["All", ...Array.from(uniqueCategories)];
    }, [products]);

    const filteredProducts = useMemo(() => {
      const normalizedSearch = searchTerm.trim().toLowerCase();

      return products.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(normalizedSearch);
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;

        return matchesName && matchesCategory;
      });
    }, [products, searchTerm, selectedCategory]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
    const paginatedProducts = useMemo(() => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    useEffect(() => {
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }, [currentPage, totalPages]);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    function getCartQuantity(productId: number) {
      return cartItems.find((item) => item.product.id === productId)?.quantity ?? 0;
    }

    function handleAddToCart(product: Product) {
      setSuccessMessage("");
      setFormError("");

      setCartItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.product.id === product.id);

        if (!existingItem) {
          return [...currentItems, { product, quantity: 1 }];
        }

        if (existingItem.quantity >= product.stock) {
          return currentItems;
        }

        return currentItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      });
    }

    function handleIncreaseQuantity(productId: number) {
      setCartItems((currentItems) =>
        currentItems.map((item) => {
          if (item.product.id !== productId || item.quantity >= item.product.stock) {
            return item;
          }

          return { ...item, quantity: item.quantity + 1 };
        }),
      );
    }

    function handleDecreaseQuantity(productId: number) {
      setCartItems((currentItems) =>
        currentItems
          .map((item) =>
            item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
          )
          .filter((item) => item.quantity > 0),
      );
    }

    function handleRemoveFromCart(productId: number) {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.product.id !== productId),
      );
    }

    function handleFormChange(field: keyof OrderFormValues, value: string) {
      setFormValues((currentValues) => ({
        ...currentValues,
        [field]: value,
      }));
    }

    function validateOrder() {
      if (cartItems.length === 0) {
        return "Please add at least one product to the cart.";
      }

      if (!formValues.customerName.trim()) {
        return "Please enter the customer name.";
      }

      if (!formValues.phone.trim()) {
        return "Please enter the phone number.";
      }

      if (!formValues.address.trim()) {
        return "Please enter the delivery address.";
      }

      const itemOverStock = cartItems.find((item) => item.quantity > item.product.stock);
      if (itemOverStock) {
        return `${itemOverStock.product.name} only has ${itemOverStock.product.stock} items available.`;
      }

      return "";
    }

    async function handlePlaceOrder() {
      setFormError("");
      setSuccessMessage("");

      const validationMessage = validateOrder();
      if (validationMessage) {
        setFormError(validationMessage);
        return;
      }

      try {
        setIsSubmitting(true);
        const order = await createOrder({
          customerName: formValues.customerName.trim(),
          phone: formValues.phone.trim(),
          address: formValues.address.trim(),
          note: formValues.note.trim(),
          items: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        });

        setCartItems([]);
        setFormValues(initialFormValues);
        setSuccessMessage(`Order #${order.id} was created successfully.`);
      } catch (error) {
        setFormError(error instanceof Error ? error.message : "Could not place the order.");
      } finally {
        setIsSubmitting(false);
      }
    }

    return (
      <main className="user-order-page">
        <header className="store-header">
          <div>
            <p className="eyebrow">Fresh goods, fast delivery </p>
            <GradientText
              colors={["#10B981","#F97316","#EF4444"]}
              animationSpeed={8}
              showBorder={false}
              className="custom-class, title"
            >
              7 - Eleven
            </GradientText>
          </div>
          <button type="button" className="cart-button" aria-label="Open cart summary">
            Cart <span>{totalItems}</span>
          </button>
        </header>

        <section className="toolbar" aria-label="Product filters">
          <label className="search-box">
            Search products
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by product name"
            />
          </label>

          <label className="category-filter">
            Category
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </section>

        {successMessage && <div className="alert alert--success">{successMessage}</div>}
        {errorMessage && <div className="alert alert--error">{errorMessage}</div>}

        <div className="order-layout">
          <section className="products-section">
            <div className="section-heading">
              <h2>Products</h2>
              <p>{filteredProducts.length} item(s)</p>
            </div>

            {isLoading ? (
              <div className="state-panel">Loading products... (The app is hosted on Render’s free server, so the initial startup may take 1–2 minutes. Please wait a moment)</div>
            ) : filteredProducts.length === 0 ? (
              <div className="state-panel">No products match your search.</div>
            ) : (
              <>
                <div className="product-grid">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      cartQuantity={getCartQuantity(product.id)}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav className="pagination" aria-label="Product pagination">
                    <button
                      type="button"
                      className="pagination__button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    >
                      Previous
                    </button>

                    <div className="pagination__pages">
                      {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1;

                        return (
                          <button
                            key={page}
                            type="button"
                            className={
                              page === currentPage
                                ? "pagination__page pagination__page--active"
                                : "pagination__page"
                            }
                            aria-current={page === currentPage ? "page" : undefined}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      className="pagination__button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    >
                      Next
                    </button>
                  </nav>
                )}
              </>
            )}
          </section>

          <aside className="checkout-panel" aria-label="Cart and order form">
            <section>
              <div className="section-heading">
                <h2>Cart</h2>
                <p>{totalItems} item(s)</p>
              </div>

              {cartItems.length === 0 ? (
                <div className="empty-cart">Your cart is empty.</div>
              ) : (
                <div className="cart-list">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.product.id}
                      item={item}
                      onIncrease={handleIncreaseQuantity}
                      onDecrease={handleDecreaseQuantity}
                      onRemove={handleRemoveFromCart}
                    />
                  ))}
                </div>
              )}

              <div className="total-row">
                <span>Total</span>
                <strong>{currencyFormatter.format(totalAmount)}</strong>
              </div>
            </section>

            <section>
              <div className="section-heading">
                <h2>Delivery</h2>
              </div>

              {formError && <div className="alert alert--error">{formError}</div>}

              <OrderForm
                values={formValues}
                isSubmitting={isSubmitting}
                isCartEmpty={cartItems.length === 0}
                onChange={handleFormChange}
                onSubmit={handlePlaceOrder}
              />
            </section>
          </aside>
        </div>
      </main>
    );
  }
