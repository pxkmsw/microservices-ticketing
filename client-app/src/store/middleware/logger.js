const logger = ({ destination }) => store => next => action => {
  // console.log("Logging", destination);
  return next(action);
};

export default logger;
