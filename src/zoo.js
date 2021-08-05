const data = require('./data');

const {
  species,
  employees,
  hours,
  prices
} = data;

function getSpeciesByIds(...ids) {
  if (!ids) {
    return [];
  }
  //O ids.map esta recebendo os ids e criando um novo array para armazenar 
  //as informaçoes filtradas encontradas pelo species.find usando como filtro
  //os ids recebidos anteriormente . Conteudo asimilado com o Code Review 
  //do dia 04/08/2021
  return ids.map((id) => species.find((atual) => atual.id ===  id));
}

function getAnimalsOlderThan(animal, age) {
  return species.reduce((acumulador2, nomeIdade) => {
    const specieName = species.find(species => animal === species.name);
    if (Object.values(specieName.residents).every((residents) => residents.age >= age)) {
      return true;
    } else {
      return false;
    }
  });
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const funcionariNome = (employees.find((atual) => atual.firstName === employeeName || atual.lastName === employeeName));
  let funcionarioRetorno = {
    id: funcionariNome.id,
    firstName: funcionariNome.firstName,
    lastName: funcionariNome.lastName,
    managers: funcionariNome.managers,
    responsibleFor: funcionariNome.responsibleFor,
  }
  return funcionarioRetorno;
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
  return employees.some((employees) => employees.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  if (!id, !firstName, !lastName, !managers, !responsibleFor) {
    return employees.push([]);
  }
  const addFunc = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  }
  return employees.push(addFunc);
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
