const PRODUCTS = [
  { name: 'CRT HOODIE', price: '$65' },
  { name: 'GLITCH TEE', price: '$35' },
  { name: 'VINYL LP', price: '$28' },
  { name: 'STICKER PACK', price: '$12' },
  { name: 'POSTER SET', price: '$22' },
  { name: 'KEYCAP SET', price: '$45' },
];

export default function ShopScreen() {
  return (
    <div className="screen">
      <h1 className="screen__title">SHOP</h1>
      <p className="screen__subtitle">merch terminal — demo items only</p>
      <div className="screen__panel">
        <div className="product-grid">
          {PRODUCTS.map((product) => (
            <div key={product.name} className="product-card">
              <div className="product-card__thumb" />
              <div className="product-card__name">{product.name}</div>
              <div className="product-card__price">{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
