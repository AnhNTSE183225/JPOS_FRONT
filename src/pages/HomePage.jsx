import NavigationBar from "../components/NavigationBar";
import "./HomePage.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import img1 from "../assets/ring1.png";
import img2 from "../assets/ring2.png";
import img3 from "../assets/ring3.png";
import img4 from "../assets/ring4.png";
import shape1 from "../assets/shape1.svg";
import shape2 from "../assets/shape2.svg";
import shape3 from "../assets/shape3.svg";
import shape4 from "../assets/shape4.svg";
import shape5 from "../assets/shape5.svg";
import img from "../assets/mrs_indian.png";

import { useRef, useState } from "react";

const HomePage = () => {
    const ringsRef = useRef(null);
    const shapesRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const rings = [
        { id: 1, name: "ring", src: img1 },
        { id: 2, name: "ring", src: img2 },
        { id: 3, name: "ring", src: img3 },
        { id: 4, name: "ring", src: img4 },
        { id: 5, name: "ring", src: img1 },
        { id: 6, name: "ring", src: img1 },
        { id: 7, name: "ring", src: img1 },
        { id: 8, name: "ring", src: img1 },
    ];
    const shapes = [
        { id: 1, name: "shape", src: shape1 },
        { id: 2, name: "shape", src: shape2 },
        { id: 3, name: "shape", src: shape3 },
        { id: 4, name: "shape", src: shape4 },
        { id: 5, name: "shape", src: shape5 },
    ];


    const handleMouseDown = (e, ref) => {
        setIsMouseDown(true);
        setStartX(e.pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
    };
    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };
    const handleMouseUp = () => {
        setIsMouseDown(false);
    };
    const handleMouseMove = (e, ref) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        ref.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <>
            <div className="image-container">
                <img src={img} alt="mrs_indian" />
                <div className="image-text">
                    <h2>Embrace the Opulence of Autumn</h2>
                    <p className="text-break">
                        As the leaves turn to shades of amber and gold, we unveil our Fall
                        Collection, a tribute to the timeless elegance of Indian
                        craftsmanship. Our cover, a portrait of grace, captures the essence
                        of autumnal beauty-a stunning Indian model, draped in the richness
                        of traditional attire, her visage framed by exquisite jewelry that
                        whispers tales of heritage and opulence.
                    </p>
                    <button>Learn More</button>
                </div>
            </div>
            <div className="chooseRings">
                <div className="title">
                    <h2>Explore Category</h2>
                </div>
                <div
                    className="ringsType"
                    ref={ringsRef}
                    onMouseDown={(e) => handleMouseDown(e, ringsRef)}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={(e) => handleMouseMove(e, ringsRef)}
                >
                    {rings.map((ring) => (
                        <div className="ring" key={ring.id}>
                            <div className="ringImage">
                                <img src={ring.src} alt={ring.name} />
                            </div>
                            <div className="ringName">{ring.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chooseShapes">
                <div className="title">
                    <h2>Explore Diamonds</h2>
                </div>
                <div
                    className="shapesType"
                    ref={shapesRef}
                    onMouseDown={(e) => handleMouseDown(e, shapesRef)}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={(e) => handleMouseDown(e, shapesRef)}
                >
                    {shapes.map((shape) => (
                        <div className="shape" key={shape.id}>
                            <div className="shapeImage">
                                <img src={shape.src} alt={shape.name} />
                            </div>
                            <div className="shapeName">{shape.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomePage;
