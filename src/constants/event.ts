export const MOUSE_EVENT = {
  ZOOM_IN: 'ZOOM_IN',
  ZOOM_OUT: 'ZOOM_OUT',
} as const;

export type MouseEventKey = keyof typeof MOUSE_EVENT;

export const RENDER_TYPE = {
  CLICKED_CHART: 'CLICKED_CHART',
  ALL: 'ALL',
} as const;

export type RenderTypeKey = keyof typeof RENDER_TYPE;
