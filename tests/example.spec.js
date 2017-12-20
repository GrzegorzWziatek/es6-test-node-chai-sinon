const expect = require('chai').expect;

describe('First test', () => {
    it('should sum correctly 2 and 3', function () {
        const result = 2 + 3;

        expect(result).to.equal(5);
    });
});