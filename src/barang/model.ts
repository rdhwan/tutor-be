import { z } from "zod";

export const Barang = z.object({
  id: z.number(),
  kode_sku: z
    .string({ required_error: "Kode SKU harus diisi" })
    .startsWith("BRG-", "Kode SKU harus diawali dengan BRG-")
    .max(10, "Kode SKU maksimal 10 karakter")
    .min(4, "Kode SKU minimal 4 karakter"),
  nama_barang: z
    .string({ required_error: "Nama barang harus diisi" })
    .max(255, "Nama barang maksimal 255 karakter")
    .min(5, "Nama barang minimal 5 karakter"),
  qty: z.number({ required_error: "Qty harus diisi" }),
  harga: z.number({ required_error: "Harga harus diisi" }),
  created_at: z.date(),
  updated_at: z.date(),
});

export const BarangUpdatable = Barang.pick({
  kode_sku: true,
  nama_barang: true,
  qty: true,
  harga: true,
});

export const BarangId = z.object({
  id: z.preprocess((v) => parseInt(v as string), z.number()),
});

export type BarangT = z.infer<typeof Barang>;
export type BarangUpdatableT = z.infer<typeof BarangUpdatable>;
export type BarangIdT = z.infer<typeof BarangId>;
