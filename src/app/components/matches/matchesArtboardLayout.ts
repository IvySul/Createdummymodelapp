/** Design-time white card inset inside `matches-*-artboard.svg` assets (same in both files). */
export const MATCHES_ARTBOARD_VIEWBOX_W = 426.1;
export const MATCHES_ARTBOARD_VIEWBOX_H = 401.03;
export const MATCHES_ARTBOARD_CARD_X = 21.42;
export const MATCHES_ARTBOARD_CARD_W = 387.85;

/** Stretch artwork so the card spans the whole viewBox width (same perceived width as hero / shell). */
export const MATCHES_ARTBOARD_SCALE_X =
  MATCHES_ARTBOARD_VIEWBOX_W / MATCHES_ARTBOARD_CARD_W;

/**
 * SVG applies transforms right-to-left: translate then scale achieves x' = sx * (x - cardX).
 * See MatchesBasicInfoArtboard SVG structure (card rect starts at CARD_X).
 */
export function matchesArtboardStretchTransform(): string {
  return `scale(${MATCHES_ARTBOARD_SCALE_X}, 1) translate(-${MATCHES_ARTBOARD_CARD_X}, 0)`;
}
