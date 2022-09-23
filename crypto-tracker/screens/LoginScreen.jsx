import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { authorization } from '../firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleRegister = () => {
		createUserWithEmailAndPassword(authorization, email, password)
			.then(res => console.log(res))
			.catch(error => setErrorMessage(error.message));
	};

	const handleLogin = () => {
		signInWithEmailAndPassword(authorization, email, password)
			.then(res => console.log(res))
			.catch(error => setErrorMessage(error.message));
	};

	const navigation = useNavigation();
	const auth = getAuth();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				navigation.navigate('CryptoScreen');
				setPassword('');
				setErrorMessage('');
			}
		});
		return unsubscribe;
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			<Image source={require('../assets/login.png')} style={styles.loginImg} />
			<Image source={require('../assets/login3.png')} style={styles.loginImg1} />
			<View style={styles.inputContiner}>
				<TextInput
					placeholder='Email'
					style={styles.input}
					value={email}
					onChangeText={text => setEmail(text)}
				/>
				<TextInput
					placeholder='Password'
					style={styles.input}
					value={password}
					onChangeText={text => setPassword(text)}
					secureTextEntry
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => handleRegister()}
					style={[styles.button, styles.buttonOutline]}
				>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>

				<Text style={styles.errors}>{errorMessage.slice(22, -2).toLocaleUpperCase()}</Text>
			</View>
		</SafeAreaView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#070707',
	},
	inputContiner: {
		width: '80%',
		marginTop:150
	},
	loginImg: {
		width: 150,
		height: 150,
		resizeMode: 'contain',
		position: 'absolute',
		top: '7%',
	},
	loginImg1: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		position: 'absolute',
		top: 0,
		zIndex: -10,
		opacity: 0.7,
	},
	input: {
		backgroundColor: '#fff',
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderRadius: 10,
		marginTop: 20,
		fontSize: 15,
		elevation: 10,
		shadowColor: '#fff',
	},
	buttonContainer: {
		width: '60%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	button: {
		backgroundColor: '#6552FE',
		width: '90%',
		padding: 10,
		borderRadius: 10,
		marginTop: 18,
		alignItems: 'center',
		borderColor: 'grey',
		borderWidth: 2,
		elevation: 10,
		shadowColor: '#fff',
	},
	buttonOutline: {
		backgroundColor: '#6552FE',
		borderColor: '#fff',
		borderWidth: 2,
		elevation: 10,
		shadowColor: '#fff',
	},
	buttonText: {
		color: '#fff',
		fontFamily: 'Poppins_400Regular',
		fontSize: 15,
	},
	errors: {
		color: '#fff',
		fontFamily: 'Poppins_600SemiBold',
		fontSize: 18,
		marginTop: 10,
	},
});
