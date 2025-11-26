import React from "react";
import {
  ShieldCheck,
  ScrollText,
  Info,
  FileText,
  Lock,
  Mail,
  Globe,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const sections = [
  {
    id: "intro",
    icon: <Info className="size-5" />,
    title: "Introduction",
    content: (
      <p>
        Welcome! These Terms & Conditions (“Terms”) outline the rules and
        regulations for using our website and services. By accessing or using
        this platform, you agree to these Terms. If you disagree with any part,
        please do not use our services.
      </p>
    ),
  },
  {
    id: "eligibility",
    icon: <CheckCircle2 className="size-5" />,
    title: "Eligibility",
    content: (
      <ul className="list-disc ps-6 space-y-2">
        <li>You must be at least 13 years old (or the legal age in your region).</li>
        <li>
          If representing an organization, you must have proper authorization to
          act on its behalf.
        </li>
      </ul>
    ),
  },
  {
    id: "accounts",
    icon: <FileText className="size-5" />,
    title: "Accounts & Security",
    content: (
      <ul className="list-disc ps-6 space-y-2">
        <li>Keep your account information accurate and secure.</li>
        <li>Do not share your password with anyone.</li>
        <li>
          If you notice suspicious activity, contact us immediately at{" "}
          <span className="font-medium">support@yourdomain.com</span>.
        </li>
      </ul>
    ),
  },
  {
    id: "usage",
    icon: <ScrollText className="size-5" />,
    title: "Acceptable Use",
    content: (
      <ul className="list-disc ps-6 space-y-2">
        <li>Use the website only for lawful purposes.</li>
        <li>Do not send spam, upload malware, or misuse the platform.</li>
        <li>Respect the rights and privacy of others.</li>
      </ul>
    ),
  },
  {
    id: "privacy",
    icon: <Lock className="size-5" />,
    title: "Privacy",
    content: (
      <p>
        We value your privacy. Your personal data is handled according to our{" "}
        <a href="/privacy" className="underline text-indigo-500">
          Privacy Policy
        </a>
        . By using our services, you consent to the data practices described
        there.
      </p>
    ),
  },
  {
    id: "ip",
    icon: <Globe className="size-5" />,
    title: "Intellectual Property",
    content: (
      <ul className="list-disc ps-6 space-y-2">
        <li>
          All content, logos, and software are our property or licensed to us.
        </li>
        <li>
          You retain rights to your user-generated content but grant us a
          non-exclusive license to use it for operating our services.
        </li>
      </ul>
    ),
  },
  {
    id: "payments",
    icon: <FileText className="size-5" />,
    title: "Payments & Subscriptions",
    content: (
      <ul className="list-disc ps-6 space-y-2">
        <li>
          All fees are subject to applicable taxes. Refunds follow our specific
          refund policy stated on the product or subscription page.
        </li>
        <li>
          Subscriptions may auto-renew unless canceled before the billing cycle
          ends.
        </li>
      </ul>
    ),
  },
  {
    id: "termination",
    icon: <AlertTriangle className="size-5" />,
    title: "Termination",
    content: (
      <p>
        We reserve the right to suspend or terminate your account without prior
        notice if you violate these Terms. You can also close your account at
        any time.
      </p>
    ),
  },
  {
    id: "liability",
    icon: <ShieldCheck className="size-5" />,
    title: "Disclaimer & Liability",
    content: (
      <ul className="list-disc ps-6 space-y-2">
        <li>
          Our services are provided “as is” and “as available” without
          warranties of any kind.
        </li>
        <li>
          We are not liable for indirect, incidental, or consequential damages
          as permitted by law.
        </li>
      </ul>
    ),
  },
  {
    id: "changes",
    icon: <ScrollText className="size-5" />,
    title: "Changes to Terms",
    content: (
      <p>
        We may update these Terms periodically. The “Last Updated” date below
        reflects the most recent version. For significant updates, we will
        provide notice where possible.
      </p>
    ),
  },
  {
    id: "contact",
    icon: <Mail className="size-5" />,
    title: "Contact Us",
    content: (
      <p>
        For questions or concerns about these Terms, please email us at{" "}
        <span className="font-medium">csoni0693@gmail.com</span>.
      </p>
    ),
  },
];

function TermsAndConditions() {
  const lastUpdated = "November 26, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 text-gray-900 dark:text-gray-100">
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30 blur-3xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-emerald-500" />
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="size-6" />
            <span className="uppercase tracking-wide text-sm font-semibold">
              Legal
            </span>
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </div>
      </header>

      {/* Content Section */}
      <main className="max-w-5xl mx-auto px-6 pb-16 space-y-10">
        {sections.map((section) => (
          <div
            key={section.id}
            className="p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-slate-800/60 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400">
              {section.icon}
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              {section.content}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default TermsAndConditions;
