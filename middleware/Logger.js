import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import  fsPromis  from "fs/promises";
import path from "path";

const logsEvent = async (message, logFileName) => {
  const __dirname = path.resolve();
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromis.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromis.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logsEvent(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logsEvent, logger };
