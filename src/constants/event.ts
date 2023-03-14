const EVENT = {
  ZOOM_IN: 'ZOOM_IN',
  ZOOM_OUT: 'ZOOM_OUT',
} as const;

export type EventKey = keyof typeof EVENT;

export default EVENT;
