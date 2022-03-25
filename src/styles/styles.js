import {
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column"
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
	box1:{
		backgroundColor:"#484848aa",
		width:"50%",
		height:"auto",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
		marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
		alignItems:'center',
	},
	textWhite:{
		color:"#FAFAFA"
	}
 });

export default styles;