"use client";

const BlogsSearchbar = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="blogs_widget">
      <div className="blogs_widget-title">Search</div>
      <div className="blogs_divider"></div>
      <form className="search_bar">
        <input
          type="text"
          placeholder="Search by title, content, author..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search_input"
        />
      </form>
    </div>
  );
};

export default BlogsSearchbar;
