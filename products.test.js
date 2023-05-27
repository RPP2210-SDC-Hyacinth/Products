const query = require('./dist/database/query');

describe('simple addition', () => {
  it('What does 1 + 1 equal?', () => {
    expect(1 + 1).toEqual(2);
  });
});

test('Querying for one product should take less than 50ms', async () => {
  const id = 1000011;

  const startTime = new Date().getTime();
  await query.getOneProduct(id);
  const endTime = new Date().getTime();
  const queryTime = endTime - startTime;

  expect(queryTime).toBeLessThanOrEqual(50);
});

test('Querying for the styles api should take less than 50ms', async () => {
  const id = 1000011;

  const startTime = new Date().getTime();
  await query.getStyles(id);
  const endTime = new Date().getTime();
  const queryTime = endTime - startTime;

  expect(queryTime).toBeLessThanOrEqual(50);
});
