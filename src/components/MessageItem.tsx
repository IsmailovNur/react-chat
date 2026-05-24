import { type FC, memo } from 'react';
import { motion } from 'framer-motion';
import { Card, Typography } from 'antd';

const {Text} = Typography;

interface MessageItemProps {
  author: string;
  message: string;
  datetime: string;
}

const MessageItem: FC<MessageItemProps> = memo((props) => {

  const {author, message, datetime} = props
  const formattedDate = new Date(datetime).toLocaleString();

  return (
    <motion.div
      initial={{opacity: 0, x: -20}}
      animate={{opacity: 1, x: 0}}
      style={{marginBottom: 12}}
    >
      <Card
        style={{
          borderLeft: '4px solid #1677ff',
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Text strong>{author}</Text>
          <Text type="secondary" style={{fontSize: '12px'}}>{formattedDate}</Text>
        </div>
        <Text style={{
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap'
        }}>{message}</Text>
      </Card>
    </motion.div>
  );
});

export default MessageItem;