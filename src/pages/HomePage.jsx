import NavigationBar from "../components/NavigationBar";
import './HomePage.css'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import img from '../assets/ring1.png';
import { useRef, useState } from "react";

const HomePage = () => {
    const itemsRef = useRef(null);
    const [ isMouseDown, setIsMouseDown ] = useState(false);
    const [ startX, setStartX ] = useState(0);
    const [ scrollLeft, setScrollLeft ] = useState(0);

    const rings = [{id: 1, name: 'ring', src: img},
                   {id: 2, name: 'ring', src: img},
                   {id: 3, name: 'ring', src: img},
                   {id: 4, name: 'ring', src: img},
                   {id: 5, name: 'ring', src: img},
                   {id: 6, name: 'ring', src: img},
                   {id: 7, name: 'ring', src: img},
                   {id: 8, name: 'ring', src: img},
                   {id: 9, name: 'ring', src: img},
                   {id: 10, name: 'ring', src: img},
                   {id: 11, name: 'ring', src: img},
                   {id: 12, name: 'ring', src: img},
                   {id: 13, name: 'ring', src: img},
                   {id: 14, name: 'ring', src: img},
                   {id: 15, name: 'ring', src: img},
                   {id: 16, name: 'ring', src: img},
                   {id: 17, name: 'ring', src: img},
                   {id: 18, name: 'ring', src: img},
                   {id: 19, name: 'ring', src: img}
    ];

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - - itemsRef.current.offsetLeft);
        setScrollLeft(itemsRef.current.scrollLeft);
    }
    const handleMouseLeave = () =>  {
        setIsMouseDown(false);
    }
    const handleMouseUp = () => {
        setIsMouseDown(false);
    }
    const handleMouseMove = (e) => {
        if(!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - itemsRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        itemsRef.current.scrollLeft = scrollLeft - walk;
    }

  return (
    <>
    <div>
      <NavigationBar />
    </div>
    <div className="ringsType" ref={itemsRef}
        onMouseDown = {handleMouseDown}
        onMouseLeave = {handleMouseLeave} 
        onMouseUp = {handleMouseUp}
        onMouseMove = {handleMouseMove}
    >
        {
            rings.map((ring) => (
                <div className="ring" key={ring.id}>
                    <div className="ringImage">
                        <img src={ring.src} alt={ring.name} />
                    </div>
                    <div className="ringName">
                        {ring.name}
                    </div>
                </div>
            ))
        }
    </div>
    </>
    
    
  );
};

export default HomePage;
