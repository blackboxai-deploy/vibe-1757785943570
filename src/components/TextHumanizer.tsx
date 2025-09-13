"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const TextHumanizer = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingResults, setProcessingResults] = useState<any>(null);
  const { toast } = useToast();

  const maxCharacters = 5000;
  const inputLength = inputText.length;

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to humanize.",
        variant: "destructive",
      });
      return;
    }

    if (inputLength > maxCharacters) {
      toast({
        title: "Text Too Long",
        description: `Please limit your text to ${maxCharacters} characters.`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setOutputText('');

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 20;
        });
      }, 200);

      const response = await fetch('/api/humanize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Failed to humanize text');
      }

      const data = await response.json();
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Store additional data for display
      setProcessingResults(data);
      
      // Simulate typing effect
      let currentIndex = 0;
      const humanizedText = data.humanizedText;
      const typingInterval = setInterval(() => {
        if (currentIndex <= humanizedText.length) {
          setOutputText(humanizedText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 15);

      toast({
        title: "Success!",
        description: `Text humanized with ${data.confidence}% confidence using advanced algorithms.`,
      });

    } catch (error) {
      console.error('Error humanizing text:', error);
      toast({
        title: "Error",
        description: "Failed to humanize text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async (text: string, type: 'input' | 'output') => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type === 'input' ? 'Input' : 'Output'} text copied to clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setProgress(0);
    setProcessingResults(null);
  };

  return (
    <section id="humanizer" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-poppins mb-4">
            AI Text Humanizer Tool
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Paste your AI-generated text below and transform it into natural, human-like content in seconds.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">AI-Generated Text</h3>
                <Badge variant={inputLength > maxCharacters ? "destructive" : "secondary"}>
                  {inputLength}/{maxCharacters}
                </Badge>
              </div>
              <div className="relative">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your AI-generated text here... (e.g., content from ChatGPT, Claude, Gemini, etc.)"
                  className="min-h-[300px] resize-none border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  disabled={isProcessing}
                />
                {inputText && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(inputText, 'input')}
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                  >
                    📋
                  </Button>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleHumanize}
                  disabled={!inputText.trim() || isProcessing || inputLength > maxCharacters}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex-1"
                >
                  {isProcessing ? 'Humanizing...' : 'Humanize Text'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  disabled={isProcessing}
                >
                  Clear
                </Button>
              </div>
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Humanized Text</h3>
                {outputText && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    ✓ Human-like
                  </Badge>
                )}
              </div>
              <div className="relative">
                <Textarea
                  value={outputText}
                  readOnly
                  placeholder="Your humanized text will appear here..."
                  className="min-h-[300px] resize-none border-2 border-gray-200 bg-gray-50 cursor-default"
                />
                {outputText && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(outputText, 'output')}
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                  >
                    📋
                  </Button>
                )}
              </div>
              {outputText && processingResults && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-green-800">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">
                          AI Detection Bypass: {processingResults.detectionBypass}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {processingResults.confidence}% Confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-green-700 mb-3">
                      Advanced algorithms successfully transformed your text using sophisticated humanization techniques.
                    </p>
                    
                    {/* Algorithm Details */}
                    <div className="bg-white/70 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-green-800 mb-2">Applied Algorithms:</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {processingResults.algorithmsUsed?.map((algorithm: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-700">{algorithm}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Processing Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-3 text-center">
                      <div className="bg-white/70 rounded p-2">
                        <div className="text-xs font-medium text-green-800">Processing Time</div>
                        <div className="text-xs text-green-700">{(processingResults.processingTime / 1000).toFixed(1)}s</div>
                      </div>
                      <div className="bg-white/70 rounded p-2">
                        <div className="text-xs font-medium text-green-800">Sophistication</div>
                        <div className="text-xs text-green-700">{processingResults.transformationDetails?.sophisticationLevel || 'High'}</div>
                      </div>
                      <div className="bg-white/70 rounded p-2">
                        <div className="text-xs font-medium text-green-800">Naturalness</div>
                        <div className="text-xs text-green-700">{processingResults.transformationDetails?.naturalness || 'Enhanced'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-8">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">💡 Pro Tips for Best Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>Use complete sentences and paragraphs for better humanization</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>Avoid extremely technical jargon that's hard to rephrase</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>The tool works best with content between 100-2000 characters</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>Review the output to ensure it maintains your intended meaning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextHumanizer;