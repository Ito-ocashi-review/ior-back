import "@tsed/ajv";
import {PlatformApplication} from "@tsed/common";
import {Configuration, Inject} from "@tsed/di";
import "@tsed/mongoose";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/swagger";

import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import mongooseConfig from "./config/index";
import * as session from "express-session";
import * as cors from "cors";

import {IndexCtrl} from "./controllers/IndexCtrl";
import {SweetsCtrl} from "./controllers/SweetsCtrl";
import {UsersCtrl} from "./controllers/UsersCtrl";
import {ReviewsCtrl} from "./controllers/ReviewsCtrl";
import {PassportCtrl} from "./controllers/PassportCtrl";

import {User} from "./models/User";

export const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8000,
  httpsPort: false, // CHANGE
  mongoose: mongooseConfig,
  mount: {
    "/api": [
      SweetsCtrl, 
      UsersCtrl,
      ReviewsCtrl,
      PassportCtrl
    ],
    "/": [IndexCtrl]
  },
  componentsScan: [
    `${rootDir}/protocols/*{.ts,.js}` // scan protocols directory
  ],
  swagger: [
    {
      path: "/v1/docs",
      specVersion: "2.0"
    },
  ],
  views: {
    root: `${rootDir}/../views`,
    viewEngine: "ejs"
  },
  exclude: ["**/*.spec.ts"],
  passport: {
    userInfoModel: User
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        }))     
      .use(session({
        secret: "mysecretkey",
        resave: true,
        saveUninitialized: true,
        cookie: {
          path: "/",
          httpOnly: true,
          secure: false,
          maxAge: 36000,
        }
      }));
  }
}
