const accounts = `CREATE TABLE IF NOT EXISTS accounts(
  id SERIAL PRIMARY KEY,
  accountNumber INTEGER NOT NULL UNIQUE,
  owner INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT('dormant'),
  balance FLOAT NOT NULL,
  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

export default accounts;
