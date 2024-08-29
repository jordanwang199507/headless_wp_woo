// app/product/[id]/page.js
import woocommerce from "../../../utils/woocommerce";
import AddToCartButton from "../AddToCartButton";

async function getProduct(id) {
  const { data: product } = await woocommerce.get(`/products/${id}`);
  return product;
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  //   console.log(product);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <AddToCartButton productId={product.id} />
    </div>
  );
}
