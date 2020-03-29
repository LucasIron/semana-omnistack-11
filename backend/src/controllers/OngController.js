
const generateUniqueId = require('../utils/generateUniqueId');

const connection = require('../database/connection');

module.exports = {
    index(request, response) {
        return connection('ongs').select('*').then((ongs) => response.json(ongs));
    },

    create(request, response) {
        const { body } = request;
        const { name, email, whatsapp, city, uf } = body;
        const id = generateUniqueId();
    
        return connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        }).then(() => {
            return response.json({ id });
        });
    },
}
