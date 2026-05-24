import React, { type FC, memo, useState } from 'react';
import { Button, Card, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

interface ChatFormProps {
  onSendMessage: (author: string, message: string) => Promise<void>;
}

const ChatForm: FC<ChatFormProps> = memo(({onSendMessage}) => {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await onSendMessage(author.trim(), message.trim());
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card style={{marginBottom: 20, borderRadius: 12}} size="small">
      <form onSubmit={submitHandler} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>
        <Input
          placeholder="Username"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          disabled={isSubmitting}
        />
        <div style={{display: 'flex', gap: 10}}>
          <Input
            placeholder="message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
          />
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            icon={<SendOutlined />}
          >
            Send
          </Button>
        </div>
      </form>
    </Card>
  );
});

ChatForm.displayName = 'ChatForm';

export default ChatForm;