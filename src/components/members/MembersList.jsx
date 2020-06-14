import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { ListGroup, ListGroupItem, Button } from 'reactstrap';

import MEMBERS from 'graphql/queries/members/members';
import SCHEMAS from 'graphql/queries/schemas/schemas';
import DELETE_MEMBER from 'graphql/mutations/members/deleteMember';
import { useHistory } from 'react-router-dom';

import track from 'helpers/track';

const MembersList = ({ schemaMembers, user }) => {
  const { members, owner, id } = schemaMembers || {};
  const [deleteMember, { loading }] = useMutation(DELETE_MEMBER);
  const client = useApolloClient();
  const history = useHistory();

  const handleDelete = (userId) => {
    if (user.id === userId && user.id === owner.id) {
      alert("You can't remove yourself from the list of members.");
    } else {
      const variables = {
        schemaId: id,
        userId: userId,
      };

      if (user.id === owner.id) {
        track({
          category: 'Delete member',
          action: 'User pressed the delete member button',
        });

        deleteMember({ variables })
          .then(({ data }) => {
            const membersQuery = client.readQuery({
              query: MEMBERS,
              variables: { id },
            });

            console.log(membersQuery, data);

            client.writeQuery({
              query: MEMBERS,
              variables: { id },
              data: {
                schema: {
                  ...membersQuery.schema,
                  members: membersQuery.schema.members.filter(
                    (member) => member.id !== data.removeSchemaMember,
                  ),
                },
              },
            });
          })
          .catch((err) => console.log(err.message));
      } else if (user.id !== owner.id && user.id === userId) {
        track({
          category: 'Delete Remove yourself from members list',
          action: 'User pressed the delete member button',
        });

        deleteMember({ variables })
          .then(() => {
            const schemas = client.readQuery({ query: SCHEMAS });

            client.writeQuery({
              query: SCHEMAS,
              data: {
                schemas: schemas.schemas.filter((schema) => schema.id !== id),
              },
            });
          })
          .catch((err) => console.log(err.message))
          .finally(() => history.push('/'));
      } else {
        alert('Access denied.');
      }
    }
  };

  return (
    <ListGroup className="members-list">
      {members.map((member) => (
        <ListGroupItem key={member.id} className="members-list-item">
          {member.profile && member.profile.picture ? (
            <img
              src={member.profile.picture}
              className="user-img"
              width="50px"
              height="50px"
              alt=""
            />
          ) : (
            <div className="no-picture">
              {member.profile ? member.profile.firstName[0] : member.username[0]}
            </div>
          )}
          <span className="user-username">{member.username}</span>
          <span className="user-email">{member.email}</span>
          <Button
            color="primary"
            onClick={() => handleDelete(member.id)}
            disabled={loading || owner.id === member.id}
          >
            Delete
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default MembersList;
