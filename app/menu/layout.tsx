import { ThemeProvider } from '@/components/theme/theme-provider';
import { MenuProvider } from '@/components/menu/menu-provider';
import { Sidebar } from '@/components/layout/sidebar/sidebar';
import { CartFooter } from '@/components/cart/cart-footer';

export default function MenuLayout({
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  return (
    <MenuProvider>
      <ThemeProvider />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-80 pb-24">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
        <CartFooter />
      </div>
    </MenuProvider>
  );
}
