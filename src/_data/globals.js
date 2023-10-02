module.exports = () => {
  const now = new Date();
  const unixTimestamp = Math.floor(now.getTime() / 1000);
  return {
    buildTime: unixTimestamp,
  };
};
