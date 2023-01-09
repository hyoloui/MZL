import React, { useState, useRef } from 'react';
import styled from '@emotion/native';
import { Alert, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { async } from '@firebase/util';

export default function Register() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [alertText, setAlertText] = useState('');

  // 비어있는 inputText focus 지정
  const focusName = useRef();
  const focusEmail = useRef();
  const focusPw = useRef();
  const focusPwCheck = useRef();

  // const auth = authService();

  console.log(displayName, email, password);

  const onSubmitRegister = async () => {
    // 유효성 검사 진행
    if (!displayName) {
      setAlertText('닉네임을 입력해 주세요');
      focusName.current.focus();
      return;
    } else if (!email) {
      setAlertText('이메일을 입력해 주세요');
      focusEmail.current.focus();
      return;
    } else if (email.indexOf('@') == -1) {
      setAlertText('이메일 형식이 아닙니다.');
      focusEmail.current.focus();
    } else if (!password) {
      setAlertText('비밀번호를 입력해 주세요');
      focusPw.current.focus();
      return;
    } else if (!passwordCheck) {
      setAlertText('비밀번호 재입력 입력해 주세요');
      focusPwCheck.current.focus();
      return;
    } else if (password.length < 6) {
      setAlertText('비밀번호는 6자리 이상 입력해주세요!');
      focusPw.current.focus();
    } else if (password !== passwordCheck) {
      setAlertText('비밀번호를 다시 확인해 주세요');
      focusPwCheck.current.focus();
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log('🚀 userCredential', userCredential);
        // Signed in
        const user = userCredential.user;
        // 닉네임 추가
        await updateProfile(auth.currentUser, {
          displayName,
        })
          .then(() => {
            console.log('🚀 Profile updated!', userCredential);
          })
          .catch((error) => {
            Alert.alert('🚨', error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('🚨', errorCode, errorMessage);
      });
  };
  return (
    <ContainerView>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        style={{ paddingHorizontal: 30 }}
      >
        <AuthRegisterContainerView>
          <Text style={{ color: 'red', height: 20 }}>{alertText}</Text>
          <SectionView>
            <TitleText>닉네임</TitleText>
            <InputBox
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="User Name"
              ref={focusName}
            />
          </SectionView>

          <SectionView>
            <TitleText>이메일</TitleText>
            <InputBox
              value={email}
              onChangeText={setEmail}
              placeholder="예)id@domain.com"
              ref={focusEmail}
            />
          </SectionView>

          <SectionView>
            <TitleText>비밀번호</TitleText>
            <InputBox
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              ref={focusPw}
              type="password"
            />
            <InputBox
              value={passwordCheck}
              onChangeText={setPasswordCheck}
              placeholder="Password check"
              ref={focusPwCheck}
            />
          </SectionView>

          <Buttons onPress={() => onSubmitRegister()}>
            <ButtonsText>회원가입</ButtonsText>
          </Buttons>
        </AuthRegisterContainerView>
      </KeyboardAwareScrollView>
    </ContainerView>
  );
}

const ContainerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const AuthRegisterContainerView = styled.View`
  width: 340px;
  background-color: #c7f5dd;
  box-shadow: 1px 4px 4px #808080;
  margin-top: 30%;
  padding: 10%;
  padding-bottom: 20%;
`;
const SectionView = styled.View``;
const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 10px;
`;
const InputBox = styled.TextInput`
  padding: 5px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-color: #808080;
`;

const Buttons = styled.TouchableOpacity`
  height: 20px;
  text-align: center;
  margin-top: 30px;
`;

const ButtonsText = styled.Text`
  text-align: center;
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  margin: 0 30%;
  border: 1px solid goldenrod;
`;