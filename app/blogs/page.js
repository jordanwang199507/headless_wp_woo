import { client } from "../../utils/apollo";
import { gql } from "@apollo/client";
import PostCard from "../../components/PostCard";
export default async function Blogs() {
  const GET_MENU = gql`
    query GetAllPosts {
      posts {
        nodes {
          title
          content
          uri
          date
          author {
            node {
              firstName
              lastName
              name
            }
          }
          featuredImage {
            node {
              altText
              sourceUrl
              caption
            }
          }
        }
      }
    }
  `;
  const { data } = await client.query({
    query: GET_MENU,
  });
  // console.log(data.posts.nodes.map((node) => node));
  data.posts.nodes.map((node) => {
    const { author } = node;
    if (author && author.node) {
      const { firstName, lastName, name } = author.node;
      console.log(`Author: ${firstName} ${lastName} (${name})`);
    }
  });
  return (
    <section className="blogs">
      <div className="row blogs_row">
        <div className="blogs_intro">
          <h1 className="primary_title">Blog</h1>
          <h3 className="secondary_title blogs_secondary">
            Dedicated to creating high quality content
          </h3>
          <p className="primary_text blogs_text">
            We hold nothing back! These are our best insights on how to maintain
            (and market) a healthy website for business growth
          </p>
        </div>
      </div>
      <div className="row blogs_row-container">
        <div className="grid blogs_container">
          {data.posts.nodes.map((post) => {
            return <PostCard key={post.uri} post={post}></PostCard>;
          })}
        </div>
      </div>
    </section>
  );
}
