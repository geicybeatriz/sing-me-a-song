import { prisma } from "../database.js";

async function deleteData(){
    return await prisma.recommendation.deleteMany({});
}

const e2eRepository = {
    deleteData
};

export default e2eRepository;