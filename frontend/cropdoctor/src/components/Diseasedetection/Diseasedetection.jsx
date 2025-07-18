import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx'; // Import the context
import { InferenceSession, Tensor } from 'onnxruntime-web';
import ndarray from 'ndarray';
import ops from 'ndarray-ops';
import toast from 'react-hot-toast';

// Helper functions (processImage and softmax) remain unchanged...
async function processImage(imageFile, width, height) {
    const image = new Image();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = (e) => {
            image.src = e.target.result;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width, height);
                const imageData = ctx.getImageData(0, 0, width, height).data;
                const dataTensor = ndarray(new Float32Array(imageData), [height, width, 4]);
                const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [1, 3, height, width]);
                ops.assign(dataProcessedTensor.pick(0, 0, null, null), dataTensor.pick(null, null, 0));
                ops.assign(dataProcessedTensor.pick(0, 1, null, null), dataTensor.pick(null, null, 1));
                ops.assign(dataProcessedTensor.pick(0, 2, null, null), dataTensor.pick(null, null, 2));
                ops.divseq(dataProcessedTensor, 255.0);
                resolve(dataProcessedTensor.data);
            };
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
    });
}
function softmax(arr) {
    const max = Math.max(...arr);
    const exps = arr.map(x => Math.exp(x - max));
    const sumExps = exps.reduce((a, b) => a + b);
    return exps.map(e => e / sumExps);
}


const DiseaseDetection = () => {
    // This is the line that caused the original error. It will now work.
    const { isLoggedIn } = useContext(AuthContext); 
    
    // State variables remain the same
    const [session, setSession] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState('');

    // useEffect for loading the model remains the same
    useEffect(() => {
        const loadModel = async () => {
            try {
                const modelPath = '/vit_plantdisease.onnx';
                const newSession = await InferenceSession.create(modelPath);
                setSession(newSession);
                toast.success('AI Model is ready!');
            } catch (e) {
                console.error("Failed to load ONNX model", e);
                toast.error("AI model failed to load.");
            }
        };
        loadModel();
    }, []);

    // handleImageChange remains the same
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        setAnalysisResult(null);
        setError('');
    };

    // handleSubmit logic for analysis remains the same
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setError("You must be logged in to analyze an image.");
            return;
        }
        if (!session) {
            setError("Model is still loading, please wait.");
            return;
        }
        if (!imageFile) {
            setError("Please upload an image first.");
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const modelWidth = 224;
            const modelHeight = 224;
            const preprocessedData = await processImage(imageFile, modelWidth, modelHeight);
            const inputTensor = new Tensor('float32', preprocessedData, [1, 3, modelHeight, modelWidth]);
            const feeds = { 'input': inputTensor };
            const results = await session.run(feeds);
            const outputData = results[session.outputNames[0]].data;
            const probabilities = softmax(Array.from(outputData));
            const maxProb = Math.max(...probabilities);
            const maxIndex = probabilities.indexOf(maxProb);
            const classNames = [ 'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy' ];
            setAnalysisResult({
                disease: classNames[maxIndex].replace(/_/g, ' '),
                confidence: (maxProb * 100).toFixed(2)
            });
        } catch (e) {
            console.error(e);
            setError(`Analysis failed: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    // This JSX structure is preserved from your original code.
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl w-full p-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Upload crop photos for instant health analysis and treatment recommendations</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Crop Name</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="e.g., Potato"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={isLoading || !session}>
                            {isLoading ? 'Analyzing...' : (session ? 'Analyze for Diseases' : 'Loading Model...')}
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    {analysisResult && (
                        <div className="mt-4 p-4 bg-gray-100 rounded">
                            <h3 className="font-bold">Analysis Result:</h3>
                            <p>Prediction: {analysisResult.disease}</p>
                            <p>Confidence: {analysisResult.confidence}%</p>
                        </div>
                    )}
                </div>
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow flex flex-col justify-center">
                    <h3 className="text-2xl font-bold">Photography Tips</h3>
                    <ul className="list-disc list-inside mt-4 space-y-2">
                        <li>High-quality, focused images</li>
                        <li>Good lighting</li>
                        <li>Close-up shots</li>
                        <li>Include affected areas</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DiseaseDetection;