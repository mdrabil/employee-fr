import React, { useState, useMemo } from "react";


const TermsCondition =()=> {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const sections = useMemo(
    () => [
      {
        id: "intro",
        title: "1. Introduction",
        body: `Welcome to Example Company. These Terms & Conditions ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.`,
      },
      {
        id: "usage",
        title: "2. Acceptable Use",
        body: `You agree not to use the service for illegal activities, to transmit malware, or to harass others. You will not attempt to reverse-engineer, exploit or otherwise misuse the platform.`,
      },
      {
        id: "accounts",
        title: "3. Accounts & Registration",
        body: `Some features require creating an account. Keep credentials secure. You are responsible for activity under your account. We may suspend or terminate accounts that violate these Terms.`,
      },
      {
        id: "content",
        title: "4. Content and Intellectual Property",
        body: `All content provided by the company (text, images, logos) is owned by us or our licensors. You may not copy or redistribute our content without permission.`,
      },
      {
        id: "privacy",
        title: "5. Privacy",
        body: `Our Privacy Policy explains how we collect and use your information. By using the service you also accept the terms of the Privacy Policy.`,
      },
      {
        id: "disclaimer",
        title: "6. Disclaimers & Limitation of Liability",
        body: `Services are provided "as-is". To the maximum extent permitted by law, we disclaim warranties and limit liability for damages arising from use of the service.`,
      },
      {
        id: "changes",
        title: "7. Changes to Terms",
        body: `We may modify these Terms. Significant changes will be communicated. Continued use after changes means you accept them.`,
      },
      {
        id: "governing",
        title: "8. Governing Law",
        body: `These Terms are governed by the laws of the jurisdiction where Example Company is registered.`,
      },
      {
        id: "contact",
        title: "9. Contact",
        body: `If you have questions about these Terms, please contact us at support@example.com.`,
      },
    ],
    []
  );

  const filtered = sections.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.body.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">Terms & Conditions</h1>
            <p className="text-sm text-gray-600 mt-1">Last updated: August 11, 2025</p>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
              />
              <span>I accept these Terms</span>
            </label>

            <button
              onClick={() => window.print()}
              className="hidden md:inline-block rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-100"
              aria-label="Print terms"
            >
              Print
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar / TOC */}
          <aside className="order-2 md:order-1 md:col-span-1">
            <div className="sticky top-6 rounded-lg border border-gray-100 bg-white p-4 shadow">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="h-5 w-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" />
                </svg>
                <h3 className="text-sm font-semibold">Quick links</h3>
              </div>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search inside terms..."
                className="mb-3 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                aria-label="Search terms"
              />

              <nav className="flex max-h-56 flex-col gap-2 overflow-auto">
                {filtered.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      toggle(i);
                      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className="text-left text-sm text-gray-700 hover:text-orange-600"
                  >
                    {s.title}
                  </button>
                ))}

                {filtered.length === 0 && <p className="text-xs text-gray-400">No matches</p>}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="order-1 md:order-2 md:col-span-3">
            <article className="space-y-6">
              {sections.map((sec, i) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="rounded-lg bg-white p-5 shadow-sm"
                >
                  <header className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{sec.title}</h2>
                      <p className="mt-1 text-sm text-gray-500">Section {i + 1}</p>
                    </div>

                    <div className="md:hidden">
                      <button
                        onClick={() => toggle(i)}
                        aria-expanded={activeIndex === i}
                        aria-controls={`${sec.id}-body`}
                        className="rounded-md border border-gray-200 px-3 py-2 text-sm"
                      >
                        {activeIndex === i ? "Collapse" : "Expand"}
                      </button>
                    </div>
                  </header>

                  <div
                    id={`${sec.id}-body`}
                    className={`mt-4 text-sm leading-relaxed text-gray-700 ${
                      activeIndex !== null && activeIndex !== i ? "hidden md:block" : "block"
                    }`}
                  >
                    <p>{sec.body}</p>

                    {/* Example small sublist */}
                    {sec.id === "usage" && (
                      <ul className="mt-3 ml-5 list-disc text-sm text-gray-600">
                        <li>Do not upload viruses, malware, or otherwise harmful files.</li>
                        <li>Use the service in accordance with local laws.</li>
                        <li>Respect other users and intellectual property rights.</li>
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </article>

            <footer className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-gray-600">
                <p>
                  By continuing you acknowledge that you have read and understood these Terms and agree to be bound by them.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="rounded-md border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Back to top
                </button>

                <button
                  disabled={!agreed}
                  onClick={() => alert("Thanks — you accepted the Terms.")}
                  className={`rounded-md px-4 py-2 text-sm font-medium shadow-sm ${
                    agreed
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Accept
                </button>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}


export default TermsCondition