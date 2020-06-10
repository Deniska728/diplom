import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { toast } from 'react-toastify';

import dayjs from 'dayjs';

import Loading from 'components/common/Loading';

import COMMENTS from 'graphql/queries/comments/comments';
import DELETE_COMMENT from 'graphql/mutations/comments/deleteComment';
import COMMENTS_SUBSCRIPTION from 'graphql/subscriptions/comments/comment';

const CommentsList = ({ entity, schemaId, user }) => {
  const { data, loading, subscribeToMore } = useQuery(COMMENTS, {
    variables: {
      id: entity.id,
      schemaId,
    },
    skip: !schemaId,
    fetchPolicy: 'cache-and-network',
  });
  const [deleteComment, { deleteLoading }] = useMutation(DELETE_COMMENT);

  useEffect(() => {
    let unsubscribe;

    if (schemaId) {
      unsubscribe = subscribeToMore({
        document: COMMENTS_SUBSCRIPTION,
        variables: {
          id: entity.id,
          schemaId,
        },
        skip: !schemaId,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const {
            data: {
              comment: { mutation, previousValues, comment },
            },
          } = subscriptionData;

          switch (mutation) {
            case 'DELETED':
              return {
                ...prev,
                comments: prev.comments.filter((t) => t.id !== previousValues.id),
              };
            case 'CREATED':
              const currentComment = prev.comments.find((t) => t.id === comment.id);

              if (currentComment) return;

              return {
                ...prev,
                comments: [...prev.comments, comment],
              };
            default:
              return null;
          }
        },
      });
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [subscribeToMore, entity.id, schemaId]);

  if (loading) return <Loading />;

  const handleDelete = (id) => {
    const variables = {
      commentId: id,
    };

    deleteComment({
      variables,
      update: (store, { data: { deleteComment } }) => {
        const variables = {
          id: entity.id,
          schemaId,
        };

        const comments = store.readQuery({ query: COMMENTS, variables });

        const filteredComments = comments.comments.filter(
          (comment) => comment.id !== deleteComment.id,
        );

        store.writeQuery({
          query: COMMENTS,
          variables,
          data: {
            comments: filteredComments,
          },
        });
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteComment: {
          id,
          __typename: 'Bug',
        },
      },
    }).catch((err) => toast.error(err.message));
  };

  return (
    <React.Fragment>
      <div className="comments-list">
        {data &&
          data.comments.map(({ createdAt, createdBy, id, content }) => (
            <div className="comment" key={id}>
              <div className="comment-header">
                {createdBy.profile && createdBy.profile.picture ? (
                  <img src={createdBy.profile.picture} width="36" height="36" alt="" />
                ) : (
                  <div className="no-picture">
                    {createdBy.profile ? createdBy.profile.firstName[0] : createdBy.username[0]}
                  </div>
                )}
                <span className="username">
                  {createdBy.profile ? createdBy.profile.fullName : createdBy.username}
                </span>
                <span className="created-at">{dayjs(createdAt).format('HH:mm')}</span>
                {user.id === createdBy.id && (
                  <button
                    className="delete-comment"
                    disabled={deleteLoading}
                    onClick={() => handleDelete(id)}
                  >
                    <span>×</span>
                  </button>
                )}
              </div>
              <div className="comment-body">{content.message}</div>
            </div>
          ))}
      </div>
      {data && !data.comments.length && <p className="no-comments">No comments yet.</p>}
    </React.Fragment>
  );
};

export default CommentsList;
