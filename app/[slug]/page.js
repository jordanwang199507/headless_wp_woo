// app/[slug]/page.js
import { client } from "../../utils/apollo";
import { gql } from "@apollo/client";
import Image from "next/image";
import BlogPostContent from "../../components/BlogPostContent";

const GET_POST_BY_SLUG = gql`
  query GetPostByURI($id: ID!) {
    post(id: $id, idType: URI) {
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
`;
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

export default async function Page({ params }) {
  const { data } = await client.query({
    query: GET_POST_BY_SLUG,
    variables: { id: params.slug },
  });

  const post = data?.post;
  const {
    title,
    uri,
    featuredImage,
    author,
    date,
    content,
    categories,
    tags,
    comments,
  } = post;

  const { data: menuData } = await client.query({
    query: GET_MENU,
  });

  const posts = menuData?.posts?.nodes || [];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <section className="blog-post column">
      <div className="row blog-post_row-header">
        <BlogPostContent post={post} posts={posts} />
      </div>

      <div className="blog-post_bg">
        <Image
          src={featuredImage.node.sourceUrl}
          width={450}
          height={300}
          alt={featuredImage.node.altText || title}
          className="blog-post_img"
          style={{ objectFit: "cover" }} // Ensures that the image fits the container
        />
      </div>
    </section>
  );
}
