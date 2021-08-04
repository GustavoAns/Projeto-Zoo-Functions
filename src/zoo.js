const data = require('./data');

function getSpeciesByIds(ids = '',ids2 = '') {
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
  return data.species.reduce((acumulador, nomeIdade) => {
    const specieName = data.species.find(species => animal === species.name);
    specieName.residents.reduce((acumulador2 = true, idade) => {
      if (specieName.residents.age < age) {
        acumulador2 = false;
      }
      return acumulador2
    });
  });
}

function getEmployeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
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
