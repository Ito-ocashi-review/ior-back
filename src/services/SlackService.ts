import {Service} from "@tsed/common";
import Slack = require('slack-node');

@Service()
export class SlackService {

    slack = new Slack();

    // url = 'https://hooks.slack.com/services/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'; // bonus
    url = 'https://hooks.slack.com/services/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'; // log_pra
    fire(){

        this.slack.setWebhook(this.url);
        this.slack.webhook({
          channel: "#ito-ocashi-review",
          username: 'kenta-o',
          text:'test slack',
        }, (err: any, response: any) => {
          // eslint-disable-next-line no-console
          console.log(response);
        });   
    }
}