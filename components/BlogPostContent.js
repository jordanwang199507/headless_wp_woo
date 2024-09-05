"use client";
import { useState } from "react";
import BlogPostWidget from "./BlogPostWidget";
import BlogPostComment from "./BlogPostComment";
import Comments from "../public/assets/images/comments.svg";
import Time from "../public/assets/images/time.svg";
import Link from "next/link";

const BlogPostContent = ({ post, posts }) => {
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
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentList, setCommentList] = useState(comments.nodes);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // Filter posts that have a valid uri
  const mostRecentPosts = posts
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .filter((post) => post.uri); // Only include posts with a valid uri

  const mostRecentPostOptions = mostRecentPosts.map((post) => ({
    label: post.title,
    value: post.uri,
    uri: post.uri,
  }));
  return (
    <div className="blogPost">
      <div className="blogPost_category">
        <Link href="/blogs">All Blogs</Link>
        {post.categories.nodes.length > 0 && (
          <>
            {" / "}
            {post.categories.nodes.map((category, index) => (
              <span key={category.uri}>
                {/* <Link href={category.uri}>{category.name}</Link> */}
                <div>{category.name}</div>

                {index < post.categories.nodes.length - 1 && " - "}
              </span>
            ))}
          </>
        )}
        {" / "}
        {post.title}
      </div>
      <div className="blogPost_content">
        <div className="blogPost_info">
          <h1 className="blogPost_primary primary_title">{post.title}</h1>
          <div className="blogPost_meta">
            <div className="blogPost_meta-info">
              <p className="blogPost_author">By {post.author.node?.name}</p>
            </div>
            <div className="blogPost_meta-info">
              <Time className="blogPost_icon" />
              <p className="blogPost_date">{formattedDate}</p>
            </div>
          </div>

          <div
            className="blogPost_text"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {commentList.length > 0 && (
            <div className="blogPostComments">
              <h3 className="blogs_widget-title">
                {commentList.length <= 1
                  ? `${commentList.length} comment`
                  : `${commentList.length} comments`}
              </h3>
              <div className="blogPostComments_container">
                {commentList.map((comment) => (
                  <BlogPostComment key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="blogPost-widgets">
          {/* Most Recent Posts Row */}
          <BlogPostWidget
            options={mostRecentPostOptions}
            selectedOption={selectedPost}
            handleChange={setSelectedPost}
            type="recent posts"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPostContent;
