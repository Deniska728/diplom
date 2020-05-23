import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Container, Row, Col, Button } from 'reactstrap';

import SCHEMAS from 'graphql/queries/schemas/schemas';

const Home = ({ user }) => {
  const { data } = useQuery(SCHEMAS);

  return (
    <div className="home-page">
      <Container>
        <Row className="login-row">
          <Col sm={12}>
            <Button color="link" className="login-link" onClick={() => {}}>
              {user ? 'Log out' : 'Log in'}
            </Button>
          </Col>
        </Row>
        <div className="home-content"></div>
      </Container>
    </div>
  );
};

export default Home;
