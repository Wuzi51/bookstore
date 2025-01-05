const CommentBoard = ({ book }) => {
  return (
    <div className="mt-5">
      <h3 className="text-lg font-bold mb-4">書評</h3>
      <ul className="space-y-4">
        {book.comments.map((comment) => (
          <li key={comment.id} className="bg-gray-100 p-4 rounded-md shadow-md">
            <div className="reviewer-content flex items-center mb-2">
              <img
                width="40"
                className="rounded-full mr-2"
                src="https://cdn.readmoo.com/images/readmoo/mooer-icon.png"
                alt={`${comment.name} 的頭像圖`}
              />
              <p className="font-bold">{comment.name}</p>
            </div>
            <div className="mb-2">
              <div className="font-semibold"></div>
              <div className="whitespace-pre-wrap">{comment.content}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentBoard;