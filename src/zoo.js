const { employees } = require('./data');
const data = require('./data');

function getSpeciesByIds(ids = '', ids2 = '') {
  return data.species.reduce((acumulador, species) => {
    // if (!Object.keys(acumulador).includes([])) {
    //   acumulador = [];
    // }
    if (ids === '') {
      return acumulador = [];
    } else {
      acumulador = [];
      const specieId = data.species.find(species => ids === species.id);
      const addSpecie = {
        id: specieId.id,
        name: specieId.name,
        popularity: specieId.popularity,
        location: specieId.location,
        residents: specieId.residents,
      }
      acumulador.push(addSpecie)
      if (ids2 !== '') {
        const specieId2 = data.species.find(species => ids2 === species.id);
        const addSpecie2 = {
          id: specieId2.id,
          name: specieId2.name,
          popularity: specieId2.popularity,
          location: specieId2.location,
          residents: specieId2.residents,
        }
        acumulador.push(addSpecie2)
      }
    }
    return acumulador
  });
}

function getAnimalsOlderThan(animal, age) {
  return data.species.reduce((acumulador2, nomeIdade) => {
    const specieName = data.species.find(species => animal === species.name);
    if (Object.values(specieName.residents).every((residents) => residents.age >= age)) {
      return true;
    } else {
      return false;
    }
  });
}

function getEmployeeByName(employeeName = '') {
  return data.employees.reduce((acumulador, nomeIdade) => {
    if (employeeName === '') {
      acumulador = {};
    } else {
      const funcPrimeiroNome = data.employees.find(employees => employees.firstName === employeeName);
      if (Object.values(funcPrimeiroNome).some((employees) => employees.id === employeeName)) {
        const addFunc = {
          id: funcPrimeiroNome.id,
          firstName: funcPrimeiroNome.firstName,
          lastName: funcPrimeiroNome.lastName,
          managers: funcPrimeiroNome.managers,
          responsibleFor: funcPrimeiroNome.responsibleFor,
        }
        acumulador.push(addFunc);
      } else {
        const funcUltimoNome = data.employees.find(employees => employees.lastName === employeeName);
        const addFunc2 = {
          id: funcUltimoNome.id,
          firstName: funcUltimoNome.firstName,
          lastName: funcUltimoNome.lastName,
          managers: funcUltimoNome.managers,
          responsibleFor: funcUltimoNome.responsibleFor,
        }
        acumulador.push(addFunc2);
      }
    }
    return acumulador
  });
}

function createEmployee(personalInfo, associatedWith) {
  const addFunc = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  }
  return addFunc;
}

function isManager(id) {
  const specieId = data.species.find(species => ids === species.id);
  if (specieId.managers === []) {
    return true;
  }
  else {
    return false;
  }
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(species) {
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
