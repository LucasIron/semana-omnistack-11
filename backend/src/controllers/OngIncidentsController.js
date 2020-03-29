
const connection = require('../database/connection');

module.exports = {
    index(request, response) {
        console.log({request});
        const { headers } = request;
        console.log({headers});
        const { authorization: ong_id } = headers;

        return connection('incidents')
        .where('ong_id', ong_id)
        .select(['id', 'title', 'description', 'value'])
        .then((incidents) => response.json(incidents.map(({ id, title, description, value }) => ({
            id,
            title,
            description,
            value,
            ong: { id: ong_id },
        }))));
    },
}
