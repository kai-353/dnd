const log = (message) => {
  var datetime = new Date();

  fs.writeFile(
    "../test.txt",
    `[${datetime.toISOString()}] ${message} \n`,
    { flag: "a+" },
    (err) => {}
  );
};

module.exports = log;
