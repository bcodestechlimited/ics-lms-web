export type Option = {
  id: number;
  text: string;
};

export type Question = {
  _id: string;
  question: string;
  type: string;
  options: Option[];
};

interface AssessmentProps {
  questions: Question[];
  selectedAnswers: Record<string, number>;
  onOptionChange: (questionId: string, optionId: number) => void;
  disabled: boolean;
}

const Assessment: React.FC<AssessmentProps> = ({
  questions,
  selectedAnswers,
  onOptionChange,
  disabled,
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      {questions.map((question) => (
        <div key={question._id} className="mb-8 border p-6">
          <div className="text-xl font-semibold mb-4">{question.question}</div>

          <div className="space-y-4">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="radio"
                  id={`${question._id}-${option.id}`}
                  name={`question-${question._id}`}
                  value={option.id}
                  checked={selectedAnswers[question._id] === option.id}
                  onChange={() => onOptionChange(question._id, option.id)}
                  className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                  disabled={disabled}
                />
                <label
                  htmlFor={`${question._id}-${option.id}`}
                  className="ml-2 text-lg text-gray-700"
                >
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Assessment;
