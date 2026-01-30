import "./globals.css";

export const metadata = {
  title: "Brothers – Poetry",
  description: "A scrollable poetry experience"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
