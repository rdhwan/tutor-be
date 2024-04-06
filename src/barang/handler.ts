import type { Request, Response } from "express";
import {
  success,
  internalServerError,
  validationError,
  parseZodError,
  notFound,
  created,
  conflict,
} from "@/utils/responses";
import db from "@/services/db";
import {
  BarangId,
  BarangIdT,
  BarangUpdatable,
  BarangUpdatableT,
} from "./model";

export const getAllBarang = async (req: Request, res: Response) => {
  try {
    const barang = await db.barang.findMany();
    return success(res, "Berhasil mendapatkan data barang", barang);
  } catch (err) {
    return internalServerError(res);
  }
};

export const getBarangById = async (req: Request<BarangIdT>, res: Response) => {
  try {
    const validate = await BarangId.safeParseAsync(req.params);
    if (!validate.success) {
      return validationError(res, parseZodError(validate.error));
    }

    const barang = await db.barang.findUnique({
      where: { id: validate.data.id },
    });

    if (!barang) {
      return notFound(
        res,
        `Barang dengan id ${validate.data.id} tidak ditemukan`
      );
    }

    return success(res, "Berhasil mendapatkan data barang", barang);
  } catch (err) {
    return internalServerError(res);
  }
};

export const createBarang = async (
  req: Request<{}, {}, BarangUpdatableT>,
  res: Response
) => {
  try {
    const validate = await BarangUpdatable.safeParseAsync(req.body);
    if (!validate.success) {
      return validationError(res, parseZodError(validate.error));
    }

    const isExists = await db.barang.findFirst({
      where: { kode_sku: validate.data.kode_sku },
    });

    if (isExists) {
      return conflict(res, "Kode SKU sudah digunakan");
    }

    const barang = await db.barang.create({
      data: validate.data,
    });

    return created(res, "Berhasil menambahkan barang");
  } catch (err) {
    return internalServerError(res);
  }
};

export const updateBarang = async (
  req: Request<BarangIdT, {}, Partial<BarangUpdatableT>>,
  res: Response
) => {
  const validateId = await BarangId.safeParseAsync(req.params);
  if (!validateId.success) {
    return validationError(res, parseZodError(validateId.error));
  }

  const validate = await BarangUpdatable.partial().safeParseAsync(req.body);
  if (!validate.success) {
    return validationError(res, parseZodError(validate.error));
  }

  const isExists = await db.barang.findFirst({
    where: { id: validateId.data.id },
  });

  if (!isExists) {
    return notFound(
      res,
      `Barang dengan id ${validateId.data.id} tidak ditemukan`
    );
  }

  const barang = await db.barang.update({
    where: { id: validateId.data.id },
    data: validate.data,
  });

  return success(res, "Berhasil mengupdate barang");
};

export const deleteBarangById = async (
  req: Request<BarangIdT>,
  res: Response
) => {
  const validate = await BarangId.safeParseAsync(req.params);
  if (!validate.success) {
    return validationError(res, parseZodError(validate.error));
  }

  const barang = await db.barang.delete({ where: { id: validate.data.id } });
  if (!barang) {
    return notFound(
      res,
      `Barang dengan id ${validate.data.id} tidak ditemukan`
    );
  }

  return success(res, "Berhasil menghapus barang");
};
