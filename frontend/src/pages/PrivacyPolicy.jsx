import React from "react";
import {
  ShieldCheck,
  Info,
  Database,
  Fingerprint,
  Lock,
  Cookie,
  Globe,
  Users,
  FileText,
  Clock,
  Link as LinkIcon,
  Bell,
  Mail,
  RefreshCw,
  Scale,
  Baby,
} from "lucide-react";

const sections = [
  {
    id: "intro",
    icon: <Info className="size-5" />,
    title: "Introduction",
    content: (
      <p>
        This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you use our website, applications, and
        services (“Services”). By using the Services, you consent to the
        practices described in this policy.
      </p>
    ),
  },
  {
    id: "data-we-collect",
    icon: <Database className="size-5" />,
    title: "Information We Collect",
    content: (
      <div className="space-y-3">
        <div>
          <p className="font-medium">Information you provide:</p>
          <ul className="list-disc ps-6 space-y-1">
            <li>Account details (name, email, password)</li>
            <li>Profile data (photo, preferences)</li>
            <li>
              Payment information (processed via secure payment processors)
            </li>
            <li>Support messages and form submissions</li>
          </ul>
        </div>
        <div>
          <p className="font-medium">Information collected automatically:</p>
          <ul className="list-disc ps-6 space-y-1">
            <li>
              Log data (IP address, device info, pages visited, timestamps)
            </li>
            <li>Usage analytics and performance metrics</li>
            <li>Approximate location derived from IP</li>
          </ul>
        </div>
        <div>
          <p className="font-medium">
            Information from cookies & similar tech:
          </p>
          <ul className="list-disc ps-6 space-y-1">
            <li>Session management, preferences, analytics, and advertising</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "how-we-use",
    icon: <Fingerprint className="size-5" />,
    title: "How We Use Your Information",
    content: (
      <ul className="list-disc ps-6 space-y-2">
        <li>Provide, operate, and improve the Services</li>
        <li>Personalize content and recommendations</li>
        <li>Process payments and fulfill orders</li>
        <li>Communicate updates, security alerts, and support</li>
        <li>Conduct analytics, research, and product development</li>
        <li>Comply with legal obligations and enforce our Terms</li>
      </ul>
    ),
  },
  {
    id: "legal-bases",
    icon: <Scale className="size-5" />,
    title: "Legal Bases for Processing (GDPR)",
    content: (
      <ul className="list-disc ps-6 space-y-2">
        <li>Consent (e.g., marketing emails, cookies where required)</li>
        <li>Contract (to deliver the Services you request)</li>
        <li>Legitimate interests (e.g., security, product improvement)</li>
        <li>Legal obligations (e.g., tax, accounting, fraud prevention)</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    icon: <Users className="size-5" />,
    title: "Sharing & Disclosure",
    content: (
      <ul className="list-disc ps-6 space-y-2">
        <li>With service providers (hosting, analytics, payments, support)</li>
        <li>For legal reasons (to comply with law or protect rights)</li>
        <li>Business transfers (merger, acquisition, asset sale)</li>
        <li>With your consent or at your direction</li>
      </ul>
    ),
  },
  {
    id: "retention",
    icon: <Clock className="size-5" />,
    title: "Data Retention",
    content: (
      <p>
        We retain personal data only as long as necessary for the purposes set
        out in this policy, to comply with legal requirements, and to resolve
        disputes. Retention periods vary by data type and context.
      </p>
    ),
  },
  {
    id: "your-rights",
    icon: <FileText className="size-5" />,
    title: "Your Rights",
    content: (
      <div className="space-y-2">
        <p className="font-medium">
          Depending on your location, you may have rights to:
        </p>
        <ul className="list-disc ps-6 space-y-1">
          <li>Access, correct, or delete your personal data</li>
          <li>Object to or restrict certain processing</li>
          <li>Portability of your data</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          To exercise these rights, contact us at{" "}
          <span className="font-medium">privacy@yourdomain.com</span>.
        </p>
      </div>
    ),
  },
  {
    id: "cookies",
    icon: <Cookie className="size-5" />,
    title: "Cookies & Tracking",
    content: (
      <p>
        We use cookies and similar technologies to remember preferences, analyze
        usage, and improve the Services. You can manage cookies via your browser
        settings or system controls. Some features may not function properly
        without cookies.
      </p>
    ),
  },
  {
    id: "security",
    icon: <Lock className="size-5" />,
    title: "Security",
    content: (
      <p>
        We implement technical and organizational measures designed to protect
        your information. However, no method of transmission over the Internet
        or electronic storage is 100% secure.
      </p>
    ),
  },
  {
    id: "transfers",
    icon: <Globe className="size-5" />,
    title: "International Data Transfers",
    content: (
      <p>
        Your information may be transferred to and processed in countries other
        than your own. Where required, we use appropriate safeguards such as
        standard contractual clauses.
      </p>
    ),
  },
  {
    id: "children",
    icon: <Baby className="size-5" />,
    title: "Children’s Privacy",
    content: (
      <p>
        Our Services are not directed to children under the age of 13 (or as
        defined by local law). We do not knowingly collect personal information
        from children.
      </p>
    ),
  },
  {
    id: "notifications",
    icon: <Bell className="size-5" />,
    title: "Marketing & Notifications",
    content: (
      <p>
        With your consent (where required), we may send you promotional emails.
        You can opt out via the unsubscribe link in the email or by contacting
        us.
      </p>
    ),
  },
  {
    id: "third-party",
    icon: <LinkIcon className="size-5" />,
    title: "Third-Party Links",
    content: (
      <p>
        Our Services may contain links to third-party sites. We are not
        responsible for their content or privacy practices. Please review their
        policies.
      </p>
    ),
  },
  {
    id: "changes",
    icon: <RefreshCw className="size-5" />,
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. The “Last Updated”
        date below indicates the most recent revision. Material changes will be
        communicated when appropriate.
      </p>
    ),
  },
  {
    id: "contact",
    icon: <Mail className="size-5" />,
    title: "Contact Us",
    content: (
      <p>
        If you have questions about this Privacy Policy or our data practices,
        contact us at{" "}
        <span className="font-medium">privacy@yourdomain.com</span>.
      </p>
    ),
  },
];

function PrivacyPolicy() {
  const lastUpdated = "November 26, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30 blur-3xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-emerald-500" />
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="size-6" />
            <span className="uppercase tracking-wide text-sm font-semibold">
              Privacy
            </span>
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </div>
      </header>

      {/* Content */}
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

export default PrivacyPolicy;
