import React from "react";

const flagIcons: Record<string, string> = {
  LT: "https://flagcdn.com/w40/lt.png",
  EE: "https://flagcdn.com/w40/ee.png",
  LV: "https://flagcdn.com/w40/lv.png",
  LK: "https://flagcdn.com/w40/lk.png",
};

interface FlagTextProps {
  text: string;
}

const FlagText: React.FC<FlagTextProps> = ({ text }) => {
  return (
    <span>
      {text.split(" ").map((word, index) =>
        flagIcons[word] ? (
          <img
            key={index}
            src={flagIcons[word]}
            alt={word}
            className="inline-block w-6 h-4 mx-1"
          />
        ) : (
          <span key={index} className="mr-1">
            {word}{" "}
          </span>
        )
      )}
    </span>
  );
};

export default FlagText;
