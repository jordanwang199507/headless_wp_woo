// app/page.js
import woocommerce from "../../utils/woocommerce";

async function getProducts() {
  const { data: products } = await woocommerce.get("/products");
  return products;
}

export default async function Products() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <a href={`/product/${product.id}`}>{product.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
