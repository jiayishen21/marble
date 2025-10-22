import React from "react";
import Link from "next/link";

type WindowCardProps = {
  title: string;
  href: string;
  subtitle?: string;
  external?: boolean;
};

export default function WindowCard({
  title,
  href,
  subtitle,
  external,
}: WindowCardProps) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-md transition-all p-5">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#17499A] transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-600 leading-relaxed">{subtitle}</p>
        )}
        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[#17499A] hover:text-[#0f3b7c] font-medium"
          >
            Open
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.5 4.5H19.5V10.5M19.5 4.5L10.5 13.5M19.5 19.5H4.5V4.5"
              />
            </svg>
          </a>
        ) : (
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm text-[#17499A] hover:text-[#0f3b7c] font-medium"
          >
            Open
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
