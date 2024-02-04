const tf = require('@tensorflow/tfjs-node');

// Define the path to the SavedModel directory
const modelPath = 'path/to/exported/model';

// Load the model
async function loadModel() {
  const model = await tf.node.loadSavedModel(modelPath);
  return model;
}

// Example usage
async function main() {
  try {
    const loadedModel = await loadModel();
    // Perform inference or other tasks with the loaded model
    console.log('Model loaded successfully:', loadedModel);
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

main();