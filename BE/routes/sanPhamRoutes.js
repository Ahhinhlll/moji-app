const express = require("express");
const {
  getAll,
  getById,
  insert,
  update,
  remove,
  search,
} = require("../controllers/sanPhamController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SanPham
 */

/**
 * @swagger
 * /api/sanpham/getall:
 *   get:
 *     tags: [SanPham]
 *     responses:
 *       200:
 *         description: A list of SanPham items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SanPham'
 */
router.get("/sanpham/getall", getAll);

/**
 * @swagger
 * /api/sanpham/getbyid/{id}:
 *   get:
 *     tags: [SanPham]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the SanPham item
 *     responses:
 *       200:
 *         description: A SanPham item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SanPham'
 *       404:
 *         description: SanPham item not found
 */
router.get("/sanpham/getbyid/:id", getById);

/**
 * @swagger
 * /api/sanpham/insert:
 *   post:
 *     tags: [SanPham]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenSP:
 *                 type: string
 *               maDM:
 *                 type: string
 *               soLuong:
 *                 type: integer
 *               giaTien:
 *                 type: number
 *               moTa:
 *                 type: string
 *               anhSP:
 *                 type: string
 *               mauSP:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created SanPham item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SanPham'
 */
router.post("/sanpham/insert", insert);

/**
 * @swagger
 * /api/sanpham/update:
 *   put:
 *     tags: [SanPham]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maSP:
 *                 type: string
 *               tenSP:
 *                 type: string
 *               maDM:
 *                 type: string
 *               soLuong:
 *                 type: integer
 *               giaTien:
 *                 type: number
 *               moTa:
 *                 type: string
 *               anhSP:
 *                 type: string
 *               mauSP:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated SanPham item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SanPham'
 *       404:
 *         description: SanPham item not found
 */
router.put("/sanpham/update", update);

/**
 * @swagger
 * /api/sanpham/delete/{id}:
 *   delete:
 *     tags: [SanPham]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the SanPham item
 *     responses:
 *       200:
 *         description: The deleted SanPham item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SanPham'
 *       404:
 *         description: SanPham item not found
 */
router.delete("/sanpham/delete/:id", remove);

/**
 * @swagger
 * /api/sanpham/search:
 *   get:
 *     tags: [SanPham]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term
 *     responses:
 *       200:
 *         description: A list of SanPham items matching the search term
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SanPham'
 */
router.get("/sanpham/search", search);

module.exports = router;
