import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const SparkleIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 1L13.5 8.5L21 10L13.5 11.5L12 19L10.5 11.5L3 10L10.5 8.5L12 1Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    <path
      d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z"
      fill="currentColor"
      fillOpacity="0.7"
    />
    <path
      d="M6 15L6.5 17.5L9 18L6.5 18.5L6 21L5.5 18.5L3 18L5.5 17.5L6 15Z"
      fill="currentColor"
      fillOpacity="0.6"
    />
  </svg>
);

export const FlowerIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10C10.21 10 12 8.21 12 6Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
    <path
      d="M20 8C20 5.79 18.21 4 16 4C13.79 4 12 5.79 12 8C12 10.21 13.79 12 16 12C18.21 12 20 10.21 20 8Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
    <path
      d="M12 16C12 13.79 10.21 12 8 12C5.79 12 4 13.79 4 16C4 18.21 5.79 20 8 20C10.21 20 12 18.21 12 16Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
    <path
      d="M20 16C20 13.79 18.21 12 16 12C13.79 12 12 13.79 12 16C12 18.21 13.79 20 16 20C18.21 20 20 18.21 20 16Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

export const LeafIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M17 8C18.5 6.5 18.5 4 17 2.5C15.5 1 13 1 11.5 2.5L4 10C2.5 11.5 2.5 14 4 15.5C5.5 17 8 17 9.5 15.5L17 8Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    <path
      d="M11.5 2.5C13 1 15.5 1 17 2.5C18.5 4 18.5 6.5 17 8L15 10L9.5 4.5L11.5 2.5Z"
      fill="currentColor"
      fillOpacity="0.7"
    />
    <path
      d="M9 6L15 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

export const HeartIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
  </svg>
);

export const PetalIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L14 8L20 6L16 12L22 14L16 16L20 22L14 20L12 26L10 20L4 22L8 16L2 14L8 12L4 6L10 8L12 2Z"
      fill="currentColor"
      fillOpacity="0.8"
      transform="scale(0.8) translate(2.4, 2.4)"
    />
  </svg>
);

export const ButterflyIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L12 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 8C8 6 4 8 4 12C4 16 8 18 12 16"
      fill="currentColor"
      fillOpacity="0.7"
    />
    <path
      d="M12 8C16 6 20 8 20 12C20 16 16 18 12 16"
      fill="currentColor"
      fillOpacity="0.7"
    />
    <path
      d="M12 16C8 14 4 16 4 20C4 24 8 26 12 24"
      fill="currentColor"
      fillOpacity="0.5"
    />
    <path
      d="M12 16C16 14 20 16 20 20C20 24 16 26 12 24"
      fill="currentColor"
      fillOpacity="0.5"
    />
  </svg>
);

export const SoftFileIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    <path
      d="M14 2V8H20"
      fill="currentColor"
      fillOpacity="0.6"
    />
    <path
      d="M16 13L12 17L8 13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
  </svg>
);