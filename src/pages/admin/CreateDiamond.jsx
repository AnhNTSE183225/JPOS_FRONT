const CreateDiamond = () => {
    const [diamondCode, setDiamondCode] = useState('');
    const [diamondName, setDiamondName] = useState('');
    const validateDiamondName = validateString(diamondName, 8, 255, null);
    const [shape, setShape] = useState('');
    const [origin, setOrigin] = useState('');
    const [proportions, setProportions] = useState('');
    const [fluorescence, setFluorescence] = useState('');
    const [symmetry, setSymmetry] = useState('');
    const [polish, setPolish] = useState('');
    const [cut, setCut] = useState('');
    const [clarity, setClarity] = useState('');
    const [color, setColor] = useState('');
    const [caratWeight, setCaratWeight] = useState('');
    const [note, setNote] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();



    return (
        <div className="container-fluid">
            
            <div className="row">
                <h1 className="p-0 mt-5 mb-5 text-center col">Create Diamond</h1>
            </div>
            <div className="row">

            </div>
        </div>
    );
}
export default CreateDiamond;