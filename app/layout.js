import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Toronto Sandsharks Beach Volleyball Club",
  description: "LGBTQ+ beach volleyball in Toronto",
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body className='bg-orange-200 m-6'>
            <Provider>
                <main className='app'>
                    <Navbar />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout