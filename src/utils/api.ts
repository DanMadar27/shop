function headers() {
  return {
    'Content-Type': 'application/json',
  };
}

export async function checkout(products: { id: number, quantity: number }[]) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(products),
  });

  if (!response.ok) {
    throw new Error(`Checkout: { status: ${response.status}, message: ${response.statusText} }`);
  }

  return response.json();
}