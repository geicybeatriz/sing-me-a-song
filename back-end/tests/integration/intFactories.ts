import { Recommendation } from "@prisma/client";
import { prisma } from "../../src/database.js";
import {faker} from "@faker-js/faker";

export type CreateRecommendationData = Omit<Recommendation, "id" | "score">;

function createData(){
    return {
        name: `Teste ${faker.lorem.words(2)}`,
        youtubeLink: "https://youtu.be/perTTMRpc_U"
    }
}

async function createRecommendation(){
    const recommendation:CreateRecommendationData = createData();
    return await prisma.recommendation.create({
        data: recommendation
    });
}

async function createManyRecommendation(amount:number){
    for(let i = 0; i < amount; i++){
        const recommendation = {
            name: faker.music.songName(),
            youtubeLink: "https://youtu.be/perTTMRpc_U",
            score: parseInt(faker.random.numeric())

        };
        await prisma.recommendation.create({
            data: recommendation
        });
    }
}

const recommendationFactory = {
    createData,
    createRecommendation,
    createManyRecommendation
}
export default recommendationFactory;