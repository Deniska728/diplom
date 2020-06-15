import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { toast } from 'react-toastify';

import { AiOutlineSend } from 'react-icons/ai';

import Loading from 'components/common/Loading';

import COMMENTS from 'graphql/queries/comments/comments';
import CREATE_COMMENT from 'graphql/mutations/comments/createComment';

import track from 'helpers/track';

const CommentsForm = ({ schemaId, entity }) => {
  const input = useRef(null);
  const client = useApolloClient();
  const [comment, setComment] = useState('');
  const [createComment, { loading }] = useMutation(CREATE_COMMENT);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment) {
      const variables = {
        schemaId,
        [entity.isField ? 'gqlFieldId' : 'gqlTypeId']: entity.id,
        content: comment,
      };

      createComment({ variables })
        .then(({ data }) => {
          const variables = {
            id: entity.id,
            schemaId,
          };

          const comments = client.readQuery({ query: COMMENTS, variables });

          client.writeQuery({
            query: COMMENTS,
            variables,
            data: {
              comments: [...comments.comments, data.createComment],
            },
          });

          setComment('');
          input.current.focus();
          track({
            category: 'Create comment',
            action: 'User pressed the create comment button',
          });
        })
        .catch((err) => {
          err.graphQLErrors.map(({ message }) => toast.error(message));
          history.push(`/schema/${schemaId}/comment`);
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
          ref={input}
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
