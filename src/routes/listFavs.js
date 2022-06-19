const router = require("express").Router();
const {
  create,
  list,
  show,
  destroy,
} = require("../controllers/listFavs.controller");
const { validateJWT } = require("../middlewares/validateJWT");

router.post("/favs", validateJWT, create);
router.get("/favs", validateJWT, list);
router.get("/favs/:id", validateJWT, show);
router.delete("/favs/:id", validateJWT, destroy);

module.exports = router;
