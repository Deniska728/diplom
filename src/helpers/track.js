import ReactGA from 'react-ga';

const track = (params) => {
  ReactGA.event(params);
};

export default track;
