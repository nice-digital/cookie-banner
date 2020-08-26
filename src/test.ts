function sum(a: number, b: number): number {
	return a + b;
}

describe("Example test", () => {
	it("adds 1 + 2 to equal 3", () => {
		expect(sum(1, 2)).toBe(3);
	});
});
