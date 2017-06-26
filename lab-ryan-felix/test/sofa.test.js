const Sofa = require('../model/sofa.js');
const expect = require('expect');

describe('sofa model', () => {

  it('should construct a sofa', () => {
    const testSofa = new Sofa();
    expect(testSofa).toExist();
  });

  it('should accept some valid parameters without error', () => {
    const testSofa = new Sofa();
    testSofa.material = 'leather';
    testSofa.colors = ['red', 'blue'];
    testSofa.price = 250;
    testSofa.discount = {
      price: 200,
      endDate: new Date(2550, 7, 24),
    };
    const validation = testSofa.validateSync();
    expect(validation).toEqual(undefined);
  });

  it('should reject incorrect material', () => {
    const testSofa = new Sofa({
      material: 'copper',
      colors: ['copper'],
      price: 1000,
    });
    expect(testSofa.validateSync().errors['material']).toExist();
  });

  it('should reject if required fields are missing', () => {
    const testSofa = new Sofa();
    const validation = testSofa.validateSync();
    expect(validation.errors['material']).toExist();
    expect(validation.errors['colors']).toExist();
    expect(validation.errors['price']).toExist();
    expect(validation.errors['discount']).toNotExist();
  });

  it('should reject if discount price is higher than regular price', () => {
    const testSofa = new Sofa({
      material: 'leather',
      colors: ['red'],
      price: 100,
      discount: {
        price: 200,
        endDate: new Date(2550, 7, 25),
      },
    });

    const validation = testSofa.validateSync();
    expect(validation.errors['discount.price']).toExist();
  });

  it('should reject if discount end date is in the past', () => {
    const testSofa = new Sofa({
      material: 'cloth',
      colors: ['gray'],
      price: 300,
      discount: {
        price: 200,
        endDate: new Date(1975, 2, 2),
      },
    });

    const validation = testSofa.validateSync();
    expect(validation.errors['discount.endDate']).toExist();
  });

});
