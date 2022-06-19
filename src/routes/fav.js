const router = require("express").Router();
const {
  create,
  list,
  show,
  destroy,
} = require("../controllers/fav.controller");
const { validateJWT } = require("../middlewares/validateJWT");

router.post("/listFavs/fav", validateJWT, create);
router.get("/listFavs/fav", validateJWT, list);
router.get("/listFavs/fav/:favId", validateJWT, show);
router.delete("/listFavs/fav/:favId", validateJWT, destroy);

module.exports = router;
