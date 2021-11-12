var faker = require("faker");
faker.locale = "az";
var database = { companies: [], users:[], tasks: [] };

for (var i = 1; i <= 10; i++) {
  database.companies.push({
    id: i,
    name: faker.company.companyName(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.cityName(),
  });
}
for (var i = 1; i <= 10; i++) {
  database.users.push({
    id: i,
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.address.cityName(),
    companyId: Math.floor(Math.random() * 10) + 1
  });
}
for (var i = 1; i <= 10; i++) {
  database.tasks.push({
    id: i,
    title: faker.name.title(),
    description: faker.name.jobDescriptor(),
    deadline: faker.date.weekday(),
    status: "todo",
    companyId: Math.floor(Math.random() * 10) + 1,
    userId: Math.floor(Math.random() * 10) + 1
  });
}

console.log(JSON.stringify(database));
