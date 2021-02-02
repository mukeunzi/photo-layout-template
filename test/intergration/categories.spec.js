const request = require("supertest");

const app = require("../../app");
const CategoryService = require("../../services/categories");
const { newCategory } = require("../data/categories");

describe("[POST] /api/categories", () => {
	it("카테고리 생성 성공", async () => {
		const response = await request(app).post(`/api/categories`).send(newCategory);
		expect(response.statusCode).toBe(201);
		expect(response.body.result).toBe("카테고리가 생성되었습니다.");
	});

	it("카테고리 이름이 이미 존재할 경우 오류 발생", async () => {
		const [category] = await CategoryService.findAll();
		const response = await request(app).post(`/api/categories`).send({ name: category.name });
		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("이미 사용중인 이름입니다.");
	});
});
