import type { IMessage } from "../types.ts";
import type { FC } from "react";

interface MessageListProps {
  messages: IMessage[];
}

const MessageList: FC<MessageListProps> = ({messages}) => {
  return (
    <div>
      {messages.map(m => <div key={m._id}>
        <p>{m.message}</p>
        <span>{m.datetime}</span>
        <b>{m.author}</b>
      </div>)}
    </div>
  );
};

export default MessageList;