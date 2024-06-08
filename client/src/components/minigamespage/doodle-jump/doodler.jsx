import doodlerImage from '../../../assets/mini-games/doodle-jump/owl.webp'

export default function Doodler(props) {
    return (
      <img
        src={doodlerImage}
        className="doodler"
        style={{
          left: `${props.doodler.left}px`,
          bottom: `${props.doodler.bottom}px`,
        }}
        alt="doodler"
      />
    );
  }