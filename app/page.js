// app/page.js
import woocommerce from "../utils/woocommerce";
import Hero from "../components/Hero";

// async function getProducts() {
//   const { data: products } = await woocommerce.get("/products");
//   return products;
// }

export default async function Home() {
  return <Hero />;
}
// // app/page.js
// import { gql } from "@apollo/client";
// import { client } from "../utils/apollo";

// export default async function Home() {
//   const GET_POSTS = gql`
//     query GetAllPosts {
//       posts {
//         nodes {
//           title
//           content
//           uri
//           date
//         }
//       }
//     }
//   `;

//   const { data } = await client.query({
//     query: GET_POSTS,
//   });

//   return (
//     <section className="w-full">
//       <div>
//         {data.posts.nodes.map((post) => (
//           <div key={post.uri}>
//             <h2>{post.title}</h2>
//             <p>{post.content}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
