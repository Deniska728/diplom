import React from 'react';

import { Container } from 'reactstrap';

const features = [
  {
    name: 'Comments',
    description: 'Add a graphql schema and discuss it with your colleagues.',
    color: '#23a393',
  },
  {
    name: 'Schema Designer',
    description: 'Try it in the application ',
    link: {
      href: 'https://fujix.io/',
      name: 'Fuji X',
    },
    color: '#1f4287',
  },
  {
    name: 'Schema Versions',
    comingSoon: true,
    description: "We're working on this feature. It will be available in next releases.",
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
            <p className="feature-description">
              {f.description}
              {f.link ? (
                <a href={f.link.href} target="_blank" rel="noopener noreferrer">
                  {f.link.name}
                </a>
              ) : null}
            </p>
            {f.comingSoon && <span className="coming-soon">Coming soon</span>}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FeaturesSection;
