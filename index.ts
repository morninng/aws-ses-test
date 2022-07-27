import express from "express";
import AWS, { SESV2 } from "aws-sdk";

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  }
);

app.listen(3000, () => {
  console.log("Start on port 3000.");
});

//  https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html

const ses = new AWS.SESV2({
  sslEnabled: true,
  region: "ap-northeast-1",
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

const sendEmail = () => {
  const simpleRequest: SESV2.Types.SendEmailRequest = {
    Content: {
      Simple: {
        Subject: { Data: "asdf" },
        Body: { Text: { Data: "asdfasdf " } },
      },
    },
    Destination: {
      BccAddresses: ["mr_morninng_star_dash@yahoo.co.jp"],
      CcAddresses: ["mr_morninng_star_dash@yahoo.co.jp"],
      ToAddresses: ["yuta.moriyama@gmail.com"],
    },
    FromEmailAddress: "mr_morninng_star_dash@yahoo.co.jp",
  };

  ses.sendEmail(simpleRequest, (err, data) => {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data); // successful response
    }
  });
};

const sendEmailByTemplate = () => {
  const simpleRequest: SESV2.Types.SendEmailRequest = {
    Content: {
      Template: {
        TemplateName: "teffmfffffss_lla",
        TemplateData: JSON.stringify({ comment: "12345" }),
      },
    },
    Destination: {
      ToAddresses: ["yuta.moriyama@gmail.com"],
    },

    FromEmailAddress: "mr_morninng_star_dash@yahoo.co.jp",
  };

  ses.sendEmail(simpleRequest, (err, data) => {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data); // successful response
    }
  });
};

// template data は
// An object that defines the values to use for message variables in the template. This object is a set of key-value pairs. Each key defines a message variable in the template. The corresponding value defines the value to use for that variable.
// とあり、変数をいれられるっぽい。

// https://docs.aws.amazon.com/ja_jp/ses/latest/APIReference-V2/API_CreateEmailTemplate.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SESV2.html#createEmailTemplate-property

const createEmailTemplate = () => {
  console.log( "createEmailTemplate");
  const data = {
    TemplateContent: {
      Subject: "akkkk",
      Text: "asdf asdf {{comment}} jjj",
    },
    TemplateName: "teffmfffffss_lla",
  };
  ses.createEmailTemplate(data, (err, data) => {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data); // successful response
    }
  });

  //  https://docs.aws.amazon.com/ja_jp/ses/latest/APIReference-V2/API_Template.html
  // template
  //  https://docs.aws.amazon.com/ja_jp/ses/latest/APIReference-V2/API_EmailTemplateContent.html

  // https://docs.aws.amazon.com/ja_jp/ses/latest/dg/send-personalized-email-api.html
};

app.get("/jjj", (req: express.Request, res: express.Response) => {
  sendEmail();
  res.send("jj");
});

app.get("/kkk", (req: express.Request, res: express.Response) => {
  createEmailTemplate();
  res.send("kkk");
});

app.get("/lll", (req: express.Request, res: express.Response) => {
  sendEmailByTemplate();
  res.send("lll");
});
