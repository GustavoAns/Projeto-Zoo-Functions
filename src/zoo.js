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
  return ids.map((id) => species.find((atual) => atual.id === id));
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

function countAnimals(speciesDado = '') {
  //Nesse ex é nessesario retornar o numero de animais de uma unica specie
  //caso o parametro seja unico , mas caso seja vazio , deve retorar 
  //um objeto contendo todas as species tratadas como nomeador e a quantidade 
  //do animais dessas species presentes no banco de dados Ex 'lions: 5'

  //A condicional (speciesDado !== '') esta 'Dizendo' que ira rodar apenas se o 
  //speciesDado não for especificado pois ira retornar uma string vazia , valor esse
  //atribuido como padrão.
  if (speciesDado !== '') {
    //esse return ira retornar apenas o numero de objetos dentro de species.residents
    //da specie dada como filtro.
    return species.find((atual) => atual.name === speciesDado).residents.length;
  } else {
    //esse return se inicia como um objeto vazio e ira passar por cada objeto dentro 
    //de species e ira acresentar ao acumulador antigo o nome e a quantidade de objetos
    //dentro de residents da specie em que o reduce esta passando no momento.
    return species.reduce((acumulador, valorArray) => ({
      ...acumulador,
      [valorArray.name]: valorArray.residents.length
    }), {});
  }
}

function calculateEntry({Adult = 0, Child = 0, Senior = 0} = 0) {
  let adultTotal = Adult * prices.Adult;
  let childtTotal = Child * prices.Child;
  let seniorTotal = Senior * prices.Senior;
  return adultTotal + childtTotal + seniorTotal;
}
//Ex pode add 2 filtros,O de includeNames é true que retorna o nome dos animais
//e o sexo dos animais que só retorna os animais com o sexo expecificado.
function getAnimalMap(options) {
  const direction = { NE: [], NW: [], SE: [], SW: [] };
  if (!options || !options.includeNames) {
    species.forEach((objTrabalhado) => direction[objTrabalhado.location].push(objTrabalhado.name));
    return direction;
  }
 //Aprendi analizando o codico do Marcello Alves que é possivel adicionar HOFs uma atraz da outra para 
 //diminuir o uso de linhas sem grandes complicações.
 //Essa linha ira criar um objeto com nome da specie em que o forEach esteja analizando no momento
 //e ira ser adicionada ha sua região respectiva.
 species.forEach((objTrabalhado) => direction[objTrabalhado.location].push({ [objTrabalhado.name]: objTrabalhado.residents
//Essa linha ira tratar de filtrar os animais pelo sexo expecificado por 'options' , caso n seja definido
//ira ser pulado
  .filter((animal) => (!options.sex || (animal.sex === options.sex)))
//Essa linha ira ordenar os animais que foram filtrados
  .sort(options.sorted ? (a, b) => a.name.localeCompare(b.name) : () => 0)
//Essa linha ira criar o array que contem os nomes dos animas filtrados 
  .map((animal) => animal.name) }));
  return direction;
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
