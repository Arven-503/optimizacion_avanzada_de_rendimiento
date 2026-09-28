import Link from 'next/link';
import { Product } from '@/types/product';

async function getProducts(): Promise<Product[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error('La URL de la API no está configurada.');
  }

  const res = await fetch(`${API_URL}/products`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error('No se pudieron cargar los productos.');
  }

  const data: unknown = await res.json();

  if (!Array.isArray(data)) {
    throw new Error('La API no devolvió una lista de productos válida.');
  }

  return data as Product[];
}

export default async function HomePage() {
  let products: Product[] = [];
  let errorMessage: string | null = null;

  try {
    products = await getProducts();
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : 'Ocurrió un error al cargar los productos.';
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900"
          >
            Mi Tienda
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-gray-900"
            >
              Productos
            </Link>

            <Link
              href="/checkout"
              className="font-medium text-gray-700 hover:text-gray-900"
            >
              Carrito
            </Link>

            <Link
              href="/history"
              className="font-medium text-gray-700 hover:text-gray-900"
            >
              Historial
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Catálogo de Productos
          </h1>

          <p className="mt-2 text-gray-600">
            Explora nuestros productos disponibles.
          </p>
        </div>

        {errorMessage ? (
          <div className="rounded-lg border border-red-300 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-700">
              No se pudieron cargar los productos
            </h2>

            <p className="mt-2 text-red-600">
              {errorMessage}
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center">
            <p className="text-gray-600">
              No hay productos disponibles en este momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {product.name}
                </h2>

                <p className="mt-3 text-2xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </p>

                <Link
                  href={`/products/${product.id}`}
                  className="mt-5 inline-block rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                >
                  Ver producto
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}