import { v4 as uuidv4 } from 'uuid';

export function generateBarcode(prefix: string = 'MG'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = uuidv4().split('-')[0].toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
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
