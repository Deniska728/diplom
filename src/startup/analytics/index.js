import ReactGA from 'react-ga';

const trackingId = 'UA-169311730-1';
const secondTrackingId = 'UA-169314281-1';

ReactGA.initialize([
  {
    trackingId,
  },
  {
    trackingId: secondTrackingId,
  },
]);
