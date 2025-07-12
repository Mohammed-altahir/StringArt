import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, Play, Settings, Camera, Loader2 } from 'lucide-react';
import {StringArt, type StringArtOptions} from '../core/app'
const StringArtGenerator = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [settings, setSettings] = useState<StringArtOptions>({
    wb: false,
    rgb: false,
    rect: false,
    exportStrength: 0.1,
    sideLen: 300,
    pullAmount: 1000,
    randomNails: 50,
    nailStep: 4,
    radius1Multiplier: 1,
    radius2Multiplier: 1,
  });

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setOriginalImage(imageUrl);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const processImage = useCallback(async () => {
    if (!originalImage || !canvasRef.current) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    try {
      const img = new Image();
      img.onload = async () => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        
        const stringArt = new StringArt(settings);
        const result = await stringArt.processImage(imageData, setProgress);
        
        canvas.width = result.width;
        canvas.height = result.height;
        ctx.putImageData(result, 0, 0);
        
        setResultImage(canvas.toDataURL());
        setIsProcessing(false);
      };
      img.src = originalImage;
    } catch (error) {
      console.error('Error processing image:', error);
      setIsProcessing(false);
    }
  }, [originalImage, settings]);

  const downloadResult = useCallback(() => {
    if (!resultImage) return;
    
    const link = document.createElement('a');
    link.download = 'string-art-result.png';
    link.href = resultImage;
    link.click();
  }, [resultImage]);

  const updateSetting = useCallback((key: keyof StringArtOptions, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 rounded-xl border border-slate-700">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">String Art Generator</h1>
          <p className="text-blue-200">Transform your images into beautiful string art patterns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Controls
              </h2>
              
              {/* File Upload */}
              <div className="mb-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload Image
                </button>
              </div>

              {/* Settings Toggle */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-4"
              >
                {showSettings ? 'Hide Settings' : 'Show Settings'}
              </button>

              {/* Advanced Settings */}
              {showSettings && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Output Size: {settings.sideLen}px
                    </label>
                    <input
                      type="range"
                      min="200"
                      max="800"
                      value={settings.sideLen}
                      onChange={(e) => updateSetting('sideLen', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Pull Amount: {settings.pullAmount}
                    </label>
                    <input
                      type="range"
                      min="500"
                      max="5000"
                      value={settings.pullAmount}
                      onChange={(e) => updateSetting('pullAmount', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Random Nails: {settings.randomNails}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={settings.randomNails}
                      onChange={(e) => updateSetting('randomNails', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Number of Nails: {settings.nailStep}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={settings.nailStep}
                      onChange={(e) => updateSetting('nailStep', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Export Strength: {settings.exportStrength}
                    </label>
                    <input
                      type="range"
                      min="0.01"
                      max="1.0"
                      step="0.01"
                      value={settings.exportStrength}
                      onChange={(e) => updateSetting('exportStrength', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <label className="flex items-center text-white">
                      <input
                        type="checkbox"
                        checked={settings.wb}
                        onChange={(e) => updateSetting('wb', e.target.checked)}
                        className="mr-2"
                      />
                      White Background
                    </label>
                    
                    <label className="flex items-center text-white">
                      <input
                        type="checkbox"
                        checked={settings.rect}
                        onChange={(e) => updateSetting('rect', e.target.checked)}
                        className="mr-2"
                      />
                      Rectangle Frame
                    </label>
                  </div>
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={processImage}
                disabled={!originalImage || isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing... {Math.round(progress)}%
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Generate String Art
                  </>
                )}
              </button>

              {/* Download Button */}
              {resultImage && (
                <button
                  onClick={downloadResult}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  <Download className="w-5 h-5" />
                  Download Result
                </button>
              )}
            </div>
          </div>

          {/* Image Display */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original Image */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Original Image
                </h3>
                <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                  {originalImage ? (
                    <img
                      src={originalImage}
                      alt="Original"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-400">No image uploaded</p>
                  )}
                </div>
              </div>

              {/* Result Image */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  String Art Result
                </h3>
                <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                  {resultImage ? (
                    <img
                      src={resultImage}
                      alt="String Art Result"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-400">
                      {isProcessing ? `Processing... ${Math.round(progress)}%` : 'No result yet'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Canvas for Processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default StringArtGenerator;