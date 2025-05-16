const request = require('supertest');
const app = require('../server');

describe('User Authentication', () => {
    let token;

    it('should sign up a new admin user', async () => {
        const res = await request(app)
            .post('/api/users/signup')
            .send({ email: 'testadmin124534534@example.com', password: 'password123', role: 'admin' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    it('should log in the admin user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ email: 'testadmin@example.com', password: 'password123' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });
});
