import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const CommentBoard = ({ book, session, onSubmit }) => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const successTimer = useRef(null);

  useEffect(() => () => clearTimeout(successTimer.current), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError(t('Review_Empty'));
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const name =
        session.user.user_metadata?.full_name ||
        session.user.user_metadata?.name ||
        session.user.email;
      await onSubmit(name, content.trim());
      setContent('');
      setSuccess(true);
      clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err?.message || t('Review_Submit_Failed'));
      console.error('addComment error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-5 commentDarkMode">
      {session?.user && (
        <form onSubmit={handleSubmit} className="mb-6">
          <p className="font-semibold mb-2">{t('Write_Review')}</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('Review_Placeholder')}
            rows={4}
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-surface resize-none focus:outline-none focus:ring-2 focus:ring-[#e98192]"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-1">{t('Review_Success')}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 px-6 py-2 bg-[#e98192] text-white rounded-3xl hover:bg-[#eba5b1] disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#e98192] focus-visible:outline-none"
          >
            {t('Submit_Review')}
          </button>
        </form>
      )}
      <h3 className="text-lg font-bold mb-4">{t('Reviews')}</h3>
      <ul className="space-y-4">
        {book.comments.map((comment) => (
          <li key={comment.id} className="bg-gray-100 p-4 rounded-md shadow-md dark:bg-surface">
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
              <div className="whitespace-pre-wrap commentDarkMode">{comment.content}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentBoard;
