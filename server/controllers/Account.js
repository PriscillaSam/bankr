import accounts from '../models/accounts';
import ArraySorter from '../helpers/ArraySorter';

const { arrayFinder, arrayFilter } = ArraySorter;
const allAccounts = accounts;

class AccountController {
  static async createAccount(req, res) {
    const newAccount = req.body;
    newAccount.id = allAccounts.length + 1;
    newAccount.createdOn = new Date();
    newAccount.status = newAccount.status;
    newAccount.balance = newAccount.openingBalance;
    const { openingBalance, ...account } = newAccount;
    allAccounts.push(account);
    const {
      id,
      createdOn,
      status,
      owner,
      balance,
      ...newAccountDetails
    } = newAccount;
    return res.status(201).json({
      status: 201,
      data: newAccountDetails,
    });
  }

  static async getAccount(req, res) {
    const { accountNumber } = req.params;
    const singleAccount = arrayFinder(allAccounts, 'accountNumber', accountNumber);
    return res.status(200).json({
      status: 200,
      data: singleAccount,
    });
  }

  static async getAllAccounts(req, res) {
    return res.status(200).json({
      status: 200,
      data: allAccounts,
    });
  }

  static async getUserAccounts(req, res) {
    const id = parseInt(req.params.userId, 10);
    const userAccounts = arrayFilter(allAccounts, 'owner', id);
    return res.status(200).json({
      status: 200,
      data: userAccounts,
    });
  }

  static async updateAccountStatus(req, res) {
    const { status } = req.body;
    const { accountNumber } = req.params;
    const updatedAccount = arrayFinder(allAccounts, 'accountNumber', accountNumber);
    updatedAccount.status = status;
    const {
      firstName,
      lastName,
      email,
      balance,
      type,
      owner,
      id,
      createdOn,
      ...updatedAccountDetail
    } = updatedAccount;
    return res.status(200).json({
      status: 200,
      data: updatedAccountDetail,
    });
  }

  static async deleteAccount(req, res) {
    const accNumber = req.params.accountNumber;
    const deletedAccount = arrayFinder(allAccounts, 'accountNumber', accNumber);
    allAccounts.splice(allAccounts.indexOf(deletedAccount), 1);
    const deleteSuccess = {
      message: 'Account successfully deleted!',
    };
    return res.status(200).json({
      status: 200,
      data: deleteSuccess,
    });
  }
}

export default AccountController;