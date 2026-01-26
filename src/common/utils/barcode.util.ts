import { v4 as uuidv4 } from 'uuid';
import bwipjs from 'bwip-js';

export function generateBarcode(prefix: string = 'MG'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = uuidv4().split('-')[0].toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
}

export async function generateBarcodeImage(
  barcode: string,
  options?: {
    format?: 'code128' | 'code39' | 'ean13' | 'ean8' | 'upc';
    width?: number;
    height?: number;
    scale?: number;
  },
): Promise<Buffer> {
  if (!barcode || barcode.trim().length === 0) {
    throw new Error('Barcode value is required');
  }

  const cleanBarcode = barcode.replace(/[^A-Za-z0-9-]/g, '');

  const barcodeType = options?.format || 'code128';
  const scale = options?.scale || 3;
  const height = options?.height || 50;

  try {
    const png = await bwipjs.toBuffer({
      bcid: barcodeType,
      text: cleanBarcode,
      scale: scale,
      height: height,
      includetext: true,
      textxalign: 'center',
    });

    return png;
  } catch (error) {
    throw new Error(
      `Failed to generate barcode: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

export function generateBarcodeSVG(
  barcode: string,
  options?: {
    format?: 'code128' | 'code39' | 'ean13' | 'ean8' | 'upc';
    width?: number;
    height?: number;
    scale?: number;
  },
): string {
  if (!barcode || barcode.trim().length === 0) {
    throw new Error('Barcode value is required');
  }

  const cleanBarcode = barcode.replace(/[^A-Za-z0-9-]/g, '');

  const barcodeType = options?.format || 'code128';
  const scale = options?.scale || 3;
  const height = options?.height || 50;

  try {
    const svg = bwipjs.toSVG({
      bcid: barcodeType,
      text: cleanBarcode,
      scale: scale,
      height: height,
      includetext: true,
      textxalign: 'center',
    });

    return svg;
  } catch (error) {
    throw new Error(
      `Failed to generate barcode: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

export function generateInvoiceNumber(prefix: string = 'INV'): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${prefix}-${year}${month}${day}-${random}`;
}

export function generateJobId(prefix: string = 'SRV'): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${prefix}-${year}${month}-${random}`;
}
