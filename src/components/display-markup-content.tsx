import DOMPurify from "dompurify";

export default function DisplayMarkupContent({ content }: { content: string }) {
  const sanitizedHTML = DOMPurify.sanitize(content);
  return (
    <>
      <div
        className="space-y-4 font-normal"
        dangerouslySetInnerHTML={{__html: sanitizedHTML}}
      />
    </>
  );
}

export function DisplayCourseHighlights({ content }: { content: string }) {
  // Sanitize and parse the content into individual list items
  const sanitizedHTML = DOMPurify.sanitize(content);

  // Convert HTML string to a temporary DOM element and extract <li> items
  const tempElement = document.createElement("div");
  tempElement.innerHTML = sanitizedHTML;
  const listItems = Array.from(tempElement.querySelectorAll("li")).map(
    (li) => li.innerHTML
  );

  return (
    <ul className="space-y-2">
      {listItems.map((item, index) => (
        <li key={index} className="flex items-start gap-x-2">
          💠
          <span
            className="font-normal text-sm"
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </li>
      ))}
    </ul>
  );
}
