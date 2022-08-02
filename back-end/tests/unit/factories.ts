import { Recommendation } from "@prisma/client";
import {faker} from "@faker-js/faker";

export type CreateRecommendationData = Omit<Recommendation, "id" | "score">;

function createData(){
    return {
        name: `Teste ${faker.lorem.words(1)}`,
        youtubeLink: "https://youtu.be/perTTMRpc_U"
    }
}

async function createRecommendation(){
    const recommendationInput:CreateRecommendationData = createData();
    const recommendationDB = {...recommendationInput, id: parseInt(faker.random.numeric()), score: 0}
    return recommendationDB;
}

async function createManyRecommendation(amount:number){
    const list:Recommendation[] = [];
    for(let i = 0; i < amount; i++){
        const recommendationInput:CreateRecommendationData = createData();
        const recommendationDB = {...recommendationInput, id: parseInt(faker.random.numeric()), score: 0}
        list.push(recommendationDB);
    }

    return list;
}

const recommendationFactory = {
    createData,
    createRecommendation,
    createManyRecommendation
}
export default recommendationFactory;