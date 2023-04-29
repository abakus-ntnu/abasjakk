import "src/styles/laser.css";


const Laser = () => {
    return (
        <div className="laserBox">
            <div className="laser-beam left" />
            <div className="laser-beam red left" />
            <div className="laser-beam purple left unsynced" />
            <div className="laser-beam green left unsynced" />
            <div className="laser-beam unsynced" />
            <div className="laser-beam red unsynced" />
            <div className="laser-beam purple" />
            <div className="laser-beam green" />
            <div className="laser-beam right" />
            <div className="laser-beam red right" />
            <div className="laser-beam purple right unsynced" />
            <div className="laser-beam green right unsynced" />
        </div>
    );
}


export default Laser;