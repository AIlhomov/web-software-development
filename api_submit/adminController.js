import * as adminRepository from "./adminRepository.js";

const getStats = async (c) => {
    const stats = await adminRepository.getStats();
    return c.json(stats);
};

export { getStats };
