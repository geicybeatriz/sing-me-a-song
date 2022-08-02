import {jest} from "@jest/globals";
import { prisma } from "../../src/database.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import recommendationFactory from "./factories.js";

beforeEach(() => {
    jest.clearAllMocks();
})

describe("create recommendation", () => {
    it("should create recommendation successfully", async () => {
        const data = recommendationFactory.createData();
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce(():any => {});
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce(():any => {});

        await recommendationService.insert(data);
        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();
    });

    it("should return conflict error when creating recommendation", async () => {
        const data = recommendationFactory.createData();
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce(():any => {return data});
        const promise = recommendationService.insert(data);
        expect(recommendationRepository.create).not.toBeCalled();
        expect(promise).rejects.toEqual({message:"Recommendations names must be unique", type:"conflict"});
    });
});

describe("add upvote", () => {
    it("should add upvote", async () => {
        const data = await recommendationFactory.createRecommendation();
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(data);
        jest.spyOn(recommendationRepository,"updateScore").mockResolvedValueOnce(data);
        await recommendationService.upvote(data.id);
        expect(recommendationRepository.updateScore).toHaveBeenCalled();
    });

    it("should recommendation id is not found", async () => {
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(undefined);
        const promise = recommendationService.upvote(undefined);
        expect(recommendationRepository.updateScore).not.toHaveBeenCalled();
        expect(promise).rejects.toEqual({message: "", type:"not_found"});
    })
})

describe("add downvote", () => {
    it("should add downvote", async () => {
        const data = await recommendationFactory.createRecommendation();
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(data);
        jest.spyOn(recommendationRepository,"updateScore").mockResolvedValueOnce(data);
        await recommendationService.downvote(data.id);
        expect(recommendationRepository.updateScore).toHaveBeenCalled();
    });

    it("should recommendation id is not found", async () => {
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(undefined);
        const promise = recommendationService.downvote(undefined);
        expect(promise).rejects.toEqual({message: "", type:"not_found"});
    });

    it("should delete a recommendation with score less than -5", async () =>{
        const data = await recommendationFactory.createRecommendation();

        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(data);
        jest.spyOn(recommendationRepository,"updateScore").mockResolvedValueOnce({...data, score: -6});
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce(():any => {});

        await recommendationService.downvote(data.id);
        expect(recommendationRepository.remove).toBeCalled();
    })
});

describe("get all recommendations", () => {
    it("should return all recommendations", async () => {
        const data = await recommendationFactory.createManyRecommendation(10);
        jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce(data);
        await recommendationService.get();
        expect(recommendationRepository.findAll).toHaveBeenCalled();
    });
});

describe("get recommendations by id", () => {
    it("should return recommendation by id", async () => {
        const data = await recommendationFactory.createRecommendation();
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(data);
        await recommendationService.getById(data.id);
        expect(recommendationRepository.find).toHaveBeenCalled();
    });

    it("should return error recommendation", async () => {
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);
        const promise = recommendationService.getById(0);
        expect(promise).rejects.toEqual({type:"not_found", message: ""});
    });
})
