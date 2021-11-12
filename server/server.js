const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
var cors = require("cors");
const auth = require("./middleware/auth");

// Get current users data
const server = jsonServer.create();
const router = jsonServer.router("./database.json");
const userdb = JSON.parse(fs.readFileSync("./server/database.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "localhost:3000");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

server.use(cors());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ username, email, password, companyId }) {
  return (
    userdb.users.findIndex(
      (user) =>
        user.email == email &&
        user.password == password &&
        user.username == username &&
        user.companyId == companyId
    ) !== -1
  );
}
// Check if the company exists in database
function isAuthenticatedCompany({ name, phone, address }) {
  return (
    userdb.companies.findIndex(
      (company) =>
        company.name === name &&
        company.phone === phone &&
        company.address === address
    ) !== -1
  );
}

function isAuthenticatedCompanyLogin({ name }) {
  return userdb.companies.findIndex((company) => company.name === name) !== -1;
}
//Register new Company
server.post("/auth/registerCompany", (req, res) => {
  var { name, phone, address } = req.body;

  if (isAuthenticatedCompany({ name, phone, address }) === true) {
    const status = 402;
    const message = "This company already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./server/database.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    var company_data = JSON.parse(data.toString());
    // Get the id of last user
    const last_item_id =
      company_data.companies[company_data.companies.length - 1].id;
    companyId_register = last_item_id + 1;
    //Add new user
    company_data.companies.push({
      id: companyId_register,
      name: name,
      phone: phone,
      address: address,
    }); //add some data
    var writeData = fs.writeFile(
      "./server/database.json",
      JSON.stringify(company_data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
  var companyRegisterId = userdb.companies[userdb.companies.length - 1].id + 1;
  res.status(200).json({ companyRegisterId });
});

// Register New User
server.post("/auth/register", (req, res) => {
  const { username, email, role, password, companyId } = req.body;

  if (
    isAuthenticated({ username, email, password, companyId }) === true
  ) {
    const status = 401;
    const message = "Email and Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./server/database.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    var user_data = JSON.parse(data.toString());
    // Get the id of last user
    const last_item_id = user_data.users[user_data.users.length - 1].id;

    //Add new user
    user_data.users.push({
      id: last_item_id + 1,
      username: username,
      email: email,
      password: password,
      role: role,
      companyId: companyId,
    }); //add some data
    var writeData = fs.writeFile(
      "./server/database.json",
      JSON.stringify(user_data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  // Create token for new user
  const access_token = createToken({
    username,
    email,
    password,
    role,
    companyId,
  });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token, role });
});

// Login to one of the users from ./database.json
server.post("/auth/loginCompany", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { name } = req.body;
  if (isAuthenticatedCompanyLogin({ name }) === false) {
    const status = 401;
    const message = "This Company doesn't exist";
    res.status(status).json({ status, message });
    return;
  } else {
    var companyLoginId = userdb.companies.find(
      (company) => company.name === name
    ).id;
  }
  res.status(200).json({ companyLoginId });
});

// Login to one of the users from ./database.json
server.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { username, email, password, companyId } = req.body;
  if (
    isAuthenticated({ username, email, password, companyId }) === false
  ) {
    const status = 401;
    const message = "Incorrect email or passwordddd";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({
    username,
    email,
    password,
    companyId,
  });
  const role = (userdb.users.find(
    (user) =>
      user.email === email &&
      user.password === password &&
      user.username === username &&
      user.companyId == companyId
  )).role;
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token, role });
});

server.get("/users", auth, (req, res) => {
  const { companyId } = req.query;
  var users = [];
  userdb.users.forEach(element => {
    if (element.companyId == companyId) {
      users.push(element)
    }
  });
  res.status(200).json({users});
});

server.get("/users", auth, (req, res) => {
  const { userId } = req.query;
  const user = (userdb.users.find(
    (user) =>
      user.id == userId
  ));
  res.status(200).json({user});
});
server.delete("/userById", auth, (req, res) => {
  const { userId, companyId} = req.query;
  const user = (userdb.users.find(
    (user) =>
      user.companyId == companyId &&
      user.id == userId
  ));
  res.status(200).json({user});
});

server.get("/tasks", auth, (req, res) => {
  const { companyId, userId } = req.query;
  var tasks = [];
  userdb.tasks.forEach(element => {
    if (element.companyId == companyId && task.userId === userId) {
      users.push(element)
    }
  });
  res.status(200).json({tasks});
});
server.use(router);

server.listen(3000, () => {
  console.log("Run Auth API Server");
});
