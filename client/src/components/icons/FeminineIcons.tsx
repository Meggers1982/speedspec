import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Chic-style minimalist outline icons
export const ChicIdeaIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 21C9 21.5523 9.44772 22 10 22H14C14.5523 22 15 21.5523 15 21V20H9V21Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2C8.13401 2 5 5.13401 5 9C5 11.3868 6.33826 13.4615 8.35517 14.5466C8.75935 14.7726 9 15.2072 9 15.6828V18C9 18.5523 9.44772 19 10 19H14C14.5523 19 15 18.5523 15 18V15.6828C15 15.2072 15.2407 14.7726 15.6448 14.5466C17.6617 13.4615 19 11.3868 19 9C19 5.13401 15.866 2 12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChicFeaturesIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChicFlowIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M3 12H21M3 12L8 7M3 12L8 17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="6"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="12"
      cy="18"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const ChicTechIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect
      x="2"
      y="3"
      width="20"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 21H16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 17V21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M7 8L10 11L7 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 12H17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const ChicDocumentIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2V8H20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 13L12 17L8 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChicHeartIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChicCheckIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 12L11 15L16 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChicSparkleIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 3L13.4 7.6L18 9L13.4 10.4L12 15L10.6 10.4L6 9L10.6 7.6L12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 3L19.5 4.5L21 5L19.5 5.5L19 7L18.5 5.5L17 5L18.5 4.5L19 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 17L6.5 18.5L8 19L6.5 19.5L6 21L5.5 19.5L4 19L5.5 18.5L6 17Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Legacy icons for backwards compatibility
export const SparkleIcon = ChicSparkleIcon;
export const FlowerIcon = ChicFeaturesIcon;
export const LeafIcon = ChicFlowIcon;
export const ButterflyIcon = ChicTechIcon;
export const SoftFileIcon = ChicDocumentIcon;
export const HeartIcon = ChicHeartIcon;