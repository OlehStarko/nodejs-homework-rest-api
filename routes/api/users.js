const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

const { userController } = require("../../controllers");
const {
  validateUser,
  validateUserUserSubscription,
} = require("../../middleware/validation");

router.post("/register", validateUser, userController.register);
router.post("/login", validateUser, userController.login);
router.post("/logout", auth, userController.logout);
router.post("/current", auth, userController.current);
router.patch(
  "/",
  auth,
  validateUserUserSubscription,
  userController.updateSubscription
);

module.exports = router;