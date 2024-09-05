"use client";
import { useState } from "react";
import BlogCard from "./BlogCard";
import BlogsContentWidget from "./BlogsContentWidget";
import BlogsSearchbar from "./BlogsSearchbar";

const BlogsContent = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterPosts(category, selectedTag, selectedPost, searchQuery);
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    filterPosts(selectedCategory, tag, selectedPost, searchQuery);
  };

  const handlePostChange = (postUri) => {
    setSelectedPost(postUri);
    filterPosts(selectedCategory, selectedTag, postUri, searchQuery);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterPosts(selectedCategory, selectedTag, selectedPost, query);
  };

  const filterPosts = (category, tag, postUri, query) => {
    let filtered = posts;

    if (category) {
      filtered = filtered.filter((post) =>
        post.categories.nodes.some((cat) => cat.name === category)
      );
    }

    if (tag) {
      filtered = filtered.filter((post) =>
        post.tags.nodes.some((tg) => tg.name === tag)
      );
    }

    if (postUri) {
      filtered = filtered.filter((post) => post.uri === postUri);
    }

    if (query) {
      filtered = filtered.filter((post) => {
        const title = post.title?.toLowerCase() || "";
        const content = post.content?.toLowerCase() || "";
        const authorFirstName = post.author?.firstName?.toLowerCase() || "";
        const authorLastName = post.author?.lastName?.toLowerCase() || "";
        const authorFullName = `${authorFirstName} ${authorLastName}`.trim();

        return (
          title.includes(query) ||
          content.includes(query) ||
          authorFirstName.includes(query) ||
          authorLastName.includes(query) ||
          authorFullName.includes(query)
        );
      });
    }

    setFilteredPosts(filtered);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSelectedPost(null);
    setSearchQuery("");
    setFilteredPosts(posts);
  };

  // Extract categories and tags for filters
  const categories = [
    ...new Set(
      posts.flatMap((post) => post.categories.nodes.map((cat) => cat.name))
    ),
  ];
  const tags = [
    ...new Set(posts.flatMap((post) => post.tags.nodes.map((tag) => tag.name))),
  ];

  // Get the 5 most recent posts
  const mostRecentPosts = posts
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Convert categories and most recent posts to an array of objects with `label` and `value`
  const categoryOptions = categories.map((category) => ({
    label: category,
    value: category,
  }));
  const mostRecentPostOptions = mostRecentPosts.map((post) => ({
    label: post.title,
    value: post.uri,
  }));

  return (
    <div className="blogsContent-outer">
      {/* Reset Button */}
      <div className="tags">
        <div className="tags_title">Filters</div>
        <button onClick={resetFilters} className="primary_btn reset_btn">
          Reset Filters
        </button>
      </div>
      <div className="blogsContent-inner">
        {/* Tags Row */}
        <div className="blogsContent-row-top tags">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`filter_btn ${selectedTag === tag ? "active" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="blogsContent-row-bottom">
          {/* Display Filtered Posts */}
          <div className="grid blogs_container">
            {filteredPosts.map((post) => (
              <BlogCard key={post.uri} post={post} />
            ))}
          </div>
          <div className="blogsContent-widgets">
            {/* Search Bar */}
            <BlogsSearchbar
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
            />

            {/* Most Recent Posts Row */}
            <BlogsContentWidget
              options={mostRecentPostOptions}
              selectedOption={selectedPost}
              handleChange={handlePostChange}
              type="recent posts"
            />

            {/* Categories Row */}
            <BlogsContentWidget
              options={categoryOptions}
              selectedOption={selectedCategory}
              handleChange={handleCategoryChange}
              type="categories"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsContent;
