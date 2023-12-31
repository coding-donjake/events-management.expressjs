import { Router } from "express";
import {
  verifyToken,
  verifyAdmin,
  verifyAdminPassword,
} from "./services/auth-service";
import { checkAdminUsernameAvailability } from "./services/checker-service";
import adminCreateController from "./controllers/admin/create";
import adminGetController from "./controllers/admin/get";
import adminUpdateController from "./controllers/admin/update";
import {
  adminCreateRoute,
  adminGetRoute,
  adminLoginRoute,
  adminSelectRoute,
  adminUpdateRoute,
  customerCreateRoute,
  customerGetRoute,
  customerSelectRoute,
  customerUpdateRoute,
  eventCreateRoute,
  eventGetRoute,
  eventSelectRoute,
  eventUpdateRoute,
  orderCreateRoute,
  orderGetRoute,
  orderSelectRoute,
  orderUpdateRoute,
  paymentCreateRoute,
  paymentGetRoute,
  paymentSelectRoute,
  paymentUpdateRoute,
  supplierCreateRoute,
  supplierGetRoute,
  supplierSelectRoute,
  supplierUpdateRoute,
  supplyCreateRoute,
  supplyGetRoute,
  supplySelectRoute,
  supplyUpdateRoute,
} from "./routes";
import adminSelectController from "./controllers/admin/select";
import customerCreateController from "./controllers/customer/create";
import customerGetController from "./controllers/customer/get";
import customerSelectController from "./controllers/customer/select";
import customerUpdateController from "./controllers/customer/update";
import adminLoginController from "./controllers/admin/login";
import supplierCreateController from "./controllers/supplier/create";
import supplierGetController from "./controllers/supplier/get";
import supplierSelectController from "./controllers/supplier/select";
import supplierUpdateController from "./controllers/supplier/update";
import supplyCreateController from "./controllers/supply/create";
import supplyGetController from "./controllers/supply/get";
import supplySelectController from "./controllers/supply/select";
import supplyUpdateController from "./controllers/supply/update";
import orderCreateController from "./controllers/order/create";
import orderGetController from "./controllers/order/get";
import orderSelectController from "./controllers/order/select";
import orderUpdateController from "./controllers/order/update";
import eventCreateController from "./controllers/event/create";
import eventGetController from "./controllers/event/get";
import eventSelectController from "./controllers/event/select";
import eventUpdateController from "./controllers/event/update";
import paymentCreateController from "./controllers/payment/create";
import paymentGetController from "./controllers/payment/get";
import paymentSelectController from "./controllers/payment/select";
import paymentUpdateController from "./controllers/payment/update";

const router: Router = Router();

export const createMiddlewares = [
  verifyToken,
  verifyAdmin,
  verifyAdminPassword,
];
export const createAdminMiddlewares = [
  verifyToken,
  verifyAdmin,
  verifyAdminPassword,
  checkAdminUsernameAvailability,
];
export const getMiddlewares = [verifyToken, verifyAdmin];
export const updateMiddlewares = [
  verifyToken,
  verifyAdmin,
  verifyAdminPassword,
];

router.post(adminCreateRoute, createAdminMiddlewares, adminCreateController);
router.post(adminGetRoute, getMiddlewares, adminGetController);
router.post(adminLoginRoute, adminLoginController);
router.post(adminSelectRoute, getMiddlewares, adminSelectController);
router.put(adminUpdateRoute, updateMiddlewares, adminUpdateController);

router.post(customerCreateRoute, createMiddlewares, customerCreateController);
router.post(customerGetRoute, getMiddlewares, customerGetController);
router.post(customerSelectRoute, getMiddlewares, customerSelectController);
router.put(customerUpdateRoute, updateMiddlewares, customerUpdateController);

router.post(eventCreateRoute, createMiddlewares, eventCreateController);
router.post(eventGetRoute, getMiddlewares, eventGetController);
router.post(eventSelectRoute, getMiddlewares, eventSelectController);
router.put(eventUpdateRoute, updateMiddlewares, eventUpdateController);

router.post(orderCreateRoute, createMiddlewares, orderCreateController);
router.post(orderGetRoute, getMiddlewares, orderGetController);
router.post(orderSelectRoute, getMiddlewares, orderSelectController);
router.put(orderUpdateRoute, updateMiddlewares, orderUpdateController);

router.post(paymentCreateRoute, createMiddlewares, paymentCreateController);
router.post(paymentGetRoute, getMiddlewares, paymentGetController);
router.post(paymentSelectRoute, getMiddlewares, paymentSelectController);
router.put(paymentUpdateRoute, updateMiddlewares, paymentUpdateController);

router.post(supplierCreateRoute, createMiddlewares, supplierCreateController);
router.post(supplierGetRoute, getMiddlewares, supplierGetController);
router.post(supplierSelectRoute, getMiddlewares, supplierSelectController);
router.put(supplierUpdateRoute, updateMiddlewares, supplierUpdateController);

router.post(supplyCreateRoute, createMiddlewares, supplyCreateController);
router.post(supplyGetRoute, getMiddlewares, supplyGetController);
router.post(supplySelectRoute, getMiddlewares, supplySelectController);
router.put(supplyUpdateRoute, updateMiddlewares, supplyUpdateController);

export default router;
