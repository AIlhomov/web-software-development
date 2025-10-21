import { hash, verify } from "scrypt";

const hashedPassword = hash("saippuakivikauppias");
console.log(hashedPassword);