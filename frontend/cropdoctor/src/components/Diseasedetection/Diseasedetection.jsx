import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { InferenceSession, Tensor } from 'onnxruntime-web';
import ndarray from 'ndarray';
import ops from 'ndarray-ops';
import toast from 'react-hot-toast';

// Helper function to process the image for your model
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

// Helper function to apply Softmax
function softmax(arr) {
    const max = Math.max(...arr);
    const exps = arr.map(x => Math.exp(x - max));
    const sumExps = exps.reduce((a, b) => a + b);
    return exps.map(e => e / sumExps);
}

const DiseaseDetection = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState(null);
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                const modelPath = '/vit_plantdisease.onnx'; // From public folder
                const newSession = await InferenceSession.create(modelPath);
                setSession(newSession);
                toast.success('AI Model ready for analysis!');
            } catch (e) {
                console.error("Failed to load ONNX model", e);
                toast.error("AI Model failed to load.");
            }
        };
        loadModel();
    }, []);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        setAnalysisResult(null);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!session) {
            setError("Model is not loaded yet. Please wait.");
            return;
        }
        if (!imageFile) {
            setError("Please upload an image for analysis.");
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const modelWidth = 224;
            const modelHeight = 224;
            const preprocessedData = await processImage(imageFile, modelWidth, modelHeight);
            const inputTensor = new Tensor('float32', preprocessedData, [1, 3, modelHeight, modelWidth]);
            const feeds = { [session.inputNames[0]]: inputTensor };
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

    if (!isLoggedIn) {
        return <p>Please <Link to="/login">login</Link> to use the disease detection feature.</p>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl p-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Crop Image</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Crop Name
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="e.g., Potato, Tomato"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                                Image
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    {imageFile && <p className="text-sm text-green-600 mt-2">{imageFile.name}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-gray-400"
                                disabled={isLoading || !session}
                            >
                                {isLoading ? 'Analyzing for Diseases...' : (session ? 'Analyze for Diseases' : 'Loading Model...')}
                            </button>
                        </div>
                    </form>
                    {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
                    {analysisResult && (
                        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                            <h3 className="text-lg font-bold text-green-800 mb-2">Analysis Result</h3>
                            <p className="text-gray-800"><span className="font-bold">Prediction:</span> {analysisResult.disease}</p>
                            <p className="text-gray-800"><span className="font-bold">Confidence:</span> {analysisResult.confidence}%</p>
                        </div>
                    )}
                </div>
                <div className="bg-blue-600 text-white p-8 rounded-lg shadow-md flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Upload crop photos for instant health analysis and treatment recommendations</h2>
                    <p>Our advanced AI helps you identify plant diseases quickly and accurately, providing you with the information you need to keep your crops healthy.</p>
                </div>
            </div>
        </div>
    );
};

export default DiseaseDetection;