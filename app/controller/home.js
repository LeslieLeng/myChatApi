'use strict';

const { Controller } = require('egg');
const { Configuration, OpenAIApi } = require('openai');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getchat() {
    const { ctx } = this;
    const { input } = ctx.request.body;
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: input }],
    });
    console.log(completion.data.choices[0].message);


    ctx.body = {
      code: 200,
      message: '请求成功',
      data: completion.data.choices[0].message,
    };
  }
}

module.exports = HomeController;
