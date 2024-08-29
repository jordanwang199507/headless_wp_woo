// app/[slug]/page.js
import { client } from "../../utils/apollo";
import { gql } from "@apollo/client";

const GET_POST_BY_SLUG = gql`
  query GetPostByURI($id: ID!) {
    post(id: $id, idType: URI) {
      title
      content
      date
      uri
      author {
        node {
          firstName
          lastName
        }
      }
    }
  }
`;

export default async function Page({ params }) {
  const { data } = await client.query({
    query: GET_POST_BY_SLUG,
    variables: { id: params.slug },
  });

  const post = data?.post;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <section className="blog-post">
      <h1 className="title">{post.title}</h1>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <p className="date">{new Date(post.date).toLocaleDateString()}</p>
      <p className="author">
        Written by {post.author.node.firstName} {post.author.node.lastName}
      </p>
    </section>
  );
}
