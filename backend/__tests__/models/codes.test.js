
const fetch = require('node-fetch');
const codes = require('../../models/codes');

jest.mock('node-fetch');

describe('getCodes', () => {
    it('should fetch codes and return in the response', async () => {
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                RESPONSE: {
                    RESULT: [{
                        ReasonCode: [{ Code: '1', Level1Description: 'Test' }]
                    }]
                }
            })
        });

        const mockReq = {};
        const mockRes = {
            json: jest.fn()
        };

        await codes.getCodes(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({
            data: [{ Code: '1', Level1Description: 'Test' }],
        });
    });
});
