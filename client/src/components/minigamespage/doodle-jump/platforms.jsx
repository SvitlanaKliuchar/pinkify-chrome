import brokenPlatformImage from '../../../assets/mini-games/doodle-jump/platform-broken.png'
import platformImage from '../../../assets/mini-games/doodle-jump/platform.png'

export default function Platforms(props) {
  return props?.platforms?.map((platform) => {
    const image = platform.isBroken ? brokenPlatformImage : platformImage;
    return (
      <img
        key={Math.random()}
        src={image}
        className="platform"
        style={{ left: `${platform.left}px`, bottom: `${platform.bottom}px` }}
        alt="platform"
      />
    );
  });
}