"use client";

const BlogsContentWidget = ({
  options,
  selectedOption,
  handleChange,
  label,
  type,
}) => {
  return (
    <div className="blogs_widget">
      <div className="blogs_widget-title">{type}</div>
      <div className="blogs_divider"></div>
      <div className="blogs_widget-options">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleChange(option.value)}
            className={`blogs_widget-option ${
              selectedOption === option.value ? "active" : ""
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogsContentWidget;
