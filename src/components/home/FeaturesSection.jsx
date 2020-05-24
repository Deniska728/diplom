import React from 'react';

import { Container } from 'reactstrap';

const features = [
  {
    name: 'Comments',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    color: '#23a393',
  },
  {
    name: 'Schema Designer',
    comingSoon: true,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    color: '#1f4287',
  },
  {
    name: 'Schema Versions',
    comingSoon: true,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    color: '#fd0054',
  },
];

const FeaturesSection = () => {
  return (
    <Container>
      <div className="features-list">
        {features.map((f) => (
          <div className="feature-item" key={f.name}>
            <h5 className="feature-name" style={{ color: f.color }}>
              {f.name}
            </h5>
            <p className="feature-description">{f.description}</p>
            {f.comingSoon && <span className="coming-soon">Coming soon</span>}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FeaturesSection;
