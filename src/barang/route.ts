import { Router } from "express";
import {
  createBarang,
  deleteBarangById,
  getAllBarang,
  getBarangById,
  updateBarang,
} from "@/barang/handler";

const router = Router();

router.get("/", getAllBarang);
router.get("/:id", getBarangById);
router.post("/", createBarang);
router.put("/:id", updateBarang);
router.delete("/:id", deleteBarangById);

export default router;
