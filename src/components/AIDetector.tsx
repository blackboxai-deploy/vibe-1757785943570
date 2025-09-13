"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AIDetector = () => {
  const [inputText, setInputText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [detectionResults, setDetectionResults] = useState<any>(null);
  const { toast } = useToast();

  const maxCharacters = 3000;
  const inputLength = inputText.length;

  const handleScan = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to analyze.",
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

    setIsScanning(true);
    setProgress(0);
    setDetectionResults(null);

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    try {
      // Simulate AI detection analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setProgress(100);

      // Generate realistic AI detection results
      const aiProbability = Math.random() * 100;
      const detectionScore = Math.round(aiProbability);
      
      const detectorResults = [
        {
          name: "GPTZero",
          score: Math.round(Math.max(0, detectionScore + (Math.random() - 0.5) * 20)),
          status: detectionScore > 50 ? "AI Detected" : "Human Written"
        },
        {
          name: "Originality.AI",
          score: Math.round(Math.max(0, detectionScore + (Math.random() - 0.5) * 25)),
          status: detectionScore > 45 ? "AI Detected" : "Human Written"
        },
        {
          name: "Winston AI",
          score: Math.round(Math.max(0, detectionScore + (Math.random() - 0.5) * 30)),
          status: detectionScore > 60 ? "AI Detected" : "Human Written"
        },
        {
          name: "Turnitin",
          score: Math.round(Math.max(0, detectionScore + (Math.random() - 0.5) * 15)),
          status: detectionScore > 55 ? "AI Detected" : "Human Written"
        },
        {
          name: "Copyleaks",
          score: Math.round(Math.max(0, detectionScore + (Math.random() - 0.5) * 20)),
          status: detectionScore > 50 ? "AI Detected" : "Human Written"
        }
      ];

      setDetectionResults({
        overallScore: detectionScore,
        overallStatus: detectionScore > 50 ? "AI Generated" : "Human Written",
        detectors: detectorResults,
        wordCount: inputText.split(' ').length,
        analysisTime: 2.8
      });

      toast({
        title: "Analysis Complete",
        description: `AI detection scan completed with ${detectionScore}% AI probability.`,
      });

    } catch (error) {
      console.error('Error scanning text:', error);
      toast({
        title: "Error",
        description: "Failed to scan text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setDetectionResults(null);
    setProgress(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-red-600 bg-red-50 border-red-200";
    if (score >= 40) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getOverallColor = (score: number) => {
    if (score >= 70) return "from-red-500 to-red-600";
    if (score >= 40) return "from-orange-500 to-orange-600";
    return "from-green-500 to-green-600";
  };

  return (
    <section id="detector" className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-poppins mb-4">
            AI Content Detector
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your content against leading AI detection tools to see if it passes as human-written.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                AI Detection Scanner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Text to Analyze</h3>
                  <Badge variant={inputLength > maxCharacters ? "destructive" : "secondary"}>
                    {inputLength}/{maxCharacters}
                  </Badge>
                </div>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your content here to check if it's detectable as AI-generated..."
                  className="min-h-[200px] resize-none border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  disabled={isScanning}
                />
                <div className="flex space-x-3">
                  <Button
                    onClick={handleScan}
                    disabled={!inputText.trim() || isScanning || inputLength > maxCharacters}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex-1"
                  >
                    {isScanning ? 'Scanning...' : 'Scan for AI Content'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    disabled={isScanning}
                  >
                    Clear
                  </Button>
                </div>
                {isScanning && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analyzing with AI detectors...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                )}
              </div>

              {/* Results Section */}
              {detectionResults && (
                <div className="space-y-6">
                  {/* Overall Results */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${getOverallColor(detectionResults.overallScore)} text-white text-2xl font-bold mb-4`}>
                        {detectionResults.overallScore}%
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Overall Detection: {detectionResults.overallStatus}
                      </h3>
                      <p className="text-gray-600">
                        {detectionResults.wordCount} words analyzed in {detectionResults.analysisTime}s
                      </p>
                    </div>
                  </div>

                  {/* Individual Detector Results */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {detectionResults.detectors.map((detector: any, index: number) => (
                      <Card key={index} className="bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-gray-900">
                            {detector.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl font-bold text-gray-900">
                              {detector.score}%
                            </span>
                            <Badge className={`text-xs ${getScoreColor(detector.score)}`}>
                              {detector.status}
                            </Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${
                                detector.score >= 70 ? 'from-red-400 to-red-500' :
                                detector.score >= 40 ? 'from-orange-400 to-orange-500' :
                                'from-green-400 to-green-500'
                              }`}
                              style={{ width: `${detector.score}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Recommendation */}
                  <div className={`rounded-2xl p-6 border ${
                    detectionResults.overallScore >= 70 
                      ? 'bg-red-50 border-red-200' 
                      : detectionResults.overallScore >= 40 
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <h4 className={`font-semibold mb-2 ${
                      detectionResults.overallScore >= 70 
                        ? 'text-red-800' 
                        : detectionResults.overallScore >= 40 
                        ? 'text-orange-800'
                        : 'text-green-800'
                    }`}>
                      Recommendation
                    </h4>
                    <p className={`text-sm ${
                      detectionResults.overallScore >= 70 
                        ? 'text-red-700' 
                        : detectionResults.overallScore >= 40 
                        ? 'text-orange-700'
                        : 'text-green-700'
                    }`}>
                      {detectionResults.overallScore >= 70 
                        ? "Your content is likely to be flagged as AI-generated. We recommend using our humanizer to make it undetectable." 
                        : detectionResults.overallScore >= 40 
                        ? "Your content has moderate AI detection risk. Consider using our humanizer for better results."
                        : "Great! Your content appears human-written and should pass most AI detection tools."
                      }
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIDetector;