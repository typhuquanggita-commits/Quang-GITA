/**
 * Icon set — a single stroked SVG family so weights stay consistent.
 * Icons are decorative by default; a meaningful icon takes a `title`.
 */
import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
}

function Icon({ size = 18, title, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const IconHome = (p: IconProps) => (
  <Icon {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" /><path d="M9.5 20v-6h5v6" /></Icon>
);
export const IconTarget = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></Icon>
);
export const IconBook = (p: IconProps) => (
  <Icon {...p}><path d="M4 4.5h6a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H4Z" /><path d="M20 4.5h-6a3 3 0 0 0-3 3V20a2.5 2.5 0 0 1 2.5-2.5H20Z" /></Icon>
);
export const IconCards = (p: IconProps) => (
  <Icon {...p}><rect x="3" y="6" width="14" height="13" rx="2" /><path d="M7 3h11a2 2 0 0 1 2 2v11" /></Icon>
);
export const IconCalendar = (p: IconProps) => (
  <Icon {...p}><rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M3.5 10h17" /><path d="M8 3v4M16 3v4" /></Icon>
);
export const IconClipboard = (p: IconProps) => (
  <Icon {...p}><path d="M9 4.5H7.5A2.5 2.5 0 0 0 5 7v12a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 19V7a2.5 2.5 0 0 0-2.5-2.5H15" /><rect x="9" y="2.5" width="6" height="4" rx="1.4" /><path d="M8.5 12h7M8.5 16h4.5" /></Icon>
);
export const IconRefresh = (p: IconProps) => (
  <Icon {...p}><path d="M20 11a8 8 0 1 0-1.6 5.6" /><path d="M20 4.5V11h-6.5" /></Icon>
);
export const IconChart = (p: IconProps) => (
  <Icon {...p}><path d="M4 20V4" /><path d="M4 20h16" /><path d="M8 16v-4M12.5 16V8M17 16v-6" /></Icon>
);
export const IconSettings = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2.5v2.6M12 18.9v2.6M21.5 12h-2.6M5.1 12H2.5M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8M18.7 18.7l-1.8-1.8M7.1 7.1 5.3 5.3" /></Icon>
);
export const IconFlag = (p: IconProps) => (
  <Icon {...p}><path d="M5 21V4" /><path d="M5 4.8h11.5l-2.2 3.6 2.2 3.6H5" /></Icon>
);
export const IconFlagFilled = (p: IconProps) => (
  <Icon {...p}><path d="M5 21V4" /><path d="M5 4.8h11.5l-2.2 3.6 2.2 3.6H5" fill="currentColor" /></Icon>
);
export const IconCalculator = (p: IconProps) => (
  <Icon {...p}><rect x="4.5" y="2.5" width="15" height="19" rx="2.5" /><rect x="8" y="6" width="8" height="3" rx="0.8" /><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01" strokeWidth="2.4" /></Icon>
);
export const IconSigma = (p: IconProps) => (
  <Icon {...p}><path d="M17.5 5H6.5l5.5 7-5.5 7h11" /></Icon>
);
export const IconHighlight = (p: IconProps) => (
  <Icon {...p}><path d="M13 5.5 18.5 11l-7 7H6l-1.5-3.5Z" /><path d="M14 21h6" /></Icon>
);
export const IconClock = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5.3l3.2 2" /></Icon>
);
export const IconEye = (p: IconProps) => (
  <Icon {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></Icon>
);
export const IconEyeOff = (p: IconProps) => (
  <Icon {...p}><path d="M4 4l16 16" /><path d="M9.9 5.9A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.3 4" /><path d="M6.3 7.9A16.7 16.7 0 0 0 2.5 12S6 18.5 12 18.5a9.7 9.7 0 0 0 3.9-.8" /><path d="M9.9 10.1a3 3 0 0 0 4.1 4.2" /></Icon>
);
export const IconCheck = (p: IconProps) => (<Icon {...p}><path d="M4.5 12.5 9.5 17.5 19.5 6.5" /></Icon>);
export const IconX = (p: IconProps) => (<Icon {...p}><path d="M6 6l12 12M18 6 6 18" /></Icon>);
export const IconChevronRight = (p: IconProps) => (<Icon {...p}><path d="M9 5l7 7-7 7" /></Icon>);
export const IconChevronLeft = (p: IconProps) => (<Icon {...p}><path d="M15 5l-7 7 7 7" /></Icon>);
export const IconChevronDown = (p: IconProps) => (<Icon {...p}><path d="M5 9l7 7 7-7" /></Icon>);
export const IconGrid = (p: IconProps) => (
  <Icon {...p}><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></Icon>
);
export const IconMenu = (p: IconProps) => (<Icon {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>);
export const IconDownload = (p: IconProps) => (
  <Icon {...p}><path d="M12 3v12" /><path d="M7.5 10.5 12 15l4.5-4.5" /><path d="M4 20h16" /></Icon>
);
export const IconUpload = (p: IconProps) => (
  <Icon {...p}><path d="M12 15V3" /><path d="M7.5 7.5 12 3l4.5 4.5" /><path d="M4 20h16" /></Icon>
);
export const IconPrint = (p: IconProps) => (
  <Icon {...p}><path d="M7 9V3.5h10V9" /><rect x="3.5" y="9" width="17" height="7.5" rx="2" /><rect x="7" y="14" width="10" height="6.5" rx="1.2" /></Icon>
);
export const IconTrash = (p: IconProps) => (
  <Icon {...p}><path d="M4 6.5h16" /><path d="M9 6.5V4.2A1.2 1.2 0 0 1 10.2 3h3.6A1.2 1.2 0 0 1 15 4.2v2.3" /><path d="M6 6.5 6.8 20a1.5 1.5 0 0 0 1.5 1.4h7.4a1.5 1.5 0 0 0 1.5-1.4L18 6.5" /></Icon>
);
export const IconFire = (p: IconProps) => (
  <Icon {...p}><path d="M12 2.5s5 4.4 5 9a5 5 0 0 1-10 0c0-1.7.8-3 1.6-4 .2 1.2.9 2 1.8 2 1.3 0 1.8-1.3 1.6-3.2Z" /></Icon>
);
export const IconSparkle = (p: IconProps) => (
  <Icon {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" /><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" /></Icon>
);
export const IconAlert = (p: IconProps) => (
  <Icon {...p}><path d="M12 3.5 21.5 20h-19Z" /><path d="M12 10v4.2M12 17.3h.01" strokeWidth="2.2" /></Icon>
);
export const IconInfo = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8h.01" strokeWidth="2.2" /></Icon>
);
export const IconBookmark = (p: IconProps) => (
  <Icon {...p}><path d="M6 3.5h12v17l-6-4-6 4Z" /></Icon>
);
export const IconPlay = (p: IconProps) => (<Icon {...p}><path d="M7 4.5 19 12 7 19.5Z" /></Icon>);
export const IconLightning = (p: IconProps) => (<Icon {...p}><path d="M13.5 2.5 5 13.5h6L10.5 21.5 19 10.5h-6Z" /></Icon>);
