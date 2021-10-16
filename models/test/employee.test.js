const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

after(() => {
    mongoose.models = {};
  });


  describe('Employee', () => {

    it('should throw an error if no "firstName, lastName, department" arg', () => {
        const emp = new Employee({}); // create new Department, but don't set `name` attr value
      
        emp.validate(err => {
          expect(err.errors.firstName).to.exist;
          expect(err.errors.lastName).to.exist;
          expect(err.errors.department).to.exist;
        });
      
      });

      it('should throw an error if "firstName, lastName, department" is not a string', () => {

        const cases = [{firstName: 'Woj', lastName: 'Dyg', department:{id:'123', name: 'IT'}},
                       {firstName: 'Woj', lastName: {first:'adv', last:'hgd'}, department:'IT'},
                       {firstName: {first:'adv', last:'hgd'}, lastName: 'Dyg', department:'IT'}
    
    ];
        for(let name of cases) {
          const emp = new Employee({ name });
      
          emp.validate(err => {
            expect(err).to.exist;
          });
      
        }
      
      });

      

      it('should not throw an error if "firsName, lastName, department" is okay', () => {

          const emp = new Employee({firstName: 'Woj', lastName: 'Dyg', department: 'IT' });
      
          emp.validate(err => {
            expect(err).to.not.exist;
          });
      
        
      
        });


      
  
  });

  after(() => {
    mongoose.models = {};
  });