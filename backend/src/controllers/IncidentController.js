
const knex = require('knex');
const connection = require('../database/connection');

const { raw } = knex;

module.exports = {
    index(request, response) {
        const { query } = request;
        const { page = 1, limit = 5 } = query;
        const offset = (page - 1) * limit;

        return Promise.all([
            connection('incidents')
                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                .limit(limit)
                .offset(offset)
                .select([
                    'incidents.*',
                    'ongs.name as ong_name',
                    'ongs.email as ong_email',
                    'ongs.whatsapp as ong_whatsapp',
                    'ongs.city as ong_city',
                    'ongs.uf as ong_uf'
                ]),
            connection('incidents').count()
        ]).then(([incidents, [count]]) =>
            response
                .header('X-Total-Count', count['count(*)'])
                .json(incidents.map(({ ong_id, ong_name, ong_email, ong_whatsapp, ong_city, ong_uf, ...rest }) => ({
                    ...rest,
                    ong: {
                        id: ong_id,
                        name: ong_name,
                        email: ong_email,
                        whatsapp: ong_whatsapp,
                        city: ong_city,
                        uf: ong_uf,
                    },
                })))
        );
    },

    create(request, response) {
        const { headers, body } = request;
        const { authorization: ong_id } = headers;
        const { title, description, value } = body; 
    
        return connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        }).then(([id]) => {
            return response.json({ id });
        });
    },

    delete(request, response) {
        const { headers, params } = request;
        const { authorization } = headers;
        const { id } = params;

        return connection('incidents').where('id', id).select('ong_id').first()
        .then((incident) => {
            if (!incident) return response.status(400).send({ error: 'No incident found with this Id' });
            const { ong_id } = incident;

            return ong_id !== authorization
                ? response.status(401).json({ error: 'Operation not permitted.' })
                : connection('incidents').where('id', id).delete().then((data) => {
                    return response.status(204).send();
                });
        });
    },
}
