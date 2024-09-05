import { client } from "../../utils/apollo";
import { gql } from "@apollo/client";
import BlogCard from "../../components/BlogCard";
import BlogsContent from "../../components/BlogsContent";
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

          # Fetch categories
          categories {
            nodes {
              name
              uri
            }
          }

          # Fetch tags
          tags {
            nodes {
              name
              uri
            }
          }

          # Fetch comments
          comments {
            nodes {
              content
              date
              author {
                node {
                  name
                  email
                  avatar {
                    url
                  }
                }
              }
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
    const { author, categories, tags, comments } = node;
    if (author && author.node) {
      const { firstName, lastName, name } = author.node;
      console.log(`Author: ${firstName} ${lastName} (${name})`);
    }
    if (categories && categories.nodes) {
      categories.nodes.forEach((category) => {
        const { name, uri } = category;
        console.log(`Category: ${name}, URI: ${uri}`);
      });
    }
    if (tags && tags.nodes) {
      tags.nodes.forEach((tag) => {
        const { name, uri } = tag;
        // console.log(`Tag: ${name}, URI: ${uri}`);
      });
    }
    if (comments && comments.nodes) {
      comments.nodes.forEach((comment) => {
        const { content, date, author } = comment;
        const { name, email, avatar } = author.node;
        console.log(
          `Comment: ${content}, Date: ${date}, Name:${name}, Email: ${email}, Avartar URL: ${avatar.url}`
        );
      });
    }
  });
  return (
    <section className="blogs column">
      <div className="row blogs_row-header">
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
      <div className="blogs_bg"></div>
      <div className="row blogs_row-content">
        <BlogsContent posts={data.posts.nodes} />
      </div>
    </section>
  );
}
