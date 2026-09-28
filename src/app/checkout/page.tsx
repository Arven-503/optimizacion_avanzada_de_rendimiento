'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { createOrderAction } from '@/app/actions/orders';

export default function CheckoutPage() {
  const {
    cart,
    totalAmount,
    clearCart,
    removeFromCart,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleCheckout = async (): Promise<void> => {
    if (cart.length === 0) {
      return;
    }

    setLoading(true);
    setError(null);

    const itemsPayload = cart.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    const result = await createOrderAction(itemsPayload);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      clearCart();
      router.push('/history?success=true');
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <h1>Tu carrito está vacío</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Finalizar Compra</h1>

      {error && (
        <p>{error}</p>
      )}

      <div>
        {cart.map((item) => (
          <div key={item.product.id}>
            <h3>{item.product.name}</h3>

            <p>
              Cantidad: {item.quantity}
            </p>

            <p>
              Precio: ${item.product.price.toFixed(2)}
            </p>

            <button
              type="button"
              onClick={() => removeFromCart(item.product.id)}
              className="text-red-500 hover:underline text-sm font-medium"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <p>
        Total: ${totalAmount.toFixed(2)}
      </p>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading
          ? 'Procesando orden...'
          : 'Confirmar y Pagar'}
      </button>
    </div>
  );
}