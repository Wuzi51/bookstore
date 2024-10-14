import "./index.css"

const CommentBoard = () => {
  return (
    <div className="comment-board mt-5">
      <h3 className="text-xl mb-4">書評</h3>
      <form  className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="寫下您的評論...">
        </textarea>
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          發表評論
        </button>
      </form>
    </div>
  );
};

export default CommentBoard;