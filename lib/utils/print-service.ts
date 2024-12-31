'use client';

import { CartItem } from '@/types/cart';

class PrintService {
  isElastic: boolean = false;

  generateReceipt(items: CartItem[], total: number): string {
    const receiptHTML = `
      <div>
        <div style="text-align: center; margin-bottom: 10px;">
          ACME Restaurant
          <br>
          Tel: (555) 123-4567
        </div>
        
        <div style="border-bottom: 1px dashed black; margin: 5px 0;"></div>
        
        ${items.map(item => `
          <div style="display: flex; justify-content: space-between;">
            <span>${item.product.name} x${item.quantity}</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}₺</span>
          </div>
        `).join('')}
        
        <div style="border-bottom: 1px dashed black; margin: 5px 0;"></div>
        
        <div style="display: flex; justify-content: space-between;">
          <strong>TOPLAM</strong>
          <strong>${total.toFixed(2)}₺</strong>
        </div>
        
        <div style="text-align: center; margin-top: 10px;">
          Bizi tercih ettiğiniz için teşekkürler!
        </div>
      </div>
    `;

    return receiptHTML;
  }

  async print(receiptHTML: string): Promise<boolean> {
    if (!this.isElastic) {
      return false;
    }

    try {
      window.chrome.webview.postMessage({
        channel: 'print-request',
        args: [receiptHTML]
      });

      return true;
    } catch (error) {
      console.warn('Yazdırma işlemi başarısız oldu:', error);
      return false;
    }
  }
}

export const printService = new PrintService();
