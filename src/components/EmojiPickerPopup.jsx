import {useState} from "react";

import EmojiPicker from "emoji-picker-react";

import {Image} from "lucide-react";

const EmojiPickerPopup = ({width, height, emojiStyle, onEmojiChoose}) => {
  const [icon, setIcon] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className="px-3 py-2 bg-gray-200 rounded mb-2"
      >
        {icon ? (
          <span className="flex items-center gap-1">
            <span className="text-md">{icon}</span>
            Change Icon
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Image size={16} />
            Choose Icon
          </span>
        )}
      </button>

      {showEmojiPicker && (
        <div
          className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl rounded-lg p-2"
        >
          <EmojiPicker
            width={width}
            height={height}
            emojiStyle={emojiStyle}
            skinTonesDisabled={true}
            onEmojiClick={(emojiData) => {
              setIcon(emojiData.emoji);
              onEmojiChoose(emojiData);
              setShowEmojiPicker(false);
            }}
          />
        </div>
      )}

      {showEmojiPicker && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setShowEmojiPicker(false)}
        />
      )}
    </div>
  );
}

export default EmojiPickerPopup;