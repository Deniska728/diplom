import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Container, Row, Col, Button } from 'reactstrap';

import SchemasSelector from 'components/home/SchemasSelector';
import authLockRunner from 'components/auth/authLockRunner';

import SCHEMAS from 'graphql/queries/schemas/schemas';

const Home = ({ user, meRefetch }) => {
  const { data, loading, refetch } = useQuery(SCHEMAS);

  const runAuthLock = () => {
    if (user) {
      if (window.confirm('Are you sure? Logout?')) {
        window.logout();
      }
    } else {
      const lock = authLockRunner({ meRefetch, authCallback: refetch });
      lock.show();
    }
  };

  return (
    <div className="home-page">
      <Container>
        <Row className="login-row">
          <Col sm={12}>
            <Button color="link" className="login-link" onClick={runAuthLock}>
              {user ? 'Log out' : 'Log in'}
            </Button>
          </Col>
        </Row>
        <div className="home-content">
          <Row>
            <Col md={7} className="hidden-md">
              <div className="logo-container">
                <div className="logo-heading">
                  <h1 className="logo">
                    Graph<span className="logo-letter">Q</span>q
                  </h1>
                  <h5 className="subheading">GraphQL Schema collaboration tool</h5>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <div className="schemas-container">
                <SchemasSelector schemas={data} loading={loading} />
              </div>
            </Col>
            <Col md={7} className="hidden-sm">
              <div className="logo-container">
                <div className="logo-heading">
                  <h1 className="logo">
                    Graph<span className="logo-letter">Q</span>q
                  </h1>
                  <h5 className="subheading">GraphQL Schema collaboration tool</h5>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Home;
