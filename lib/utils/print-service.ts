import { CartItem } from '@/types/cart';

interface PrintOptions {
  title?: string;
  width?: number;
}

export class PrintService {
  private width: number;
  
  constructor(options: PrintOptions = {}) {
    this.width = options.width || 40; // 40 karakterlik satır genişliği
  }

  private center(text: string): string {
    const spaces = Math.max(0, Math.floor((this.width - text.length) / 2));
    return ' '.repeat(spaces) + text;
  }

  private line(char: string = '-'): string {
    return char.repeat(this.width);
  }

  private formatPrice(price: number): string {
    return price.toFixed(2) + ' ₺';
  }

  private formatItem(item: CartItem): string {
    const quantity = item.quantity.toString() + 'x';
    const price = this.formatPrice(item.product.price * item.quantity);
    const nameWidth = this.width - quantity.length - price.length - 2;
    const name = item.product.name.slice(0, nameWidth).padEnd(nameWidth);
    
    return `${quantity} ${name} ${price}`;
  }

  private formatComboItem(item: CartItem): string[] {
    const lines: string[] = [];
    const mainLine = this.formatItem(item);
    lines.push(mainLine);

    if (item.product.comboSelections) {
      Object.entries(item.product.comboSelections).forEach(([groupName, selections]) => {
        lines.push(`  ${groupName}:`);
        selections.forEach(selection => {
          const quantity = selection.quantity.toString() + 'x';
          const name = selection.item.MenuItemText;
          lines.push(`    ${quantity} ${name}`);
        });
      });
    }

    return lines;
  }

  generateReceipt(items: CartItem[], total: number, orderNumber: string): string {
    const lines: string[] = [];

    // Başlık
    lines.push(this.line());
    lines.push(this.center('LEZZET RESTORAN'));
    lines.push(this.center('Dijital Menü Siparişi'));
    lines.push(this.line());

    // Sipariş numarası ve tarih
    lines.push(`Sipariş No: #${orderNumber}`);
    lines.push(`Tarih: ${new Date().toLocaleString('tr-TR')}`);
    lines.push(this.line());

    // Ürünler
    items.forEach(item => {
      if (item.product.isCombo) {
        lines.push(...this.formatComboItem(item));
      } else {
        lines.push(this.formatItem(item));
      }
    });

    // Toplam
    lines.push(this.line());
    const totalLine = `TOPLAM: ${this.formatPrice(total)}`;
    lines.push(totalLine.padStart(this.width));

    // Alt bilgi
    lines.push(this.line());
    lines.push(this.center('Bizi tercih ettiğiniz için'));
    lines.push(this.center('teşekkür ederiz!'));
    lines.push(this.line());

    // Boş satır ekle
    lines.push('\n\n\n'); // Kağıt kesimi için boşluk

    return lines.join('\n');
  }

  async print(content: string): Promise<boolean> {
    try {
      if (!window?.print) {
        console.warn('Print functionality is not available');
        return false;
      }

      // Yazdırma için gizli bir iframe oluştur
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // iframe içeriğini ayarla
      const doc = iframe.contentWindow?.document;
      if (!doc) {
        return false;
      }

      // Termal yazıcı için uygun stiller
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: monospace;
                font-size: 12px;
                white-space: pre;
                margin: 0;
                padding: 0;
              }
              @page {
                margin: 0;
                size: 80mm auto;
              }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `);
      doc.close();

      // Yazdırma işlemini başlat
      iframe.contentWindow?.print();

      // Temizlik
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);

      return true;
    } catch (error) {
      console.warn('Print failed:', error);
      return false;
    }
  }
}

export const printService = new PrintService({ width: 40 });
