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
} from "./routes";
import adminSelectController from "./controllers/admin/select";
import customerCreateController from "./controllers/customer/create";
import customerGetController from "./controllers/customer/get";
import customerSelectController from "./controllers/customer/select";
import customerUpdateController from "./controllers/customer/update";
import adminLoginController from "./controllers/admin/login";

const router: Router = Router();

export const createMiddlewares = [
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

router.post(adminCreateRoute, createMiddlewares, adminCreateController);
router.post(adminGetRoute, getMiddlewares, adminGetController);
router.post(adminLoginRoute, adminLoginController);
router.post(adminSelectRoute, getMiddlewares, adminSelectController);
router.put(adminUpdateRoute, updateMiddlewares, adminUpdateController);

router.post(customerCreateRoute, createMiddlewares, customerCreateController);
router.post(customerGetRoute, getMiddlewares, customerGetController);
router.post(customerSelectRoute, getMiddlewares, customerSelectController);
router.put(customerUpdateRoute, updateMiddlewares, customerUpdateController);

export default router;
