import basicInfoBlank from '../../../assets/matches-basic-info-artboard.svg';

/** SVG artboard only: no dynamic text overlays. */
export function MatchesBasicInfoArtboard() {
  return (
    <div data-no-swipe="true" className="w-full">
      <img
        src={basicInfoBlank}
        alt=""
        aria-hidden
        className="pointer-events-none block h-auto w-full select-none"
      />
    </div>
  );
}
