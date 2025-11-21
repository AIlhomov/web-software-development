import { assertEquals } from "@std/assert";
import { stub } from "@std/testing/mock";
import app from "@src/app.js";
import { helloService } from "@src/services/helloService.js";

Deno.test("GET / returns { message: 'Hello World!' }", async () => {
    const request = new Request("http://localhost/");
    const res = await app.request(request);
    const body = await res.json();
    assertEquals(body, { message: "Hello World!" });
});

Deno.test("POST / returns JSON object with additional message property", async () => {
    const request = new Request("http://localhost/", {
        method: "POST",
        body: JSON.stringify({ data: "Hello!" }),
    });

    const res = await app.request(request);
    const body = await res.json();
    assertEquals(body, { message: "Hello World!", data: "Hello!" });
});

Deno.test("GET /hello returns message from helloService", async () => {
    const request = new Request("http://localhost/hello");
    const res = await app.request(request);
    const body = await res.json();
    assertEquals(body, { message: "Hello service world!" });
});

// new test
Deno.test("GET /hello returns stubbed hello", async () => {
    using getHelloStub = stub(helloService, "getHello", () => "Stubbed Hello!");

    const request = new Request("http://localhost/hello");
    const res = await app.request(request);
    const body = await res.json();
    assertEquals(body, { message: "Stubbed Hello!" });
});