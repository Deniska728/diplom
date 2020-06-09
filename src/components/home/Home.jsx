import React, { useContext, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { Container, Row, Col, Button } from 'reactstrap';

import SchemasSelector from 'components/home/SchemasSelector';
import FeaturesSection from 'components/home/FeaturesSection';

import SCHEMAS from 'graphql/queries/schemas/schemas';
import MeContext from 'components/auth/MeContext';

const Home = () => {
  const client = useApolloClient();
  const { me, logout } = useContext(MeContext);
  const history = useHistory();
  const { data, loading, refetch } = useQuery(SCHEMAS);

  const handleClick = () => {
    if (me.id) {
      if (window.confirm('Are you sure? Logout?')) {
        logout();
        client.writeQuery({
          query: SCHEMAS,
          data: { schemas: [] },
        });
      }
    } else {
      history.push('/sign-in');
    }
  };

  useEffect(() => {
    if (me.id) refetch();
  }, [me, refetch]);

  return (
    <div className="home-page">
      <Container>
        <Row className="login-row">
          <Col sm={12}>
            <Button color="link" className="login-link" onClick={handleClick}>
              {me.id ? 'Log out' : 'Log in'}
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
                <SchemasSelector schemas={data} loading={loading} user={me} />
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
      <FeaturesSection />
    </div>
  );
};

export default Home;
