import * as fs from 'fs';
import * as path from 'path';
import * as tf from '@tensorflow/tfjs';
import fetch from 'node-fetch'; // Import the 'node-fetch' library

async function loadModel() {
    // Get the directory name of the current module
    const moduleDir = path.dirname(new URL(import.meta.url).pathname);

    // Construct the model path using path.join
    const modelPath = path.join(moduleDir, 'statics', 'model', 'model.json');

    // Remove the leading backslash if present
    const modelPathFixed = modelPath.startsWith('\\') ? modelPath.slice(1) : modelPath;

    // Log the fixed model path for verification
    console.log('Fixed Model Path:', modelPathFixed);

    try {
        // Read the model data from the file
        const modelData = fs.readFileSync(modelPathFixed, 'utf8');

        // Parse the JSON data to get the ModelArtifacts
        const modelArtifacts = JSON.parse(modelData);

        // Use node-fetch for fetching the model
        globalThis.fetch = fetch;

        // Load the model using TensorFlow.js
        const model = await tf.node.loadSavedModel(tf.io.fromMemory(modelArtifacts));

        return model;
    } catch (error) {
        console.error('Error loading model:', error);
        throw error;
    }
}

async function main() {
    try {
        const model = await loadModel();
        console.log('Model loaded successfully:', model);
        // Do further processing with the model here
    } catch (error) {
        console.error(error.message);
    }
}

main();
