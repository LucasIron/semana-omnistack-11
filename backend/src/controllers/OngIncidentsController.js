
const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {
    index(request, response) {
        const { headers } = request;
        const { authorization: ong_id } = headers;

        return connection('incidents').where('ong_id', ong_id).select('*').then((incidents) =>
            response.json(incidents)
        );
    },
}
