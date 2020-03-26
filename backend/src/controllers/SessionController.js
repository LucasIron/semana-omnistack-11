
const connection = require('../database/connection');

module.exports = {
    create(request, response) {
        const { body } = request;
        const { id } = body;

        return connection('ongs').where('id', id).select('name').first().then((ong) =>
            ong ? response.json(ong) : response.status(400).json({ error: 'No ONG foundwith this ID' })
        );
    },
}
