import e2eRepository from "../repositories/e2eRepository.js";

async function deleteData(){
    await e2eRepository.deleteData();
}

const e2eService = {
    deleteData
};

export default e2eService;