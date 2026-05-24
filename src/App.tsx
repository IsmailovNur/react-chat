import { useCallback, useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { CHAT_API } from './constants.ts';
import ChatForm from './components/ChatForm.tsx';
import type { IMessage } from './types.ts';
import MessageList from "./components/MessageList.tsx";
import Loader from "./shared/Loader/Loader.tsx";

const {Title, Paragraph} = Typography;
const {Content} = Layout;

const App = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastDatetime, setLastDatetime] = useState<string>('');
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);

  const fetchNewMessages = useCallback(async (lastMessageDate: string) => {
    try {
      const response = await CHAT_API.get<IMessage[]>('/messages', {
        params: lastMessageDate ? {datetime: lastMessageDate} : {}
      });

      const data = response.data;

      if (data.length > 0) {
        setLastDatetime(data[data.length - 1].datetime);

        setMessages((prev) => {
          const newUniqueMessages = data.filter(
            (newMsg) => !prev.some((oldMsg) => oldMsg._id === newMsg._id)
          );
          return [...prev, ...newUniqueMessages];
        });
      }

    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setIsFirstLoading(false);
    }
  }, []);

  const sendMessageHandler = useCallback(async (author: string, message: string) => {
    const data = new URLSearchParams();
    data.set('author', author);
    data.set('message', message);

    await CHAT_API.post('/messages', data);
  }, []);

  useEffect(() => {
    void fetchNewMessages(lastDatetime);

    const interval = setInterval(() => {
      void fetchNewMessages(lastDatetime);
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchNewMessages, lastDatetime]);

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
          <Title level={1} style={{
            color: '#001529',
            marginBottom: 4
          }}>React-Chat</Title>

          <Paragraph>Ant Design & Axios | Update every 3 sec</Paragraph>
        </div>

        <ChatForm onSendMessage={sendMessageHandler} />
        <Loader isLoading={isFirstLoading} />
        <MessageList messages={messages} />
      </Content>
    </Layout>
  );
};

export default App;