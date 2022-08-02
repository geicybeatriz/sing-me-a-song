import {jest} from "@jest/globals";
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
});

describe("get random recommendations", () => {
    it("should return recommendations with score bigger than 10, when random bigger than 0.7", async () => {
        const data = await recommendationFactory.createRecommendation();
        const biggerScoreData = {...data, score:15};


        jest.spyOn(Math, "random").mockImplementationOnce(():any => 0.7);
        jest.spyOn(Math, "floor").mockImplementationOnce(():any => 0);
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce(():any => [biggerScoreData, {...data, id:3}]);

        const promise = await recommendationService.getRandom();

        expect(Math.random).toBeCalled();
        expect(Math.floor).toBeCalled();
        expect(recommendationRepository.findAll).toBeCalled();
        expect(promise).toBe(biggerScoreData);
    });

    it("should return recommendations with score less than 10, when random bigger than 0.3", async () => {
        const data = await recommendationFactory.createRecommendation();
        const biggerScoreData = {...data, score:15};

        jest.spyOn(Math, "random").mockImplementationOnce(():any => 0.3);
        jest.spyOn(Math, "floor").mockImplementationOnce(():any => 0);
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce(():any => [{...data, id:3}, biggerScoreData]);

        const promise = await recommendationService.getRandom();

        expect(Math.random).toBeCalled();
        expect(Math.floor).toBeCalled();
        expect(recommendationRepository.findAll).toBeCalled();
        expect(promise).not.toBe(biggerScoreData);
    });

    it("should return recommendations when all recommendations score > 10", async () => {
        const data = await recommendationFactory.createManyRecommendation(5);
        data.map(item => {item.score = 20});
        const index:number = Math.floor(Math.random()*data.length)
        
        jest.spyOn(Math, "random").mockImplementationOnce(():any => 1);
        jest.spyOn(Math, "floor").mockImplementationOnce(():any => index);
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce(():any => data);

        const promise = await recommendationService.getRandom();

        expect(Math.random).toBeCalled();
        expect(Math.floor).toBeCalled();
        expect(recommendationRepository.findAll).toBeCalled();
        expect(promise).toBe(data[index]);
    });

    it("should return recommendations when all recommendations score <= 10", async () => {
        const data = await recommendationFactory.createManyRecommendation(5);
        data.map(item => {item.score = 8});
        const index:number = Math.floor(Math.random()*data.length)
        
        jest.spyOn(Math, "random").mockImplementationOnce(():any => 1);
        jest.spyOn(Math, "floor").mockImplementationOnce(():any => index);
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce(():any => data);

        const promise = await recommendationService.getRandom();

        expect(Math.random).toBeCalled();
        expect(Math.floor).toBeCalled();
        expect(recommendationRepository.findAll).toBeCalled();
        expect(promise).toBe(data[index]);
    });

    it("should return error when recommendations not exists", () => {
        jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([]);

        const promise = recommendationService.getRandom();

        expect(recommendationRepository.findAll).toBeCalled();
        expect(promise).rejects.toEqual({message:"", type:"not_found"});
    });
});

describe("get top recommendations", () => {
    it("get recommendations with biggest scores", async () => {
        const amount:number = 10;
        const data = await recommendationFactory.createManyRecommendation(10);

        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce(():any => data);
        const promise = await recommendationService.getTop(10);

        expect(recommendationRepository.getAmountByScore).toBeCalled();
        expect(promise).toBe(data);
    });
});
