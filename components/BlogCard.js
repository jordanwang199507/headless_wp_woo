"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Comments from "../public/assets/images/comments.svg";
import Time from "../public/assets/images/time.svg";

export default function BlogCard({ post }) {
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
  const { author_firstName, author_lastName, author_name } = author.node;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // State to hold the truncated content
  const [truncatedContent, setTruncatedContent] = useState("");

  useEffect(() => {
    // Create a temporary element to extract plain text from HTML content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    // Truncate the plain text to 50 words
    const truncatedText = plainText.split(" ").slice(0, 20).join(" ") + "...";

    // Update the state with truncated HTML content
    tempDiv.innerHTML = truncatedText;
    setTruncatedContent(tempDiv.innerHTML);
  }, [content]);

  return (
    <div className="card">
      <div className="card_left">
        {featuredImage && featuredImage.node && (
          <div className="image-container">
            <Image
              src={featuredImage.node.sourceUrl}
              width={450}
              height={300}
              alt={featuredImage.node.altText || title}
              className="card_image"
              style={{ objectFit: "cover" }} // Ensures that the image fits the container
            />
          </div>
        )}
      </div>
      <div className="card_right">
        <Link href={uri}>
          <h3 className="card_secondary secondary_title">{title}</h3>
        </Link>
        <div className="card_meta">
          <div className="card_meta-info">
            <p className="card_author">{author.node?.name}</p>
          </div>
          <div className="card_meta-bottom">
            <div className="card_meta-info">
              <Time className="card_icon" />
              <p className="card_date">{formattedDate}</p>
            </div>
            <div className="card_meta-info">
              <Comments className="card_icon" />
              <p className="card_comments">
                {comments.nodes.length <= 1
                  ? `${comments.nodes.length} comment`
                  : `${comments.nodes.length} comments`}
              </p>
            </div>
          </div>
        </div>
        <div
          className="card_text primary_text"
          dangerouslySetInnerHTML={{ __html: truncatedContent }}
        />
      </div>
    </div>
  );
}
