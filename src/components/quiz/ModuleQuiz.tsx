import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  order_index: number;
}

interface QuizResult {
  question_id: string;
  question: string;
  options: string[];
  user_answer: number;
  correct_answer: number;
  is_correct: boolean;
}

interface ModuleQuizProps {
  moduleId: string;
  moduleName: string;
  onPass: () => void;
  userId: string;
}

const PASSING_SCORE = 0.7; // 70% to pass

const ModuleQuiz: React.FC<ModuleQuizProps> = ({ moduleId, moduleName, onPass, userId }) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0, passed: false });

  useEffect(() => {
    fetchQuizData();
  }, [moduleId]);

  const fetchQuizData = async () => {
    setIsLoading(true);
    
    // Check if user already passed this quiz
    const { data: attempt } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('module_id', moduleId)
      .eq('user_id', userId)
      .maybeSingle();

    if (attempt?.passed) {
      setHasPassed(true);
      setIsLoading(false);
      return;
    }

    // Fetch questions using secure function (no correct answers exposed)
    const { data: questionsData, error } = await supabase
      .rpc('get_quiz_questions', { p_module_id: moduleId });

    if (error) {
      console.error('Error fetching questions:', error);
      setIsLoading(false);
      return;
    }

    const parsed = (questionsData || []).map(q => ({
      ...q,
      options: Array.isArray(q.options) ? q.options : JSON.parse(q.options as string),
    }));

    setQuestions(parsed);
    setSelectedAnswers(new Array(parsed.length).fill(null));
    setIsLoading(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Verify answers server-side using secure function
    const { data: verifyResult, error: verifyError } = await supabase
      .rpc('verify_quiz_answers', {
        p_user_id: userId,
        p_module_id: moduleId,
        p_answers: selectedAnswers
      });

    if (verifyError || !verifyResult || verifyResult.length === 0) {
      console.error('Error verifying quiz:', verifyError);
      toast({
        title: "Error",
        description: "Failed to verify quiz answers. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const result = verifyResult[0];
    const passed = result.passed;

    // Save attempt
    const { error: saveError } = await supabase
      .from('quiz_attempts')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        score: result.score,
        total_questions: result.total_questions,
        passed,
        answers: selectedAnswers,
      }, {
        onConflict: 'user_id,module_id',
      });

    if (saveError) {
      console.error('Error saving quiz attempt:', saveError);
      toast({
        title: "Error",
        description: "Failed to save quiz results. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Parse results for display
    const resultsArray = Array.isArray(result.results) ? result.results : [];
    const parsedResults = resultsArray.map((r: unknown) => {
      const resultItem = r as QuizResult;
      return {
        ...resultItem,
        options: Array.isArray(resultItem.options) ? resultItem.options : JSON.parse(resultItem.options as unknown as string),
      };
    });

    setQuizResults(parsedResults);
    setFinalScore({ score: result.score, total: result.total_questions, passed });
    setShowResults(true);
    setIsSubmitting(false);

    if (passed) {
      setHasPassed(true);
      toast({
        title: "🎉 Congratulations!",
        description: `You passed the quiz with ${Math.round((result.score / result.total_questions) * 100)}%!`,
      });
    } else {
      toast({
        title: "Not quite!",
        description: `You scored ${Math.round((result.score / result.total_questions) * 100)}%. You need 70% to pass.`,
        variant: "destructive",
      });
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setQuizResults([]);
  };

  const handleContinue = () => {
    onPass();
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-forest" />
        </CardContent>
      </Card>
    );
  }

  if (hasPassed) {
    return (
      <Card className="border-forest/30 bg-forest/5">
        <CardContent className="py-8 text-center">
          <Trophy className="h-12 w-12 text-forest mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-forest mb-2">Quiz Passed!</h3>
          <p className="text-muted-foreground mb-4">
            You've already passed this module's quiz. You can now mark it as complete.
          </p>
          <Button onClick={handleContinue} className="bg-forest hover:bg-forest/90">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark Module Complete
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-forest mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Quiz Required</h3>
          <p className="text-muted-foreground mb-4">
            This module doesn't have a quiz. You can mark it as complete!
          </p>
          <Button onClick={handleContinue} className="bg-forest hover:bg-forest/90">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark Module Complete
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const percentage = Math.round((finalScore.score / finalScore.total) * 100);

    return (
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className={finalScore.passed ? 'text-forest' : 'text-destructive'}>
            {finalScore.passed ? '🎉 Quiz Passed!' : '❌ Quiz Not Passed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <div className="text-center mb-8">
            <div className={`text-5xl font-bold mb-2 ${finalScore.passed ? 'text-forest' : 'text-destructive'}`}>
              {percentage}%
            </div>
            <p className="text-muted-foreground">
              {finalScore.score} of {finalScore.total} correct
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {finalScore.passed ? 'Great job! You can now complete this module.' : 'You need 70% to pass. Try again!'}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {quizResults.map((result, index) => (
              <div
                key={result.question_id}
                className={`p-4 rounded-lg border ${
                  result.is_correct ? 'border-forest/30 bg-forest/5' : 'border-destructive/30 bg-destructive/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.is_correct ? (
                    <CheckCircle2 className="h-5 w-5 text-forest flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{result.question}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your answer: {result.options[result.user_answer]}
                    </p>
                    {!result.is_correct && (
                      <p className="text-sm text-forest mt-1">
                        Correct: {result.options[result.correct_answer]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            {!finalScore.passed && (
              <Button onClick={handleRetry} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
            {finalScore.passed && (
              <Button onClick={handleContinue} className="bg-forest hover:bg-forest/90">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark Module Complete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg">Module Quiz</CardTitle>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="py-8">
        <h3 className="text-lg font-medium mb-6">{currentQuestion.question}</h3>

        <RadioGroup
          value={selectedAnswers[currentQuestionIndex]?.toString() ?? ''}
          onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                selectedAnswers[currentQuestionIndex] === index
                  ? 'border-forest bg-forest/5'
                  : 'border-border hover:border-forest/50'
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-end mt-8">
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === null}
              className="bg-forest hover:bg-forest/90"
            >
              Next Question
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswers[currentQuestionIndex] === null || isSubmitting}
              className="bg-forest hover:bg-forest/90"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              )}
              Submit Quiz
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleQuiz;
