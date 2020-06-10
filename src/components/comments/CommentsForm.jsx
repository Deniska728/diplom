import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { AiOutlineSend } from 'react-icons/ai';

import Loading from 'components/common/Loading';

import CREATE_COMMENT from 'graphql/mutations/comments/createComment';

const CommentsForm = ({ schemaId, entity }) => {
  const [comment, setComment] = useState('');
  const [createComment, { loading }] = useMutation(CREATE_COMMENT);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment) {
      const variables = {
        schemaId,
        [entity.isField ? 'gqlFieldId' : 'gqlTypeId']: entity.id,
        content: comment,
      };

      createComment({ variables }).then(() => {
        setComment('');
      });
    }
  };

  const handleChange = ({ target: { value } }) => {
    setComment(value);
  };

  return (
    <div className="comment-form-container">
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="comment"
          name="comment"
          placeholder="Send a message to everyone"
          value={comment}
          onChange={handleChange}
          disabled={loading}
          autoComplete="off"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <Loading /> : <AiOutlineSend />}
        </button>
      </form>
    </div>
  );
};

export default CommentsForm;
