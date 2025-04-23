import DisplayMarkupContent from "./display-markup-content";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ContentSection {
  _id: string;
  sectionId: string;
  type: "list" | "image" | "video" | "quote" | "knowledge-check";
  content: any;
}

interface ModuleContentSectionProps {
  section: ContentSection;
}

const ModuleContentSection: React.FC<ModuleContentSectionProps> = ({
  section,
}) => {
  const renderContent = () => {
    switch (section.type) {
      case "list":
        return (
          <div className="">
            <DisplayMarkupContent content={section.content} />
          </div>
        );
      case "image":
        return (
          <div className="my-4">
            <img
              src={section.content}
              alt="Course content"
              className="max-w-full rounded-lg shadow-md"
            />
          </div>
        );
      case "video":
        return (
          <div className="my-4 aspect-w-16 aspect-h-9">
            {section.content.includes("youtube") ? (
              <iframe
                src={section.content}
                title="Video content"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-md"
              ></iframe>
            ) : (
              <video
                src={section.content}
                controls
                className="w-full rounded-lg shadow-md"
              ></video>
            )}
          </div>
        );
      case "quote":
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 py-2  italic">
            <p className="mb-2">{section.content.quoteText}</p>
            <cite className="text-sm text-gray-600">
              — {section.content.authorName}
            </cite>
          </blockquote>
        );
      // case "knowledge-check":
      //   return (
      //     <div className="bg-blue-50 p-4 rounded-lg my-4">
      //       <h3 className="font-semibold text-lg mb-3">Knowledge Check</h3>
      //       <p className="mb-4">{section.content.question}</p>
      //       <div className="space-y-2">
      //         {section.content.options.map((option: any, index: number) => (
      //           <div key={index} className="flex items-start">
      //             <input
      //               type={
      //                 section.content.type === "multiple" ? "checkbox" : "radio"
      //               }
      //               id={`option-${section._id}-${option.id}`}
      //               name={`question-${section._id}`}
      //               className="mt-1 mr-3"
      //             />
      //             <label htmlFor={`option-${section._id}-${option.id}`}>
      //               {option.text}
      //             </label>
      //           </div>
      //         ))}
      //       </div>

      //       <Button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      //         Submit
      //       </Button>
      //     </div>
      //   );
      default:
        return <div></div>;
    }
  };

  return <section className="mb-4 course-overview">{renderContent()}</section>;
};

export default ModuleContentSection;
