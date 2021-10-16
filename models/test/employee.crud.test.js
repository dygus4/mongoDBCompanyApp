const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('Employee', () => {
  

  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getUri();
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {

   before(async () => {
     const testEmpOne = new Employee({ firstName: 'Wo', lastName:'Dy', department: 'IT' });
     await testEmpOne.save();

     const testEmpTwo = new Employee({ firstName: 'Ma', lastName: 'Ke', department: 'cba' });
     await testEmpTwo.save();
   });

   it('should return all the data with "find" method', async () => {
     const employees = await Employee.find();
     const expectedLength = 2;
     expect(employees.length).to.be.equal(expectedLength);
   });

   it('should return proper document by various params with findOne method', async () => {
    const firstNameTest = await Employee.findOne({ firstName: 'Wo' });
    const lastNameTest = await Employee.findOne({ lastName: 'Dy' });
    const departmentTest = await Employee.findOne({ department: 'IT' });
    expect(firstNameTest.firstName).to.be.equal('Wo');
    expect(lastNameTest.lastName).to.be.equal('Dy');
    expect(departmentTest.department).to.be.equal('IT');

   });

   after(async () => {
    await Employee.deleteMany();
   });

  });


  describe('Creating data', () => {

    it('should insert new document with insertOne method.', async () => {
        const employee = new Employee({ firstName: 'Wo', lastName: 'Dy', department: 'IT' });
        await employee.save();
        expect(employee.isNew).to.be.false;
      });

      after(async () => {
        await Employee.deleteMany();
      });
  });

  

  describe('Updating data', () => {

    beforeEach(async () => {
        const testEmpOne = new Employee({ firstName: 'Wo', lastName:'Dy', department: 'IT' });
        await testEmpOne.save();

        const testEmpTwo = new Employee({ firstName: 'Ma', lastName: 'Ke', department: 'cba' });
        await testEmpTwo.save();
    });

      it('should properly update one document with updateOne method', async () => {
        await Employee.updateOne({ firstName: 'Wo', lastName:'Dy', department: 'IT' }, { $set: { firstName: '=Wo=', lastName:'=Dy=', department: '=IT=' }});
        const updatedEmployee = await Employee.findOne({ firstName: '=Wo=', lastName:'=Dy=', department: '=IT=' });
        expect(updatedEmployee).to.not.be.null;
      });
  
      it('should properly update one document with "save" method', async () => {
        const employee = await Employee.findOne({ firstName: 'Wo', lastName:'Dy', department: 'IT' });
        employee.firstName = '=Wo=';
        employee.lastName = '=Dy=';
        employee.department = '=IT=';
        await employee.save();
      
        const updatedEmployee = await Employee.findOne({ firstName: '=Wo=', lastName:'=Dy=', department: '=IT=' });
        expect(updatedEmployee).to.not.be.null;
      });
  
      it('should properly update multiple documents with "updateMany" method', async () => {
        await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
        const employees = await Employee.find({ firstName: 'Updated!' });
        expect(employees.length).to.be.equal(2);
      });


    afterEach(async () => {
        await Employee.deleteMany();
      });
  
  });


  describe('Removing data', () => {

    beforeEach(async () => {
        const testEmpOne = new Employee({ firstName: 'Wo', lastName:'Dy', department: 'IT' });
        await testEmpOne.save();

        const testEmpTwo = new Employee({ firstName: 'Ma', lastName: 'Ke', department: 'cba' });
        await testEmpTwo.save();
      });

      it('should properly remove one document with "deleteOne" method', async () => {
        await Employee.deleteOne({ firstName: 'Wo' });
        const removeDepartment = await Employee.findOne({ firstName: 'Wo' });
        expect(removeDepartment).to.be.null;
      });

      
      it('should properly remove one document with "remove" method', async () => {
        const employee = await Employee.findOne({ firstName: 'Wo' });
        await employee.remove();
        const removedEmployee = await Employee.findOne({ firstName: 'Wo' });
        expect(removedEmployee).to.be.null;
      });
  
      it('should properly remove multiple documents with "deleteMany" method', async () => {
        await Employee.deleteMany();
        const employees = await Employee.find();
        expect(employees.length).to.be.equal(0);
      });

    afterEach(async () => {
        await Employee.deleteMany();
      });
  
  });


  

  

  
});