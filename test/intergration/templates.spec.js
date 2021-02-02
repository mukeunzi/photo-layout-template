const request = require("supertest");

const app = require("../../app");
const { thumbnailPath, assetPath, updateTemplate } = require("../data/templates");
const { newCategory } = require("../data/categories");

let categoryId;
let templateId;
const templateName = `템플릿${Date.now()}`;

beforeAll(async () => {
	await request(app).post(`/api/categories`).send(newCategory);

	const response = await request(app).get(`/api/categories`);
	categoryId = response.body.result[0].id;
});

describe("[POST] /api/templates", () => {
	it("템플릿 생성 성공", async () => {
		const response = await request(app)
			.post(`/api/templates`)
			.field("name", `${templateName}`)
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
			.field("name", `${templateName}`)
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

		templateId = result[0].id.toString();
	});
});

describe("[GET] /api/templates/search", () => {
	it("템플릿 이름 검색 성공", async () => {
		const response = await request(app).get(
			`/api/templates/search?q=${encodeURIComponent(templateName.substring(0, 2))}`
		);
		const { result } = response.body;

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(result)).toBeTruthy();
	});
});

describe("[GET] /api/templates/download/:id/:fileType", () => {
	it("템플릿 썸네일 이미지 다운로드 성공", async () => {
		const response = await request(app).get(`/api/templates/download/${templateId}/thumbnail`);
		expect(response.statusCode).toBe(200);
	});

	it("템플릿 에쎗 파일 다운로드 성공", async () => {
		const response = await request(app).get(`/api/templates/download/${templateId}/asset`);
		expect(response.statusCode).toBe(200);
	});

	it("템플릿 id가 유효하지 않을 경우 오류 발생", async () => {
		const response = await request(app).get(`/api/templates/download/test/asset`);

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("존재하지 않는 템플릿입니다.");
	});

	it("파일 타입(thumbnail, asset)이 유효하지 않을 경우 오류 발생", async () => {
		const response = await request(app).get(`/api/templates/download/${templateId}/gif`);

		expect(response.statusCode).toBe(400);
		expect(response.body.error.message).toBe("다운로드할 파일을 다시 선택하세요.");
	});
});

describe("[PATCH] /api/templates/:id", () => {
	it("카테고리 수정 성공", async () => {
		const response = await request(app)
			.patch(`/api/templates/${templateId}`)
			.send({ ...updateTemplate, categoryId });
		const { result } = response.body;

		expect(response.statusCode).toBe(200);
		expect(result.id).toBe(templateId);
		expect(result.categoryId).toBe(categoryId);
		expect(result.name).toBe(updateTemplate.name);
		expect(result.visible).toBe(updateTemplate.visible);
	});

	it("템플릿 id가 유효하지 않을 경우 오류 발생", async () => {
		const response = await request(app)
			.patch(`/api/templates/test`)
			.send({ ...updateTemplate, categoryId });

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("존재하지 않는 템플릿입니다.");
	});

	it("템플릿의 카테고리 id가 유효하지 않을 경우 오류 발생", async () => {
		const response = await request(app)
			.patch(`/api/templates/${templateId}`)
			.send({ ...updateTemplate, categoryId: "test" });

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("존재하지 않는 카테고리입니다.");
	});
});

describe("[DELETE] /api/templates/:id", () => {
	it("템플릿 삭제 성공", async () => {
		const response = await request(app).delete(`/api/templates/${templateId}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.result).toBe("템플릿이 삭제되었습니다.");
	});

	it("템플릿 id가 유효하지 않을 경우 오류 발생", async () => {
		const response = await request(app).delete(`/api/templates/test`);

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("존재하지 않는 템플릿입니다.");
	});
});
