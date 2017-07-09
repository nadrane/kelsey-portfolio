"use strict";

const express = require("express");
const router = module.exports = new express.Router();
const { Image } = require("../../db/models");

router.get("/", function(req, res, next) {
  req.query.tag
    ? Image.getImagesWithTagName(req)
    : getAllImages(req).then(images => res.json(images)).catch(next);
});

router.get("/:imageId", function(req, res, next) {
  Image.findById(req.params.imageId)
    .then(image => {
      res.json(image);
    })
    .catch(next);
});

router.post("/", function(req, res, next) {
  Image.create(req.body)
    .then(image => res.json(image))
    .catch(next);
});

router.put("/:imageId", function(req, res, next) {
  Image.findById(req.params.imageId)
    .then(image => image.update(req.body))
    .then(image => res.json(image))
    .catch(next);
});

router.delete("/:imageId", function(req, res, next) {
  Image.findById(req.params.imageId)
    .then(image => image.destroy())
    .then(_ => res.sendStatus(204))
    .catch(next);
});

function getAllImages(req) {
  return Image.findAll(
    Object.assign({}, req.pagination, {order: ['id']})
  );
}