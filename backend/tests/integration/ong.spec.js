
const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(() =>
        connection.migrate.rollback().then(() =>
            connection.migrate.latest()
        )
    );

    it('shoud create a new ONG', () => {
        return request(app).post('/ongs').send({
            name: "Teste 4",
            email: "teste@4.com",
            whatsapp: "00000000000",
            city: "Teste 3",
            uf: "T3",
        }).then((response) => {
            const { body } = response;
            expect(body).toHaveProperty('id');
            expect(body.id).toHaveLength(8);
        });
    });

    afterAll(() => connection.destroy());
});
