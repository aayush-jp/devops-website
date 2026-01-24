import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aayush JP | Cloud & DevOps Engineer",
  description: "Portfolio of Aayush JP - Specializing in AWS, Docker, Kubernetes, and Backend Systems.",
  keywords: [
    "DevOps",
    "Cloud Engineer",
    "AWS",
    "Docker",
    "Kubernetes",
    "Next.js",
    "Portfolio",
    "Backend Developer",
    "Terraform",
    "CI/CD",
    "Infrastructure as Code",
    "Container Orchestration",
    "Aayush JP",
  ],
  authors: [{ name: "Aayush JP" }],
  creator: "Aayush JP",
  publisher: "Aayush JP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aayushjp.com"), // Update with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aayushjp.com", // Update with your actual domain
    title: "Aayush JP | Cloud & DevOps Engineer",
    description: "Portfolio of Aayush JP - Specializing in AWS, Docker, Kubernetes, and Backend Systems.",
    siteName: "Aayush JP Portfolio",
    images: [
      {
        url: "/og-image.png", // Add your custom OG image here
        width: 1200,
        height: 630,
        alt: "Aayush JP - Cloud & DevOps Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayush JP | Cloud & DevOps Engineer",
    description: "Portfolio of Aayush JP - Specializing in AWS, Docker, Kubernetes, and Backend Systems.",
    images: ["/og-image.png"], // Add your custom OG image here
    creator: "@aayushjp", // Update with your Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you verify with services
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
