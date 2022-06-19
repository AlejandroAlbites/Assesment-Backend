const router = require("express").Router();
const { register, login } = require("../controllers/user.controller");
const { validateJWT } = require("../middlewares/validateJWT");

router.post("/register", register);
router.post("/login", login);

// router.get("/renew", validateJWT, tokenRevalidate);

// router.put("/edit", validateJWT, updateUser);
// router.put("/premium", validateJWT, changePremium);
// router.put("/change-password", validateJWT, changePassword);
// router.delete("/:userId", destroyUser);

module.exports = router;
