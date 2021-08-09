const data = require('./data');

const {
  species,
  employees,
  prices,
} = data;

function getSpeciesByIds(...ids) {
  if (!ids) {
    return [];
  }
  // O ids.map esta recebendo os ids e criando um novo array para armazenar
  // as informaçoes filtradas encontradas pelo species.find usando como filtro
  // os ids recebidos anteriormente . Conteudo asimilado com o Code Review
  // do dia 04/08/2021.
  return ids.map((id) => species.find((atual) => atual.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return species.reduce((acumulador2, nomeIdade) => {
    const specieName = species.find((specie) => animal === specie.name);
    return (!!Object.values(specieName.residents).every((residents) => residents.age >= age));
  });
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const funcionariNome = (employees.find((atual) =>
    atual.firstName === employeeName
    || atual.lastName === employeeName));
  const funcionarioRetorno = {
    id: funcionariNome.id,
    firstName: funcionariNome.firstName,
    lastName: funcionariNome.lastName,
    managers: funcionariNome.managers,
    responsibleFor: funcionariNome.responsibleFor,
  };
  return funcionarioRetorno;
}

function createEmployee(personalInfo, associatedWith) {
  const addFunc = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return addFunc;
}

function isManager(id) {
  return employees.some((employees2) => employees2.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const teste = (id, firstName, lastName, managers, responsibleFor);
  if (!teste) {
    return employees.push([]);
  }
  const addFunc = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(addFunc);
}
// Nesse ex é nessesario retornar o numero de animais de uma unica specie
// caso o parametro seja unico , mas caso seja vazio , deve retorar
// um objeto contendo todas as species tratadas como nomeador e a quantidade
// do animais dessas species presentes no banco de dados Ex 'lions: 5'
function countAnimals(speciesDado = '') {
  // A condicional (speciesDado !== '') esta 'Dizendo' que ira rodar apenas se o
  // speciesDado não for especificado pois ira retornar uma string vazia , valor esse
  // atribuido como padrão.
  if (speciesDado !== '') {
    // esse return ira retornar apenas o numero de objetos dentro de species.residents
    // da specie dada como filtro.
    return species.find((atual) => atual.name === speciesDado).residents.length;
  }
  // esse return se inicia como um objeto vazio e ira passar por cada objeto dentro
  // de species e ira acresentar ao acumulador antigo o nome e a quantidade de objetos
  // dentro de residents da specie em que o reduce esta passando no momento.
  return species.reduce((acumulador, valorArray) => ({
    ...acumulador,
    [valorArray.name]: valorArray.residents.length,
  }), {});
}

function calculateEntry({
  Adult = 0,
  Child = 0,
  Senior = 0,
} = 0) {
  const adultTotal = Adult * prices.Adult;
  const childtTotal = Child * prices.Child;
  const seniorTotal = Senior * prices.Senior;
  return adultTotal + childtTotal + seniorTotal;
}
// Ex pode add 2 filtros,O de includeNames é true que retorna o nome dos animais
// e o sexo dos animais que só retorna os animais com o sexo expecificado.

// Aprendi analizando o codico do Marcello Alves que é possivel adicionar HOFs uma atraz da outra para
// diminuir o uso de linhas sem grandes complicações.

// Nalinha linha 130 ira criar um objeto com nome da specie em que o forEach esteja analizando no momento
// e ira ser adicionada ha sua região respectiva.

// Na linha 132 ira tratar de filtrar os animais pelo sexo expecificado por 'options' , caso n seja definido
// ira ser pulado.

// Na linha 133 ira ordenar os animais que foram filtrados.

// Na linha 134 ira criar o array que contem os nomes dos animas filtrados.
function getAnimalMap(options) {
  const direction = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  if (!options || !options.includeNames) {
    species.forEach((objTrabalhado) => direction[objTrabalhado.location].push(objTrabalhado.name));
    return direction;
  }
  species.forEach((objTrabalhado) => direction[objTrabalhado.location].push({
    [objTrabalhado.name]: objTrabalhado.residents
      .filter((animal) => (!options.sex || (animal.sex === options.sex)))
      .sort(options.sorted ? (a, b) => a.name.localeCompare(b.name) : () => 0)
      .map((animal) => animal.name),
  }));
  return direction;
}

function getSchedule(dayName) {
  const dias = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return dias;
  }
  return {
    [dayName]: dias[dayName],
  };
}

function getOldestFromFirstSpecies(id) {
  const funcionarioId = employees.find((funci) => funci.id === id);
  const todosPrimeiroSpecie = species.find(
    (animal) => animal.id === funcionarioId.responsibleFor[0],
  ).residents;
  // Lembrete em "valor.age > acumulador.age ? valor : acumulador" se valor for > que o acumulado ira
  // subistituir o acumulado pelo valor , mas caso seja < ira retornar o acumulado.
  const {
    name,
    sex,
    age,
  } = todosPrimeiroSpecie.reduce((acumula, valor) => (valor.age > acumula.age ? valor : acumula));
  return [name, sex, age];
}

function increasePrices(percentage) {
  const precos = Object.keys(prices);
  const valorAumentado = precos.forEach((preco) => {
    prices[preco] = Math.ceil(prices[preco] * (percentage + 100)) / 100;
  });
  return valorAumentado;
}

function getEmployeeCoverage(idOrName) {
  // Nessa linha foi criada um função que ira retornar o nome completo do funcionario e um map com os nomes
  // de todos os animas que o funcionario trabalha com base nos id's de species presentes no funcionario especificado.
  const funciPorNomeCompleto = (funcionario) => ({
    [`${funcionario.firstName} ${funcionario.lastName}`]:
    funcionario.responsibleFor.map((id) => species.find((speciesx) => speciesx.id === id).name),
  });
  // Caso o parametro seja Undefined ira rodar a Função "funciPorNomeCompleto" e armazenar 1 vez para cada funcionario registrado.
  if (!idOrName) {
    return employees.reduce((acumulador, valor) =>
      Object.assign(acumulador, funciPorNomeCompleto(valor)), {});
  }
  // Essa linha ira rodar a função "funciPorNomeCompleto" mas para isso acontecer é necessário conferir se o parametro passado foi
  // um id , nome ou sobrenome. para comparar o id é simples é apenas usar o find em 'employees' mas como buscar pelo nome
  // ou sobrenome seria + complexo e essa função já esta feita. Por isso posso reutilizar a função do EX 3
  return funciPorNomeCompleto(employees.find((funcionario) =>
    funcionario.id === idOrName) || getEmployeeByName(idOrName));
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
