const router = require("express").Router();
const {
  create,
  list,
  show,
  destroy,
} = require("../controllers/listFavs.controller");
const { validateJWT } = require("../middlewares/validateJWT");

router.post("/listFavs", validateJWT, create);
router.get("/listFavs", validateJWT, list);
router.get("/listFavs/:id", validateJWT, show);
router.delete("/listFavs/:id", validateJWT, destroy);

module.exports = router;
