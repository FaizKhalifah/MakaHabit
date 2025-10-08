beforeEach(()=>{
    console.log("sebelum tiap test");
})

afterEach(()=>{
    console.log("setelah tiap test");
})

test("setup test berjalan dengan benar", () => {
  expect(true).toBe(true);
});