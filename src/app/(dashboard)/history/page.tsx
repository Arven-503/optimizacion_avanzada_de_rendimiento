interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  date: string;
  status: string;
  items: OrderItem[];
  total: number;
}

const orders: Order[] = [
  {
    id: 1001,
    date: '27 de septiembre de 2026',
    status: 'Completado',
    items: [
      {
        product: 'Laptop Gamer',
        quantity: 1,
        price: 899.99,
      },
      {
        product: 'Mouse inalámbrico',
        quantity: 2,
        price: 24.99,
      },
    ],
    total: 949.97,
  },
  {
    id: 1002,
    date: '24 de septiembre de 2026',
    status: 'Completado',
    items: [
      {
        product: 'Teclado mecánico',
        quantity: 1,
        price: 79.99,
      },
      {
        product: 'Audífonos Bluetooth',
        quantity: 1,
        price: 59.99,
      },
    ],
    total: 139.98,
  },
  {
    id: 1003,
    date: '20 de septiembre de 2026',
    status: 'Completado',
    items: [
      {
        product: 'Monitor 24 pulgadas',
        quantity: 1,
        price: 189.99,
      },
    ],
    total: 189.99,
  },
];

export default async function HistoryPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Historial de Compras
          </h1>

          <p className="mt-2 text-gray-600">
            Consulta el detalle de tus órdenes realizadas.
          </p>
        </header>

        <section className="space-y-6">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Orden #{order.id}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Fecha: {order.date}
                  </p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {order.status}
                </span>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Productos comprados
                </h3>

                <div className="mt-3 space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={`${order.id}-${index}`}
                      className="flex flex-col justify-between gap-2 rounded-lg bg-gray-50 p-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.product}
                        </p>

                        <p className="text-sm text-gray-500">
                          Cantidad: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <footer className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                <span className="font-medium text-gray-600">
                  Total abonado
                </span>

                <span className="text-xl font-bold text-green-600">
                  ${order.total.toFixed(2)}
                </span>
              </footer>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}