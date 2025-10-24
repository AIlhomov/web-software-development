import { z } from "@zod/zod";

const validator = z.object({
    email: z.string().email(),
});

let result = validator.safeParse({
    garbage: "not needed",
    email: "another@email.com",
});

console.log(result);
// This can help avoid working with unnecessary data and can also help avoid security issues where unexpected data is sent to the server.