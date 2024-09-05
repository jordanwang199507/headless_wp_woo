import Image from "next/image";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
const BlogPostComment = ({ comment }) => {
  const formattedDate = formatDate(comment.date);
  console.log(comment);
  return (
    <div className="blogPostComment">
      <div className="blogPostComment_avatar">
        <Image
          src={comment.author.node.avatar.url}
          width={50}
          height={50}
          alt={comment.author.node.name}
          className="blogPostComment_avatar-image"
          style={{ objectFit: "cover" }} // Ensures that the image fits the container
        />
      </div>
      <div className="blogPostComment_meta">
        <div className="blogPostComment_meta-info">
          <div className="blogPostComment_author">
            {comment.author.node.name}
          </div>
          <div className="blogPostCcomment_date">{formattedDate}</div>
        </div>
        <div
          className="blogPostComment_content"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />
      </div>
    </div>
  );
};

export default BlogPostComment;
