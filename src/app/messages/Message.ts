export class Message {
  text: string;
  userFrom: string;
  userAt: string;
  time: Date;

  constructor(text, userFrom, userAt, time) {
    this.text = text;
    this.userFrom = userFrom;
    this.userAt = userAt;
    this.time = time;
  }
}
