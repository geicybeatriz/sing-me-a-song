import superteste from "supertest";
import app from "../../src/app.js";
import {prisma} from "./../../src/database.js"
import recommendationFactory from "./intFactories.js";

const agent = superteste(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});

describe("create new recommendation", () => {
    it("should return 201 for valid inputs", async () => {
        const recommendation = recommendationFactory.createData();
        const result = await agent.post("/recommendations").send(recommendation);

        const check = await prisma.recommendation.findFirst({
            where: recommendation
        });

        expect(result.status).toEqual(201);
        expect(check).not.toBeNull();
    });

    it("should return 422 for invalid name input", async () => {
        const recommendation = recommendationFactory.createData();
        const result = await agent.post("/recommendations").send({...recommendation, name: ""});
        expect(result.status).toEqual(422);
    });

    it("should return 422 for invalid link input", async () => {
        const recommendation = recommendationFactory.createData();
        const result = await agent.post("/recommendations").send({...recommendation, youtubeLink: "123link"});
        expect(result.status).toEqual(422);
    });

    it("should return 409 for invalid link input", async () => {
        const recommendation = recommendationFactory.createData();
        const result = await agent.post("/recommendations").send({...recommendation, name: "teste Conflito"});
        expect(result.status).toEqual(201);
        
        const resultConflict = await agent.post("/recommendations").send({...recommendation, name: "teste Conflito"});
        expect(resultConflict.status).toEqual(409);
    })
});

describe("vote in recommendation", () => {
    it("add upvote", async () => {
        const recommendation = await recommendationFactory.createRecommendation();
        const result = await agent.post(`/recommendations/${recommendation.id}/upvote`);
        expect(result.status).toEqual(200);

        const checkUpvoted = await prisma.recommendation.findFirst({
            where: {id: recommendation.id}
        });
        expect(checkUpvoted.score).toBe(recommendation.score + 1);
    });

    it("add downvote", async () => {
        const recommendation = await recommendationFactory.createRecommendation();
        const result = await agent.post(`/recommendations/${recommendation.id}/downvote`);
        expect(result.status).toEqual(200);

        const checkUpvoted = await prisma.recommendation.findFirst({
            where: {id: recommendation.id}
        });
        expect(checkUpvoted.score).toBe(recommendation.score - 1);
    })

    it("return not found error when id not exists", async () => {
        const result = await agent.post("/recommendations/0/downvote");
        expect(result.status).toEqual(404);

        const check = await prisma.recommendation.findFirst({
            where: {id: 0}
        });
        expect(check).toBe(null);
    })
})

afterAll(async () => {
    await prisma.$disconnect();
})