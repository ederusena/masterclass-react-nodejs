class HelloController {
  async index(req, res) {
    return res.json({ hello: 'Hello World' });
  }
}

export default new HelloController();