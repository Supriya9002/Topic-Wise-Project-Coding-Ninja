
////PART-1
// import fs from 'fs';

// const fsPromise = fs.promises; //fs has object nameed promise, which allows to create and write data into file or synchronously without 
//                                //using callback

// async function log(logData) {
//     try {
//         logData = `\n ${new Date().toString()} - ${logData}`;
//         await fsPromise.appendFile('log.txt', logData);
//     } catch(err) {
//         console.log(err);
//     }
// }

// const loggerMiddleware = async (req, res, next) => { 
//     // 1. Log request body.
//     if(!req.url.includes("signin")){
//         const logData = `${req.url} - ${JSON.stringify(req.body)}`;
//         await log(logData);
//     }
//     next();
// };

// export default loggerMiddleware;

// const loggerMiddleware = async (req, res, next) => { 
//     // 1. Log request body.
//     await log(req.body);
//     next();
// };


//PART-2
import fs from 'fs';
import winston from 'winston';

const fsPromise = fs.promises;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'request-logging' },
    transports: [ new winston.transports.File({ filename: 'logs.txt'}),],
  });

const loggerMiddleware = async ( req, res, next) => { 
    // 1. Log request body.
    if(!req.url.includes("register")){
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        logger.info(logData);
    }
    next();
};

export default loggerMiddleware;