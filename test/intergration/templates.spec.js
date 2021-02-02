const request = require("supertest");

const app = require("../../app");
const CategoryService = require("../../services/categories");
const { thumbnailPath, assetPath } = require("../data/templates");

let categoryId;
let categoryName;

describe("[POST] /api/templates", () => {
	it("템플릿 생성 성공", async () => {
		const [category] = await CategoryService.findAll();
		categoryId = category.id;
		categoryName = category.name;

		const response = await request(app)
			.post(`/api/templates`)
			.field("name", `템플릿${Date.now()}`)
			.field("categoryId", `${categoryId}`)
			.attach("thumbnail", thumbnailPath)
			.attach("asset", assetPath);

		expect(response.statusCode).toBe(201);
		expect(response.body.result).toBe("템플릿이 생성되었습니다.");
	});

	it("파일을 첨부하지 않을 경우 오류 발생", async () => {
		const response = await request(app)
			.post(`/api/templates`)
			.field("name", `템플릿${Date.now()}`)
			.field("categoryId", `${categoryId}`);

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("템플릿의 썸네일 이미지를 첨부하세요.");
	});

	it("썸네일만 첨부할 경우 에쎗 파일 업로드 오류 발생", async () => {
		const response = await request(app)
			.post(`/api/templates`)
			.field("name", `템플릿${Date.now()}`)
			.field("categoryId", `${categoryId}`)
			.attach("thumbnail", thumbnailPath);

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("템플릿의 에쎗 파일을 첨부하세요.");
	});

	it("카테고리를 선택하지 않았을 경우 오류 발생", async () => {
		const response = await request(app)
			.post(`/api/templates`)
			.field("name", `템플릿${Date.now()}`)
			.attach("thumbnail", thumbnailPath)
			.attach("asset", assetPath);

		expect(response.statusCode).toBe(400);
		expect(response.body.error.message).toBe("카테고리를 선택하세요.");
	});

	it("카테고리가 유효하지 않을 경우 오류 발생", async () => {
		const response = await request(app)
			.post(`/api/templates`)
			.field("name", `템플릿${Date.now()}`)
			.field("categoryId", `test`)
			.attach("thumbnail", thumbnailPath)
			.attach("asset", assetPath);

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("유효하지 않은 카테고리 입니다.");
	});

	it("템플릿 이름이 중복일 경우 오류 발생", async () => {
		const response = await request(app)
			.post(`/api/templates`)
			.field("name", `${categoryName}`)
			.field("categoryId", `${categoryId}`)
			.attach("thumbnail", thumbnailPath)
			.attach("asset", assetPath);

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("이미 사용중인 이름입니다.");
	});
});

describe("[GET] /api/templates", () => {
	it("템플릿 전체 목록 조회", async () => {
		const response = await request(app).get(`/api/templates`);
		const { result } = response.body;

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(result)).toBeTruthy();
		expect(result[0].id).toBeDefined();
		expect(result[0].name).toBeDefined();
		expect(result[0].thumbnailUrl).toBeDefined();
		expect(result[0].assetUrl).toBeDefined();
		expect(result[0].visible).toBeDefined();
		expect(result[0].category.id).toBeDefined();
		expect(result[0].category.name).toBeDefined();
		expect(result[0].category.visible).toBeDefined();
	});
});
