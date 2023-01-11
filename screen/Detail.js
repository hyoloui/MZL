import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { dbService, auth } from '../firebase';

export default function Detail({
  navigation: { navigate },
  route: {
    params: { id },
  },
}) {
  const [category, setCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [word, setWord] = useState({});

  const [editMean, setEditMean] = useState('');
  const [editWord, setEditWord] = useState('');
  const [editTmi, setEditTmi] = useState('');

  const uid = auth.currentUser?.uid;

  // get해오는부분
  const getWord = async () => {
    const snapshot = await getDoc(doc(dbService, 'Words', id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    // 아무것도 수정입력 안하고 수정완료 시 데이터 없어지는 현상을 막기위해 setEdit state 여기에 추가함.
    setEditMean(data.mean);
    setEditTmi(data.tmi);
    setEditWord(data.word);
    setWord(data);
    console.log(data)
  };

  useEffect(() => {
    getWord();
  }, []);

  // 누르면 isEdit이 true/false로 변경됨
  const setEdit = async () => {
    await updateDoc(doc(dbService, 'Words', id), {
      isEdit: !word.isEdit,
    });
    getWord();
  };

  // 완료 누르면 글 수정 완료
  // 유효성검사 추가, tmi는 공란이여도 괜찮을 것 같아서 mean,word에만 적용
  const editPost = async () => {
    if (editMean !== '' && editWord !== '') {
      await updateDoc(doc(dbService, 'Words', id), {
        mean: editMean,
        word: editWord,
        tmi: editTmi,
        isEdit: false,
      });
      getWord();
    } else {
      return;
    }
  };

  // 글삭제 
  const delPost = async () => {
    console.log('id', id)
    Alert.alert("삭제", "정말로 삭제하시겠습니까??", [
      { text: "cancel", style: "destructive" }, {
        text: "OK, Delete it.",
        onPress: async () => {
          try {
            await deleteDoc(doc(dbService, 'Words', id));
            navigate("Home");
          } catch (err) {
            console.log("err:", err);
          }
        },
      },
    ]);
  }
  // 유효성검사 에러메세지 출력을 위해 변수 생성
  const errCheck = editMean === '' || editWord === '';


  // reset 사용해서 변경된 상세페이지로 가게끔 해야함.  reset을 안쓰면 뒤로기가 되는데 그러면 이상해짐
  return (
    <KeyboardAwareScrollView>
      <View key={id}>
        {word.isEdit ? (
          // isEdit이 true 일 때 보여지는 화면
          <>
            <Section>
              <Title>단어(수정)</Title>
              <TextBox background="#C2E1FF">
                <InputBox onChangeText={setEditWord} defaultValue={word.word} />
              </TextBox>
            </Section>

            <Section>
              <Title>의미(수정)</Title>
              <TextBox background="#C2E1FF">
                <InputBox onChangeText={setEditMean} defaultValue={word.mean} />
              </TextBox>
            </Section>

            <Section>
              <Title>TMI(수정)</Title>
              <TextBox background="#C2E1FF">
                <InputBox
                  onChangeText={setEditTmi}
                  defaultValue={word.tmi}
                  multiline={true}
                  numberOfLines={10}
                />
              </TextBox>
            </Section>
            {/* 유효성검사 에러메세지 */}
            <ErrText>{errCheck ? '단어와 의미를 입력해주세요.' : ''}</ErrText>
            <ButtonBox>
              <Btn onPress={editPost}>
                <Text>등록</Text>
              </Btn>
              <Btn onPress={() => { }}>
                <Text></Text>
              </Btn>
            </ButtonBox>
          </>
        ) : (
          // isEdit이 false 일 때 보여지는 화면
          <>
            <Section>
              <Title>단어</Title>
              <TextBox>
                <Text>{word.word}</Text>
              </TextBox>
            </Section>
            <Section>
              <Title>의미</Title>
              <TextBox>
                <Text>{word.mean}</Text>
              </TextBox>
            </Section>
            <Section>
              <Title>TMI</Title>
              <TextBox>
                <Text>{word.tmi}</Text>
              </TextBox>
            </Section>
            <ButtonBox>
              {/* 로그인한 uid와 글의 uid가 동일해야지만 수정,삭제버튼이 보임 */}
              {uid === word.userid ? (
                <>
                  <Btn onPress={setEdit}>
                    <Text>수정</Text>
                  </Btn>
                  <Btn onPress={() =>
                    delPost(word.id)
                  }>
                    <Text>삭제</Text>
                  </Btn>
                </>
              ) : ''}
            </ButtonBox>
          </>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const ErrText = styled.Text`
  color: red;
  text-align: center;
`;
const Section = styled.View`
  flex: 1;
  padding: 40px;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const TextBox = styled.View`
  flex: 1;
  padding: 20px;
  min-height: 70px;
  background-color: ${(props) => props.background || '#ffeaa7'};
  box-shadow: 2px 2px 2px #555555;
  overflow: visible;
`;
const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const Btn = styled.TouchableOpacity`
  padding: 30px 10px;
`;
const InputBox = styled.TextInput`
  background-color: #c2e1ff;
`;
