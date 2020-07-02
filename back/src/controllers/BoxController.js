const Box = require('../models/Box');

class BoxController {
  async store(request, response) {
    const { title } = request.body
    const box = await Box.create({ title })

    return response.json(box);
  }
  async show(request, response) {
    const box = await Box
      .findById(request.params.id)
      .populate({
        path: 'files',
        options: { sort: { createdAt: -1 } }
      })

    return response.json(box)

  }

}

module.exports = new BoxController();
