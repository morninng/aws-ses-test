import express from "express";
import AWS, { SESV2 } from "aws-sdk";



const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
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

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: "User1", email: "user1@test.local" },
  { id: 2, name: "User2", email: "user2@test.local" },
  { id: 3, name: "User3", email: "user3@test.local" },
];

//一覧取得
app.get("/users", (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(users));
});

//  https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html

console.log(process.env.KEY1)

const ses = new AWS.SESV2({
  sslEnabled: true,
  region: "ap-northeast-1",
  accessKeyId: process.env.accessKeyId, // morninng
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
    //   ToAddresses: ["yuta.moriyama@gmail.com"],
      ToAddresses: ["mr_morninng_star_dash@yahoo.co.jp"]
    },
    // FromEmailAddress: "mr_morninng_star_dash@yahoo.co.jp",
    FromEmailAddress: "yuta.moriyama@gmail.com",
  };

  ses.sendEmail(simpleRequest, (err, data) => {
    if (err){
        console.log(err, err.stack); // an error occurred
    } else{
        console.log(data); // successful response
    }
  });
};

app.get("/jjj", (req: express.Request, res: express.Response) => {
  sendEmail();
  res.send("jj");
});
