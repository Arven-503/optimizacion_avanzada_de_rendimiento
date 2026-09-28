import { cookies } from 'next/headers';

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  total: number;
  created_at: string;
  items: OrderItem[];
}

async function getOrders(): Promise<Order[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('No se pudo cargar el historial de órdenes.');
  }

  return res.json();
}

export default async function OrderList() {
  const orders = await getOrders();

  if (orders.length === 0) {
    return (
      <div>
        <p>Aún no has realizado ninguna compra.</p>
      </div>
    );
  }

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <h2>Orden #{order.id}</h2>

          <p>
            {new Date(order.created_at).toLocaleDateString()}
          </p>

          <p>
            Items incluidos: {order.items?.length || 0}
          </p>

          <p>
            Total: ${order.total}
          </p>
        </div>
      ))}
    </div>
  );
}