const request = require('supertest');
const app = require('../server');

let token;
let productId;

beforeAll(async () => {
    const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'testadmin@example.com', password: 'password123' });
    token = res.body.token;
});

describe('Product Routes', () => {
    it('should create a new product', async () => {
        const res = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'iPhone 13', description: 'Apple smartphone', price: 999.99 });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('product');
        productId = res.body.product.id;
    });

    it('should get all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should update a product', async () => {
        const res = await request(app)
            .put(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'iPhone 14', price: 1099.99 });

        expect(res.statusCode).toEqual(200);
        expect(res.body.product.name).toEqual('iPhone 14');
    });

    it('should delete a product', async () => {
        const res = await request(app)
            .delete(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Product deleted');
    });
});
