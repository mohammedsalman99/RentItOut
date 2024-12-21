import * as CategoryController from './categoryController.js';
import * as DeliveryOptionController from './deliveryOptionController.js';
import * as DisputeController from './DisputeController.js';
import * as ItemController from './itemController.js';
import * as SecurityController from './securityController.js';
import * as TransactionController from './transactionController.js';
import * as UserController from './userController.js';

// Category
const adminCreateCategory = (req, res) => {
  CategoryController.addCategory(req, res);
};

const adminGetAllCategories = (req, res) => {
  CategoryController.getAllCategories(req, res);
};

const adminGetCategoryById = (req, res) => {
  CategoryController.getCategoryById(req, res);
};

const adminUpdateCategory = (req, res) => {
  CategoryController.updateCategory(req, res);
};

const adminDeleteCategory = (req, res) => {
  CategoryController.deleteCategory(req, res);
};

// Delivery Option
const adminCreateDeliveryOption = (req, res) => {
  DeliveryOptionController.addDeliveryOption(req, res);
};

const adminGetAllDeliveryOptions = (req, res) => {
  DeliveryOptionController.getAllDeliveryOptions(req, res);
};

const adminGetDeliveryOptionById = (req, res) => {
  DeliveryOptionController.getDeliveryOptionById(req, res);
};

const adminUpdateDeliveryOption = (req, res) => {
  DeliveryOptionController.updateDeliveryOption(req, res);
};

const adminDeleteDeliveryOption = (req, res) => {
  DeliveryOptionController.deleteDeliveryOption(req, res);
};

// Dispute
const adminCreateDispute = (req, res) => {
  DisputeController.createDispute(req, res);
};

const adminGetAllDisputes = (req, res) => {
  DisputeController.getAllDisputes(req, res);
};

const adminGetDisputeById = (req, res) => {
  DisputeController.getDisputeById(req, res);
};

const adminUpdateDispute = (req, res) => {
  DisputeController.updateDispute(req, res);
};

const adminDeleteDispute = (req, res) => {
  DisputeController.deleteDispute(req, res);
};

// Item
const adminCreateItem = (req, res) => {
  ItemController.addItem(req, res);
};

const adminGetAllItems = (req, res) => {
  ItemController.getAllItems(req, res);
};

const adminGetItemById = (req, res) => {
  ItemController.getItemById(req, res);
};

const adminUpdateItem = (req, res) => {
  ItemController.updateItem(req, res);
};

const adminDeleteItem = (req, res) => {
  ItemController.deleteItem(req, res);
};

// Security
const adminCreateSecurity = (req, res) => {
  SecurityController.addSecurity(req, res);
};

const adminGetAllSecurities = (req, res) => {
  SecurityController.getAllSecurities(req, res);
};

const adminGetSecurityById = (req, res) => {
  SecurityController.getSecurityById(req, res);
};

const adminUpdateSecurity = (req, res) => {
  SecurityController.updateSecurity(req, res);
};

const adminDeleteSecurity = (req, res) => {
  SecurityController.deleteSecurity(req, res);
};

// Transaction
const adminCreateTransaction = (req, res) => {
  TransactionController.addTransaction(req, res);
};

const adminGetAllTransactions = (req, res) => {
  TransactionController.getAllTransactions(req, res);
};

const adminGetTransactionById = (req, res) => {
  TransactionController.getTransactionById(req, res);
};

const adminUpdateTransaction = (req, res) => {
  TransactionController.updateTransaction(req, res);
};

const adminDeleteTransaction = (req, res) => {
  TransactionController.deleteTransaction(req, res);
};

// User
const adminCreateUser = (req, res) => {
  UserController.addUser(req, res);
};

const adminGetAllUsers = (req, res) => {
  UserController.getAllUsers(req, res);
};

const adminGetUserById = (req, res) => {
  UserController.getUserById(req, res);
};

const adminUpdateUser = (req, res) => {
  UserController.updateUser(req, res);
};

const adminDeleteUser = (req, res) => {
  UserController.deleteUser(req, res);
};

export {
  adminCreateCategory,
  adminGetAllCategories,
  adminGetCategoryById,
  adminUpdateCategory,
  adminDeleteCategory,

  adminCreateDeliveryOption,
  adminGetAllDeliveryOptions,
  adminGetDeliveryOptionById,
  adminUpdateDeliveryOption,
  adminDeleteDeliveryOption,

  adminCreateDispute,
  adminGetAllDisputes,
  adminGetDisputeById,
  adminUpdateDispute,
  adminDeleteDispute,

  adminCreateItem,
  adminGetAllItems,
  adminGetItemById,
  adminUpdateItem,
  adminDeleteItem,

  adminCreateSecurity,
  adminGetAllSecurities,
  adminGetSecurityById,
  adminUpdateSecurity,
  adminDeleteSecurity,

  adminCreateTransaction,
  adminGetAllTransactions,
  adminGetTransactionById,
  adminUpdateTransaction,
  adminDeleteTransaction,

  adminCreateUser,
  adminGetAllUsers,
  adminGetUserById,
  adminUpdateUser,
  adminDeleteUser,
};
