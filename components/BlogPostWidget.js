"use client";

import Link from "next/link";

const BlogPostWidget = ({ options, selectedOption, handleChange, type }) => {
  return (
    <div className="blogs_widget">
      <div className="blogs_widget-title">{type}</div>
      <div className="blogs_divider"></div>
      <div className="blogs_widget-options">
        {options.map((option) => (
          <Link key={option.value} href={option.uri}>
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPostWidget;
