import { notFound } from 'next/navigation';
import Link from 'next/link';

interface ProductDetail {
  id: number;
  name?: string;
  title?: string;
  price: number;
  description?: string;
  image?: string;
}

async function getProduct(id: string): Promise<ProductDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as ProductDetail;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const productName =
    product.name || product.title || 'Producto';

  return (
    <div>
      <Link href="/">
        ← Volver al catálogo
      </Link>

      {product.image && (
        <div>
          <img
            src={product.image}
            alt={productName}
          />
        </div>
      )}

      <h1>{productName}</h1>

      <p>
        Precio: ${product.price.toFixed(2)}
      </p>

      {product.description && (
        <p>{product.description}</p>
      )}
    </div>
  );
}