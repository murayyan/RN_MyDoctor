import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ChatItem, Header} from '../../components';
import InputChat from '../../components/molecules/InputChat';
import {
  colors,
  fonts,
  getChatTime,
  getDate,
  getData,
  showError,
} from '../../utils';
import {Fire} from '../../config';

const Chat = ({navigation, route}) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getUser();
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatID}/allChat/`;
    Fire.database()
      .ref(urlFirebase)
      .on('value', (snapshot) => {
        const dataSnapshot = snapshot.val();
        const allChat = [];
        Object.keys(dataSnapshot).map((key) => {
          const chat = dataSnapshot[key];
          const newChat = [];

          Object.keys(chat).map((itemChat) => {
            newChat.push({
              id: itemChat,
              data: chat[itemChat],
            });
          });

          allChat.push({
            id: key,
            data: newChat,
          });
        });
        console.log('chat', allChat);
        setChatData(allChat);
      });
  }, [user.uid, dataDoctor.data.uid]);

  const getUser = () => {
    getData('user').then((res) => {
      setUser(res);
    });
  };

  const sendChat = () => {
    const today = new Date();
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatID}/allChat/${getDate(today)}`;
    Fire.database()
      .ref(urlFirebase)
      .push(data)
      .then(() => {
        setChatContent('');
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.category}
        photo={dataDoctor.data.photo}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map((chat) => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map((itemChat) => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : dataDoctor.data.photo}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={(value) => setChatContent(value)}
        onButtonPress={sendChat}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
