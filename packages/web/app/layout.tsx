import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { UserContextProvider } from '@/context/UserContextProvider';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'RepID',
  description: 'RepID',
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body className={`${inter.className} antialiased`}>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
      <UserContextProvider>
        <AuthGuard>
          <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center">
            {children}
            <Toaster visibleToasts={9} position={'top-right'} richColors={true} expand={true} closeButton={true}/>
          </div>
        </AuthGuard>
      </UserContextProvider>
    </GoogleOAuthProvider>
    </body>
    </html>
  );
}
