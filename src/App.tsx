import { useCallback, useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { CHAT_API } from './constants.ts';
import ChatForm from './components/ChatForm.tsx';
import type { IMessage } from './types.ts';
import MessageList from "./components/MessageList.tsx";

const {Title, Paragraph} = Typography;
const {Content} = Layout;

const App = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchNewMessages = useCallback(async () => {
    try {
      const response = await CHAT_API.get<IMessage[]>('/messages', {});

      const data = response.data;

      setMessages(data);

    } catch (error) {
      console.error('Network error:', error);
    }
  }, []);

  const sendMessageHandler = useCallback(async (author: string, message: string) => {
    await CHAT_API.post('/messages', {
      author,
      message
    });
  }, []);

  useEffect(() => {
    fetchNewMessages();
  }, []);

  return (
    <Layout style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Content style={{width: '100%', maxWidth: 900}}>
        <div style={{textAlign: 'center', marginBottom: 24}}>
          <Title level={2} style={{
            color: '#001529',
            marginBottom: 4
          }}>React-Chat</Title>
          <Paragraph>Ant Design & Axios | Update every 3 sec</Paragraph>
        </div>

        <ChatForm onSendMessage={sendMessageHandler} />
        <MessageList messages={messages} />
      </Content>
    </Layout>
  );
};

export default App;