export const metadata = {
  title: 'ChampR QL',
  description: 'Quick Look for ChampR',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>{children}</body>
    </html>
  );
}