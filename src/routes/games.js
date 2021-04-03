const express = require("express");
const Games = require("../models/Games");
const router = express.Router();

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

router.get("/", async (req, res) => {
  const { limit, page, fields, orderBy, sortBy, q } = req.query;

  const criteria = {
    q: q || "",
    limit: Number(limit) || DEFAULT_LIMIT,
    page: Number(page) || DEFAULT_PAGE,
    fields: fields || null,
    orderBy: orderBy || "title",
    sortBy: sortBy !== undefined ? Number(sortBy) : 1,
  };

  const result = await Games.find(criteria);

  return res.json({ message: "Games List!", data: result });
});

router.post("/", async (req, res) => {
  const { body } = req;
  const data = await Games.store(body);
  return res.json({ message: "Game Stored", data });
});

router.put("/:id", async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  const game = await Games.update(id, body);
  return res.json({ message: "Game updated", data: { id, game } });
});

router.delete("/:id", async (req, res) => {
  const { params } = req;
  const { id } = params;
  const result = await Games.destroy(id);

  return res.json({ message: "Game deleted", data: result });
});
module.exports = router;
