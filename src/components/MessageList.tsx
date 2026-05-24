import { type FC, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import MessageItem from "./MessageItem.tsx";
import type { IMessage } from "../types.ts";


interface MessageListProps {
  messages: IMessage[];
}

const MessageList: FC<MessageListProps> = memo(({messages}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column-reverse',
    }}>
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <MessageItem
            key={msg._id}
            author={msg.author}
            message={msg.message}
            datetime={msg.datetime}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

export default MessageList;