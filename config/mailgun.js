const mailgun = require("mailgun-js");
const SimpleNodeLoggerError = require("simple-node-logger");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_BASE_URL
});

const optsE = {
  logFilePath: "error.log",
  timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS"
};

const errorLog = SimpleNodeLoggerError.createSimpleLogger(optsE);

const data = {
  from: `Gabay APP error <${process.env.MAILGUN_ERROR_EMAIL}>`,
  to: process.env.DEVELOPER_EMAIL
};

const errorHandler = (errorMsg, path, title) => {
  data.subject = title;
  data.text = `Error in path: ${path} \n Message: ${errorMsg}`;
  if(process.env.DEBUG_MODE === '1'){
    console.log('title: ',title);
    console.log('errorMsg: ',errorMsg); 
    console.log('path: ',path);
    console.log();
    
    return false; 
  }
  
  mg.messages().send(data, function(error, body) {
    if (error) {
      console.log('messagesE',error);
      
      errorLog.info(
        `mailgunError sending mail to developers in error:${error} body: ${body}`
        );
      }
      
      errorLog.info(`mailgunErrorHandler In : ${path} Message : ${errorMsg}`);
  });
};
module.exports = { errorHandler: errorHandler };
