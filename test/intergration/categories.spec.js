const request = require("supertest");

const app = require("../../app");
const CategoryService = require("../../services/categories");
const { newCategory } = require("../data/categories");

let categoryId;

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

describe("[GET] /api/categories", () => {
	it("카테고리 전체 목록 조회", async () => {
		const response = await request(app).get(`/api/categories`);
		const { result } = response.body;

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(result)).toBeTruthy();
		expect(result[0].id).toBeDefined();
		expect(result[0].name).toBeDefined();
		expect(result[0].visible).toBeDefined();
		categoryId = result[0].id;
	});
});

describe("[GET] /api/categories/:id", () => {
	it("카테고리 단건 조회 성공", async () => {
		const response = await request(app).get(`/api/categories/${categoryId}`);
		const { result } = response.body;

		expect(response.statusCode).toBe(200);
		expect(result.id).toBeDefined();
		expect(result.name).toBeDefined();
		expect(result.visible).toBeDefined();
	});

	it("카테고리 id가 유효하지 않을 경우 오류 발생", async () => {
		const response = await request(app).get(`/api/categories/test`);

		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe("존재하지 않는 카테고리입니다.");
	});
});
