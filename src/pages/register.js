import React, {Component} from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';

const StartScreen = ({ navigation }) => {
	return (
        // react nativeのFlatListを使用
        //const RegisterScreen = ({ navigation }) => {};
        class App extends Component {

            constructor(props) {
				super(props);
				this.state = {
					storename: "",
					postcord: "",
					login_id: "",
					password: "",
					register_list: [],
				};
            }
  
            render() {
				const { storename, postcord, login_id, password, register_list } = this.state;
			
				return (
					<SafeAreaView style={styles.container}>
						<View style={styles.formGroup}>
							<Text style={styles.formLabel}>お店の名前</Text>
							<TextInput
							style={styles.formControl}
							value={storename}
							placeholder="お店の名前を入力してください"
							onChangeText={v => this.setState({ storename: v })}
							/>
						</View>
						<View style={styles.formGroup}>
							<Text style={styles.formLabel}>郵便番号</Text>
							<TextInput
							style={styles.formControl}
							value={postcord}
							placeholder="郵便番号を入力してください"
							onChangeText={v => this.setState({ postcord: v })}
							/>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.formLabel}>ログインID</Text>
							<TextInput
							style={styles.formControl}
							value={login_id}
							placeholder="ログインIDを入力してください"
							onChangeText={v => this.setState({ login_id: v })}
							/>
						</View>
						<View style={styles.formGroup}>
							<Text style={styles.formLabel}>パスワード</Text>
							<TextInput
							style={styles.formControl}
							value={password}
							placeholder="パスワードを入力してください"
							onChangeText={v => this.setState({ password: v })}
							/>
						</View>
						<Button
							title="登録"
							onPress={() => {
								const newList = register_list.concat({sotrename: sotrename, postcode: postcode, login_id: login_id, password: password});
								this.setState({
									sotrename: "",
									postcode: "",
									login_id: "",
									password: "",
									register_list: newList
							});
							}}
						/>
						<FlatList
							style={styles.listBox}
							data={register_list}
							renderItem={({ item }) => {
							return (
								<View style={styles.listItem}>
									<Text>{item.sotrename}</Text>
									<Text>{item.postcord}</Text>
									<Text>{item.login_id}</Text>
									<Text>{item.password}</Text>
								</View>
							);
							}}
							keyExtractor={item => item.login_id}
						/>
					</SafeAreaView>
				);
            }
        }
	);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLabel: {
    paddingRight: 16,
  },
  formControl: {
    height: 40,
    width: 160,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1
  },
  listItem: {
    height: 64,
    width: 200,
    marginBottom: 16,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default StartScreen