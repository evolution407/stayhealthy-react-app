const mongoose = require('mongoose');

const mongoURI =
  "mongodb://root:7Z3C22mL7ua9eAxceIEKG8mo@172.21.78.6:27017/stayhealthybeta1?authSource=admin";

const connectToMongo = async (retryCount) => {
  const MAX_RETRIES = 3;
  const count = retryCount ?? 0;

  try {
    await mongoose.connect(mongoURI);
    console.info('Connected to Mongo Successfully');
    return;
  } catch (error) {
    console.error(error);

    const nextRetryCount = count + 1;

    if (nextRetryCount >= MAX_RETRIES) {
      throw new Error('Unable to connect to Mongo!');
    }

    console.info(`Retrying, retry count: ${nextRetryCount}`);
    return await connectToMongo(nextRetryCount);
  }
};

module.exports = connectToMongo;