/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Assessment, {Question} from "@/components/assessment";
import {CourseAssessmentSkeleton} from "@/components/course-card-skeleton";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useGetCourseAssessments,
  useGetCourseProgress,
  useSubmitCourseAssessment,
} from "@/hooks/use-course";
import DashboardLayout from "@/layouts/dashboard-layout";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {toast} from "sonner";

interface SubmitResponse {
  passed: boolean;
  scorePercent: number;
  currentAttempt: number;
  remainingAttempts: number;
  isFinalAttempt: boolean;
  corrections?: {
    questionId: string;
    correctOption: number;
    userSelected: number;
    isCorrect: boolean;
  }[];
}

export default function DashboardCourseAssessmentPage() {
  const {id: courseId} = useParams<{id: string}>();
  const {data, isLoading} = useGetCourseAssessments(courseId!);
  const questions: Question[] =
    !isLoading && data?.responseObject?.data ? data.responseObject.data : [];
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const submitAssessment = useSubmitCourseAssessment();
  const {
    data: progressData,
    isLoading: progressLoading,
    error: progressError,
  } = useGetCourseProgress(courseId as string);
  const navigate = useNavigate();

  const progress =
    !progressLoading && progressData?.responseObject?.data
      ? progressData.responseObject.data
      : null;

  useEffect(() => {
    setSelectedAnswers({});
    setResult(null);
    setError(null);
  }, [questions.map((q) => q._id).join(",")]);

  const allAnswered =
    questions.length > 0 &&
    questions.every((q) => selectedAnswers[q._id] !== undefined);

  const handleOptionChange = (questionId: string, optionId: number) => {
    setSelectedAnswers((p) => ({...p, [questionId]: optionId}));
  };

  const handleSubmit = async () => {
    if (!allAnswered || submitting) return;
    if (!courseId) {
      toast.info("Course ID is missing");
      return;
    }

    setSubmitting(true);
    setError(null);

    // build the array payload from your map of selectedAnswers
    const answersArray = Object.entries(selectedAnswers).map(
      ([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId,
      })
    );

    try {
      toast.promise(
        submitAssessment.mutateAsync({
          courseId,
          answers: answersArray,
        }),
        {
          loading: "Submitting assessment...",
          success: (data) => {
            if (!data.success) {
              return data.message || "Submission failed";
            }
          
            if (data?.responseObject?.data?.passed) {
              setIsDialogOpen(true);
            }
            return "Assessment submitted!";
          },
          error: (err: any) => err.message || "Submission error",
        }
      );
    } catch {
      setError("An error occurred while submitting the assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-12 space-y-16">
        <h1 className="text-2xl font-bold">Course Assessment</h1>

        {isLoading ? (
          <div className="space-y-8">
            <CourseAssessmentSkeleton />
            <CourseAssessmentSkeleton />
          </div>
        ) : (
          <div className="max-w-4xl space-y-8">
            {!progressLoading && progressData && (
              <div className="mb-8 p-4 border rounded bg-white">
                {/* 1) Progress bar */}
                <p className="mb-2">
                  Course progress:{" "}
                  <strong>
                    {/* {progressData?.progressPercentage.toFixed(0)}% */}
                  </strong>
                </p>
                <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{width: `${progress?.progressPercentage}%`}}
                  />
                </div>

                {/* 2) Attempts summary */}
                <p className="mt-4">
                  Attempts used:{" "}
                  <strong>{progress?.assessmentHistory.length}</strong> of{" "}
                  <strong>{progress?.assessmentAttempts}</strong>
                </p>

                {/* 3) Remaining attempts or final message */}
                {progress?.assessmentHistory.length >=
                progress?.assessmentAttempts ? (
                  <p className="text-red-600 font-semibold mt-2">
                    No more retakes allowed.
                  </p>
                ) : (
                  <p className="text-gray-700 mt-2">
                    You have{" "}
                    <strong>
                      {progress?.assessmentAttempts -
                        progress?.assessmentHistory.length}
                    </strong>{" "}
                    attempt
                    {progress?.assessmentAttempts -
                      progress?.assessmentHistory.length >
                    1
                      ? "s"
                      : ""}{" "}
                    remaining.
                  </p>
                )}

                {/* 4) History list */}
                <div className="mt-4">
                  <h3 className="font-semibold">Past Attempts</h3>
                  <ul className="list-disc list-inside">
                    {progress?.assessmentHistory.map((h: any) => (
                      <li key={h.attempt}>
                        #{h.attempt} –{" "}
                        {new Date(h.timestamp).toLocaleDateString()} – {h.score}
                        % – {h.passed ? "Passed" : "Failed"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {progressError && (
              <div className="text-red-600">
                Failed to load your progress. Please refresh.
              </div>
            )}
            <Assessment
              questions={questions}
              selectedAnswers={selectedAnswers}
              onOptionChange={handleOptionChange}
              disabled={!!result}
            />

            {/* Submit button */}
            <div className="text-center">
              <Button
                onClick={handleSubmit}
                disabled={
                  !allAnswered ||
                  submitting ||
                  !!result ||
                  (progress &&
                    progress.assessmentHistory.length >=
                      progress.assessmentAttempts)
                }
                className="bg-green-600"
              >
                {result
                  ? "Assessment Submitted"
                  : submitting
                  ? "Submitting..."
                  : "Complete Assessment"}
              </Button>

              {!result && (
                <p className="mt-4 text-gray-600">
                  {allAnswered
                    ? "Ready to submit your answers"
                    : `Please answer all ${questions.length} questions`}
                </p>
              )}
            </div>

            {/* Error or Result */}
            {error && <div className="mt-4 text-red-600">Error: {error}</div>}

            {result && (
              <div className="mt-6 p-6 border rounded bg-gray-50">
                <p className="text-lg">
                  You scored <strong>{result.scorePercent}%</strong> — you{" "}
                  {result.passed ? "passed 🎉" : "did not pass 😞"}.
                </p>
                <p>
                  Attempt {result.currentAttempt}. Remaining attempts:{" "}
                  {result.remainingAttempts}.
                </p>

                {result.corrections && (
                  <div className="mt-4">
                    <h3 className="font-semibold">Corrections:</h3>
                    <ul className="list-disc list-inside">
                      {result.corrections.map((c) => (
                        <li key={c.questionId}>
                          QID {c.questionId}: you chose{" "}
                          <strong>{c.userSelected}</strong>, correct was{" "}
                          <strong>{c.correctOption}</strong>.
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Certificate Issued</DialogTitle>
              <DialogDescription>
                Your certificate has been issued! You can view it on your
                dashboard.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setIsDialogOpen(false);
                  navigate("/dashboard");
                }}
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
