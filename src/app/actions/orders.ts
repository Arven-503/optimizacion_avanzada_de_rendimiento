'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrderAction(items: { product_id: number; quantity: number }[]) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return { error: 'Debes iniciar sesión para realizar una compra.' };
  }

  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || 'Error al procesar la orden en el servidor.' };
    }

    // Revalidación asíncrona de datos para actualizar la UI del historial de compras
    revalidatePath('/history');

    return { success: true, orderId: data.id, clientSecret: data.client_secret };
  } catch (error) {
    return { error: 'Ocurrió un error al conectar con la API de Laravel.' };
  }
}