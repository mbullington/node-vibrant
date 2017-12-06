import runInWorker from 'vibrant-worker/lib/worker'
import { Pipeline } from '../index'
import { ImageData } from 'vibrant-image';

export default function runPipelineInWorker(self: Window, pipeline: Pipeline) {
    runInWorker(self, (imageData, opts) => 
        pipeline.process(imageData, opts)
    )
}