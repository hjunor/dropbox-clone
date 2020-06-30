const File = require('../models/File');
const Box = require('../models/Box')

class FileController {
  async store(request, response) {
    const box = await Box.findById(request.params.id)

    const file = await File.create({
      title: request.file.originalname,
      path: request.file.key,
    })

    box.files.push(file);
    await box.save()
    req.io.sockets.in(box._id).emit('file', file);

    return response.json(file);
  }
}

module.exports = new FileController();